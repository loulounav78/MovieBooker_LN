import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class DeleteReservationDto {
  @ApiProperty({ example: '', description: 'id de la réservation' })
  @IsString()
  @IsNotEmpty()
  reservationId: string;
}
