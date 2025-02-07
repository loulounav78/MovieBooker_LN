import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true, unique: false })
  userId: string;

  @Prop({ required: true })
  movieId: number;

  @Prop()
  seatNumber?: string;

  @Prop({ type: Date, required: true })
  reservationDate: Date;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
