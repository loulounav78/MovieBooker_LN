import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service'; 
import { HttpModule, HttpService } from '@nestjs/axios'; // Importer HttpModule pour HttpService
import { ConfigService } from '@nestjs/config'; // Si tu utilises ConfigService
import { getModelToken } from '@nestjs/mongoose'; // Si tu utilises Mongoose pour ton modèle

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule], // Ajouter HttpModule
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: ConfigService, // Mock de ConfigService si nécessaire
          useValue: {
            get: jest.fn().mockReturnValue('mockedValue'), // Exemple de mock pour la méthode get
          },
        },
        {
          provide: HttpService, // Mock de HttpService si nécessaire
          useValue: {
            get: jest.fn().mockResolvedValue({ data: 'mocked data' }), // Exemple de mock pour HttpService
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
