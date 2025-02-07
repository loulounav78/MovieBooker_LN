import { Controller, Delete, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/createReservation.dto';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { DeleteReservationDto } from './dto/deleteReservation.dto';

@ApiTags('Reservation')
@ApiBearerAuth('access-token')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('reservations')
    @ApiOperation({ summary: 'Créer une réservation' })
    async createReservation(@Body() createReservationDto: CreateReservationDto, @Req() req) {
        return this.reservationService.createReservation(createReservationDto, req.user.userId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('reservations')
    @ApiOperation({ summary: 'Récupérer les réservations de l utilisateur' })
    async getReservation(@Req() req) {
        return this.reservationService.getReservation(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Annuler une réservation' })
    async deleteReservation(@Body() deleteReservationDto: DeleteReservationDto, @Req() req) {
        return this.reservationService.deleteReservation(deleteReservationDto, req.user.userId);
    }
}
