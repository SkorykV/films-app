import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateActorDTO } from 'src/actors/dto/create-actor.dto';
import { CreateFilmDTO } from './create-film.dto';

export class CreateFilmWithActorsDTO extends CreateFilmDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateActorDTO)
  @IsArray()
  stars: CreateActorDTO[];
}
