import { ForbiddenException, Injectable } from "@nestjs/common"; 
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable({})
export class AuthService{
    constructor(private prisma : PrismaService, private jwt: JwtService, private config: ConfigService){}

    async signup(dto : AuthDto){
        // password hash
        const hash = await argon.hash(dto.password);
        
        // salva l'utente nel DB 
        try {
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    hash,
                }
            })

            // vado a generare i token
            const tokens = await this.signToken(user.id, user.username, true);

            // vado ad hashare il token
            const refreshTokenHash = await argon.hash(tokens.refresh_token!);

            // e salvarlo nel db
            await this.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: refreshTokenHash },
            });

            return tokens;

        } catch (error) {
            // verifico se l'errore generato viene da prisma o meno
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){ // duplicated fields error
                    throw new ForbiddenException('Credentials taken')
                }
            } 
            throw error;
        }
    }

    async signin(dto: AuthDto){
        // trovo l'utente passando l'email
        const user = await this.prisma.user.findUnique({
            where : {
                username : dto.username,
            }
        })

        //console.log(user); // debug
        // controllo
        if(!user) throw new ForbiddenException(
            'Credentials incorrect',
        )

        // comparazione password hash
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        )

        // controllo 
        if(!pwMatches) throw new ForbiddenException(
            'Credentials incorrect',
        );

        // va a generare l'access token
        const tokens = await this.signToken(user.id, user.username, true);

        // vado ad hashare il token
        const refreshTokenHash = await argon.hash(tokens.refresh_token!);

        // e salvarlo nel db
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: refreshTokenHash },
        });

        return tokens;
    }

    // metodo per rinnovare i token usando il refresh token
    async refreshTokens(refreshToken: string): Promise<{ access_token: string }> {
        try {
            // decodifico il refresh token
            const decoded: any = await this.jwt.verifyAsync(refreshToken, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
            });

            // vado a prendere l'utente usando l'id dal token
            const user = await this.prisma.user.findUnique({
                where: {
                    id: decoded.sub,
                },
            });

            if (!user) {
                throw new ForbiddenException('User not found');
            }

            // Verifica se il refresh token è valido confrontando con quello salvato nel DB
            const refreshTokenMatches = await argon.verify(user.refreshToken, refreshToken);
            if (!refreshTokenMatches) {
                throw new ForbiddenException('Invalid refresh token');
            }

            // Crea un nuovo access token
            const newTokens = await this.signToken(user.id, user.username, false);

            return { access_token: newTokens.access_token };
        } catch (error) {
            throw new ForbiddenException('Invalid refresh token or session expired');
        }
    }


    // metodo per generare i token
    async signToken(userId: number, email: string, generateRefreshToken : boolean): Promise<{ access_token : string; refresh_token? : string}>{
        const payload = {
            sub: userId, // convezione di jwt dove sub deve avere un' identificativo univoco
            email
        };
        const accessSecret = this.config.get('JWT_SECRET');
        const refreshSecret = this.config.get('JWT_REFRESH_SECRET')

        // genero un accessToken
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '25m', // è il tempo dopo il quale il token scade (1 min per test)
            secret : accessSecret,
        });

        // vado a generare il refreshToken solo in determinati casi 
        let refreshToken: string | undefined;
        if(generateRefreshToken){
            refreshToken = await this.jwt.signAsync(payload, {
                expiresIn: '7d',
                secret : refreshSecret,
            });
        }

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
