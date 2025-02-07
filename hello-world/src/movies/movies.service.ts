import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly API_URL = 'https://api.themoviedb.org/3';
  private readonly API_KEY: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.API_KEY = this.configService.get<string>('TMDB_API_KEY') || "a710850e0986754245941da67274c627";
  }

  async getNowPlayingMovies() {
    const url = `${this.API_URL}/movie/now_playing?api_key=${this.API_KEY}&language=fr-FR`;
    try {
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
      } catch (error) {
        throw new HttpException(error.response?.data || 'Erreur interne', HttpStatus.BAD_REQUEST);
      }
  }

  async searchMovie(query: string) {
    const url = `${this.API_URL}/search/movie?api_key=${this.API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`;
    try {
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
      } catch (error) {
        throw new HttpException(error.response?.data || 'Erreur interne', HttpStatus.BAD_REQUEST);
      }
  }

  async getMovieDetails(movieId: number) {
    const url = `${this.API_URL}/movie/${movieId}?api_key=${this.API_KEY}&language=fr-FR`;
    try {
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
      } catch (error) {
        throw new HttpException(error.response?.data || 'Erreur interne', HttpStatus.BAD_REQUEST);
      }
  }

  async getMovieGenres() {
    const url = `${this.API_URL}/genre/movie/list?api_key=${this.API_KEY}&language=fr-FR`;
    try {
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
      } catch (error) {
        throw new HttpException(error.response?.data || 'Erreur interne', HttpStatus.BAD_REQUEST);
      }
  }

  async getMovieList(pageNb: number, sort_by: string, search: string) {
    const url = `${this.API_URL}/search/movie?api_key=${this.API_KEY}&language=fr-FR&page=${pageNb}&sort_by=${sort_by}&query=${encodeURIComponent(search)}`;
    try {
        const response = await this.httpService.axiosRef.get(url);
        return response.data;
      } catch (error) {
        throw new HttpException(error.response?.data || 'Erreur interne', HttpStatus.BAD_REQUEST);
      }
  }

}
