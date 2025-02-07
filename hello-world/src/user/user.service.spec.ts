import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';  // Ton schéma Mongoose

describe('UserService', () => {
  let service: UserService;
  let model: any; // pour mocker UserModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/MovieBooker'), // Utilise une base de données test si nécessaire
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Ajout de UserSchema
      ],
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name), // Mock du modèle User
          useValue: {
            findOne: jest.fn(), // Tu peux ajouter d'autres méthodes comme findOne, save, etc.
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get(getModelToken(User.name)); // Accès au mock de UserModel
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
