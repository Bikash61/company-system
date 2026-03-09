import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  profile() {
    // Thanks to our JwtStrategy, this route is now protected.
    // The `validate` method in the strategy will run first.
    // If the token is valid, the user object will be attached to the request.
    // We can access it via `@Req() req` if needed.
    return { message: 'This is a protected route, only accessible with a valid JWT.' };
  }
}
