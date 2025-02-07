import { Controller, Post, Body, Get, UseGuards, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { ApiProperty } from '@nestjs/swagger';

@ApiTags('Movies')
@ApiBearerAuth('access-token')
@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}
    
    @Get('now_playing')
    @ApiOperation({ summary: 'Récupérer les films en salle actuellement' })
    async getNowPlayingMovies() {
        return this.movieService.getNowPlayingMovies();
    }

    @Get('search')
    @ApiOperation({ summary: 'Rechercher un film par titre' })
    async searchMovie(@Query('query') query: string) {
        return this.movieService.searchMovie(query);
    }

    @Get(':movieId')
    @ApiOperation({ summary: 'Obtenir les détails d’un film spécifique' })
    async getMovieDetails(@Param('movieId') movieId: number) {
        return this.movieService.getMovieDetails(movieId);
    }

    @Get('movie/list')
    @ApiOperation({ summary: 'Obtenir la liste des genres' })
    async getMovieGenres() {
        return this.movieService.getMovieGenres();
    }

    @Get('movies')
    @ApiOperation({ summary: 'Obtenir la liste des films' })
    @ApiQuery({ name: 'sort_by', type: String, required: true, description: 'Filtrage', example: 'popularity.desc' })
    @ApiQuery({ name: 'pageNb', type: Number, required: true, description: 'Numéro de la page', example: 1 })
    @ApiQuery({ name: 'query', type: String, required: true, description: 'Texte de recherche pour filtrer les films', example: 'Batman' })
    async getMovieList(
        @Query('pageNb') pageNb: number,
        @Query('sort_by') sort_by: string, 
        @Query('query') search: string) {
        return this.movieService.getMovieList(pageNb,sort_by,search);
    }
}
