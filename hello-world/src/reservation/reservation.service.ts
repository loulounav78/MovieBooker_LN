import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { CreateReservationDto } from './dto/createReservation.dto';
import { DeleteReservationDto } from './dto/deleteReservation.dto';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
  private jwtService: JwtService) {}

  async createReservation(createReservationDto: CreateReservationDto, IdUser) {
    const reservationStart = new Date(createReservationDto.reservationDate);
    const reservationEnd = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000);

    //https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
    const compareReservation = await this.ReservationModel.findOne({
        userId: IdUser,
        reservationDate: { $gte: new Date(reservationStart.getTime() - 2 * 60 * 60 * 1000), $lt: reservationEnd }
      });
    
    const compareReservation2 = await this.ReservationModel.findOne({
        userId: IdUser,
        reservationDate: { $gte: reservationStart, $lte: new Date(reservationEnd.getTime() + 2 * 60 * 60 * 1000) }
      });
      
    if (compareReservation || compareReservation2) {
      throw new BadRequestException("Réservation en cours dans cette période.");
    }

    const reservation = new this.ReservationModel({ ...createReservationDto, userId: IdUser});
    return reservation.save();
  }
  
  async getReservation(IdUser) {
    const reservations = await this.ReservationModel.find({ userId: IdUser });
        if (reservations.length === 0) {
          return { message: 'No reservation for the User' };
        }
        return reservations;
  }
  async deleteReservation(deleteReservationDto: DeleteReservationDto, IdUser) {
    const verifReservation = await this.ReservationModel.findOne({ _id: deleteReservationDto.reservationId, userId: IdUser });
        if (!verifReservation) {
          throw new NotFoundException('RéservationId pour le User Connecté introuvable.');
        }
    await this.ReservationModel.findByIdAndDelete(deleteReservationDto.reservationId);
    return { message: 'Réservation supprimée avec succès' };
  }
      

    
}
