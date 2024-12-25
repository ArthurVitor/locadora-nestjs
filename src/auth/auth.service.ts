import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/LoginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<{ acess_token: string }> {
    const user = await this.userService.findOne(data.email);

    if (!bcrypt.compare(data.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, roles: user.role };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
