import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token?: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token?: string;
    }>;
    verifyAccessToken(token: string): Promise<boolean>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string, generateRefreshToken: boolean): Promise<{
        access_token: string;
        refresh_token?: string;
    }>;
}
