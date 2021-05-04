import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilmsService } from './services/films.service';
import * as multer from 'multer';
import { Film } from './repository/film.entity';
import { GetFilmsDTO } from './dto/get-films.dto';
import { FilmsParserService } from './services/films-parser.service';
import { CreateFilmWithActorsDTO } from './dto/create-film-with-actors.dto';

@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly filmsParserService: FilmsParserService,
  ) {}

  @Get()
  async getFilms(@Query() getFilmsDTO: GetFilmsDTO): Promise<Film[]> {
    return this.filmsService.getFilms(getFilmsDTO);
  }

  @Get(':filmId')
  async getFilm(@Param('filmId', ParseIntPipe) filmId: number): Promise<Film> {
    return this.filmsService.getFilm(filmId);
  }

  @Delete(':filmId')
  async deleteFilm(
    @Param('filmId', ParseIntPipe) filmId: number,
  ): Promise<void> {
    return this.filmsService.deleteFilm(filmId);
  }

  @Post()
  async createFilm(@Body() createFilmWithActorsDTO: CreateFilmWithActorsDTO) {
    return this.filmsService.createFilm(createFilmWithActorsDTO);
  }

  @Post('parse')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async createFilmsFromFile(@UploadedFile() file: Express.Multer.File) {
    const createFilmWithActorsDTOs = await this.filmsParserService.parseFilmsFromBuffer(
      file.buffer,
    );
    const insertedFilmsCount = await this.filmsService.createManyFilms(
      createFilmWithActorsDTOs,
    );

    return { created: insertedFilmsCount };
  }
}
