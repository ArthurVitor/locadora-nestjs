import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST || 'localhost',
      port: parseInt(process.env.MONGO_PORT) || 27017,
      username: process.env.MONGO_INITDB_ROOT_USERNAME || 'admin',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'root',
      database: process.env.MONGO_INITDB_DATABASE || 'locadora-db',
      authSource: 'admin',
      useUnifiedTopology: true,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    AuthModule,
    CarModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
