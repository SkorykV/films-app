import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './services/films.service';
import { FilmRepository } from './repository/film.repository';
import { ActorsModule } from 'src/actors/actors.module';
import { SharedModule } from '../shared/shared.module';
import { FilmsParserService } from './services/films-parser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmRepository]),
    ActorsModule,
    SharedModule,
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsParserService],
})
export class FilmsModule {}
