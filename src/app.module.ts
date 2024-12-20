import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST || 'localhost',
      port: parseInt(process.env.MONGO_PORT) || 27017,
      username: process.env.MONGO_INITDB_ROOT_USERNAME || 'admin',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'root',
      database: process.env.MONGO_INITDB_DATABASE || 'locadora-db',
      authSource: 'admin',
      useUnifiedTopology: true,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
