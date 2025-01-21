import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '6000s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    // provide: APP_GUARD,
    // useClass: AuthGuard,
    // },
    // {
    // provide: APP_GUARD,
    // useClass: RolesGuard,
    // },
  ],
})
export class AuthModule {}
