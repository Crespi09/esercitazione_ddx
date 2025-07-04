import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    // serve per trasformare il token in dati
    async validate(payload: { sub: number; email: string; }) {
        console.log("PAYLOADD", payload);
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });
        // delete user.hash;
        return {
            id: payload.sub,
            email: payload.email,
            username: user.username,
            createdAt: user.createdAt
        };
    }

}