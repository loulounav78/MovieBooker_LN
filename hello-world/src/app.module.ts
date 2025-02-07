import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';
import { MoviesController } from './movies/movies.controller';
import { ReservationController } from './reservation/reservation.controller';
import { MoviesService } from './movies/movies.service';
import { ReservationService } from './reservation/reservation.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://loulounav78:emksiVg97GUnPevf@cluster0.c7gxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule,
    ReservationModule],
  controllers: [],//MoviesController
  providers: [],//MoviesService
})
export class AppModule {}
