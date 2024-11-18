import { AuthService } from "./auth.service";
import { AuthDto, TokenDto } from "src/auth/dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token?: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token?: string;
    }>;
    updateJWT(dto: TokenDto): Promise<{
        access_token: string;
    }>;
}
