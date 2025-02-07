import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from '../src/reservation/dto/createReservation.dto';
import { Reservation } from '../src/reservation/reservation.schema';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;
  let reservationModel: Model<Reservation>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Récupération correcte du modèle Reservation
    reservationModel = moduleFixture.get<Model<Reservation>>(getModelToken('Reservation'));
  });

  afterEach(async () => {
    if (reservationModel) {
      await reservationModel.deleteMany({}); // Nettoie la base après chaque test
    }
  });

  afterAll(async () => {
    await app.close(); // Ferme l'application une fois les tests terminés
  });

  it('/reservations/reservations (POST) should create a new reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      userId: 'user123',
      movieId: 60978,
      seatNumber: 'B15',
      reservationDate: new Date(),
    };

    return request(app.getHttpServer())
      .post('/reservation/reservations')
      .send(createReservationDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('userId', 'user123');
        expect(res.body).toHaveProperty('movieId', 60978);
        expect(res.body).toHaveProperty('seatNumber', 'B15');
      });
  });

  it('/reservations (GET) should return an empty array when no reservations exist', async () => {
    return request(app.getHttpServer())
      .get('/reservation/reservations?userId=user123')
      .expect(200)
      .expect([]); // Vérifie qu'il n'y a aucune réservation pour l'utilisateur
  });
});
