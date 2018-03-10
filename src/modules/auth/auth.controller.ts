import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DtoValidationPipe } from '../../common/pipes/dto-validation.pipe';
import { CreateUserInDto } from '../users/dto/create-user.in.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiUseTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'The token has been successfully created.', type: TokenDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials.', type: TokenDto })
    public async signIn(@Body(new DtoValidationPipe()) signInDto: AuthLoginDto): Promise<TokenDto> {
        return this.authService.signIn(signInDto);
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully created.', type: TokenDto })
    public async signUp(@Body(new DtoValidationPipe()) signUpDto: CreateUserInDto) {
        return this.authService.signUp(signUpDto);
    }
}
