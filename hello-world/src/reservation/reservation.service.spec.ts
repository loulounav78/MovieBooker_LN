import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/createReservation.dto';
import { DeleteReservationDto } from './dto/deleteReservation.dto';
import { JwtService } from '@nestjs/jwt';

describe('ReservationService', () => {
  let service: ReservationService;
  let model: Model<Reservation>;
  let mockJwtService: JwtService;

  beforeEach(async () => {
    mockJwtService = jest.genMockFromModule('@nestjs/jwt') as JwtService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: {
            create: jest.fn().mockResolvedValue({
              save: jest.fn().mockResolvedValue(true),  // Mock de la méthode save
            }),
            findOne: jest.fn(),
            find: jest.fn(),
            findByIdAndDelete: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: mockJwtService, // Injection du JwtService mocké
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    model = module.get<Model<Reservation>>(getModelToken(Reservation.name));
  });
  /*
  Problème avec le type des creations
  describe('createReservation', () => {
    it('should create a reservation if no conflict', async () => {
      const createReservationDto: CreateReservationDto = {
        userId: '67a225f1bff1e7b6ef63a505',
        movieId: 60978,
        seatNumber: 'B15',
        reservationDate: new Date('2025-02-10T19:30:00Z'),
      };

      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null); // Simule qu'il n'y a pas de réservation existante.

      // Simuler la méthode create
      const reservationMock = {
        save: jest.fn().mockResolvedValue(true), // Mock de la méthode save
      };
      jest.spyOn(model, 'create').mockResolvedValueOnce(reservationMock as any);

      const result = await service.createReservation(createReservationDto, '67a225f1bff1e7b6ef63a505');
      expect(result).toEqual(true); // On s'attend à ce que la méthode save soit appelée avec succès
    });

    it('should throw BadRequestException if there is a conflicting reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        userId: '67a225f1bff1e7b6ef63a505',
        movieId: 60978,
        seatNumber: 'B15',
        reservationDate: new Date('2025-02-10T19:30:00Z'),
      };

      const existingReservation = { userId: '67a225f1bff1e7b6ef63a505', reservationDate: new Date('2025-02-10T19:00:00Z') };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(existingReservation); // Simule une réservation conflictuelle.

      await expect(service.createReservation(createReservationDto, '67a225f1bff1e7b6ef63a505')).rejects.toThrowError(
        new BadRequestException('Réservation en cours dans cette période.')
      );
    });
  });
  */
  describe('getReservation', () => {
    it('should return reservations for a user', async () => {
      const mockReservations = [
        { userId: '67a225f1bff1e7b6ef63a505', movieId: 60978, seatNumber: 'B15', reservationDate: new Date('2025-02-10T19:30:00Z') },
      ];
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockReservations);

      const result = await service.getReservation('67a225f1bff1e7b6ef63a505');
      expect(result).toEqual(mockReservations);
    });

    it('should return a message if no reservations exist for the user', async () => {
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      const result = await service.getReservation('67a225f1bff1e7b6ef63a505');
      expect(result).toEqual({ message: 'No reservation for the User' });
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation if it exists', async () => {
      const deleteReservationDto: DeleteReservationDto = { reservationId: 'someId' };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce({ userId: '67a225f1bff1e7b6ef63a505' }); // Simule que la réservation existe

      const result = await service.deleteReservation(deleteReservationDto, '67a225f1bff1e7b6ef63a505');
      expect(result).toEqual({ message: 'Réservation supprimée avec succès' });
    });

    it('should throw NotFoundException if the reservation does not exist', async () => {
      const deleteReservationDto: DeleteReservationDto = { reservationId: 'someId' };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null); // Simule qu'il n'y a pas de réservation à supprimer

      await expect(service.deleteReservation(deleteReservationDto, '67a225f1bff1e7b6ef63a505')).rejects.toThrowError(
        new NotFoundException('RéservationId pour le User Connecté introuvable.')
      );
    });
  });
});
