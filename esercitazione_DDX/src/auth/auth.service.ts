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
        // generate the password hash
        const hash = await argon.hash(dto.password);
        
        // save new user in the db

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })

            // return the saved user
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

        // find user by email
        const user = await this.prisma.user.findUnique({
            where : {
                email : dto.email,
            }
        })

        // if user does not exist throw exception
        if(!user) throw new ForbiddenException(
            'Credentials incorrect',
        )

        // compare psw
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        )

        // if psw throw exception
        if(!pwMatches) throw new ForbiddenException(
            'Credentials incorrect',
        );

        // send back user
        return this.signToken(user.id, user.email);
    }


    async signToken(userId: number, email: string): Promise<{ access_token : string }>{
        const payload = {
            sub: userId, // convezione di jwt dove sub deve avere un' identificativo univoco
            email
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m', // è il tempo dopo il quale il token expire
            secret : secret,
        });


        return {
            access_token: token,
        };


    }
}