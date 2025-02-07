import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config'; // Importer ConfigService

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService, 
          useValue: { get: jest.fn() }, // Mock de HttpService
        },
        {
          provide: ConfigService, // Mock de ConfigService
          useValue: {
            get: jest.fn().mockReturnValue('mockedConfigValue'), // Mock de la méthode get
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
