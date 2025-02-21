import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/LoginDto';
import { UserStub } from '../user/stub/UserStub';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should return an access token when credentials are valid', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const user = UserStub.getValidUser();

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await authService.login(loginDto);
    expect(result).toEqual({ acess_token: 'mocked-jwt-token' });
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(
      authService.login({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException when password is invalid', async () => {
    const user = UserStub.getValidUser();

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    await expect(
      authService.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
