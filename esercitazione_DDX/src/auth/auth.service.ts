import { ForbiddenException, Injectable } from "@nestjs/common"; 
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { access } from "fs";


@Injectable({})
export class AuthService{
    constructor(private prisma : PrismaService, private jwt: JwtService, private config: ConfigService){}

    async signup(dto : AuthDto){
        // password hash
        const hash = await argon.hash(dto.password);
        

        // salva l'utente nel DB 
        try {

            const refreshSecret = this.config.get('JWT_REFRESH_SECRET');

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    username : dto.username
                    // refreshToken : 
                }
            })

            // vado a generare il l'acces token tramite questi parametri che gli passo
            return this.signToken(user.id, user.email);

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
                email : dto.email,
            }
        })

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

        // genero access token
        return this.signToken(user.id, user.email);
    }


    async signToken(userId: number, email: string): Promise<{ access_token : string }>{
        const payload = {
            sub: userId, // convezione di jwt dove sub deve avere un' identificativo univoco
            email
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m', // è il tempo dopo il quale il token scade
            secret : secret,
        });


        return {
            access_token: token,
        };


    }
}