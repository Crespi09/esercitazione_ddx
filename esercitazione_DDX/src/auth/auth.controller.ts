import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, TokenDto } from "src/auth/dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        //console.log(dto); // debug
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        console.log(dto); // debug
        return this.authService.signin(dto);
    }

    @Post('refreshToken')
    updateJWT(@Body() dto: TokenDto) {
        console.log(dto);
        return this.authService.refreshTokens(dto.refreshToken);
    }

    @Get('/test')
    testAPI() {
        console.log("la chiamata API FUNZIONAAAAA");
        return 'la chiamata API FUNZIONAAAAA';
    }
}