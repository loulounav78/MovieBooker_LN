import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Reservation, ReservationSchema } from './reservation.schema';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { JwtStrategy } from '../user/jwt.strategy';

@Module({
  imports: [
      ConfigModule.forRoot(),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
      JwtModule.register({
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: '1h' },
      }),
    ],
  providers: [ReservationService, JwtStrategy, JwtAuthGuard],
  controllers: [ReservationController],
  exports: [ReservationService, MongooseModule, JwtModule, JwtAuthGuard],
})
export class ReservationModule {}
