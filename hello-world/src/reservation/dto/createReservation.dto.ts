import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '60978', description: 'id du film' })
  @IsInt()
  @IsPositive()
  movieId: number;

  @ApiProperty({ example: 'B15', description: 'Siège réservé' })
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @ApiProperty({ example: '2025-02-10T19:30:00Z', description: 'heure de réservation' })
  @IsDateString()
  @IsNotEmpty()
  reservationDate: Date;
}
