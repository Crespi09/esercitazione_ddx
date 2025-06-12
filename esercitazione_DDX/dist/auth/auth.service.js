"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    hash,
                }
            });
            const tokens = await this.signToken(user.id, user.username, true);
            const refreshTokenHash = await argon.hash(tokens.refresh_token);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: refreshTokenHash },
            });
            return tokens;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            }
        });
        if (!user)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const tokens = await this.signToken(user.id, user.username, true);
        const refreshTokenHash = await argon.hash(tokens.refresh_token);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: refreshTokenHash },
        });
        return tokens;
    }
    async refreshTokens(refreshToken) {
        try {
            const decoded = await this.jwt.verifyAsync(refreshToken, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
            });
            const user = await this.prisma.user.findUnique({
                where: {
                    id: decoded.sub,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            const refreshTokenMatches = await argon.verify(user.refreshToken, refreshToken);
            if (!refreshTokenMatches) {
                throw new common_1.ForbiddenException('Invalid refresh token');
            }
            const newTokens = await this.signToken(user.id, user.username, false);
            return { access_token: newTokens.access_token };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid refresh token or session expired');
        }
    }
    async signToken(userId, email, generateRefreshToken) {
        const payload = {
            sub: userId,
            email
        };
        const accessSecret = this.config.get('JWT_SECRET');
        const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: accessSecret,
        });
        let refreshToken;
        if (generateRefreshToken) {
            refreshToken = await this.jwt.signAsync(payload, {
                expiresIn: '7d',
                secret: refreshSecret,
            });
        }
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map