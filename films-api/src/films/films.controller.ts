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
import { CreateFilmDTO } from './dto/create-film.dto';
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
  async uploadFileNew(@UploadedFile() file: Express.Multer.File) {
    const start = process.hrtime();
    const createFilmWithActorsDTOs = await this.filmsParserService.parseFilmsFromBuffer(
      file.buffer,
    );
    await this.filmsService.createManyFilms(createFilmWithActorsDTOs);

    const passedTime = process.hrtime(start);

    return `Execution time (hr): ${passedTime[0]}s ${
      passedTime[1] / 1000000
    }ms`;
  }
}
