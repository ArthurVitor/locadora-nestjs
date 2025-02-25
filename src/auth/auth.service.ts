import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/LoginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<{ acess_token: string }> {
    const user = await this.userRepository.findOneBy('email', data.email, [
      'roles',
    ]);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
