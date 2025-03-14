import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';
import { Public } from './infra/security/decorator/isPublic.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
