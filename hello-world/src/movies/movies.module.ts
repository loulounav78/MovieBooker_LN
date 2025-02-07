import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
