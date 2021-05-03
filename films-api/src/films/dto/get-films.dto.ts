import { IsIn, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { DB_SORT } from 'src/shared/types/db.types';

export class FilterFilmsDTO {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  actorName: string;
}

export class GetFilmsDTO extends FilterFilmsDTO {
  @IsOptional()
  @IsIn(Object.values(DB_SORT))
  sort = DB_SORT.ASC;
}
