import { IsIn, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { DB_SORT } from 'src/shared/types/db.types';

export class GetFilmsDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  actorName: string;

  @IsOptional()
  @IsIn(Object.values(DB_SORT))
  sort = DB_SORT.ASC;
}
