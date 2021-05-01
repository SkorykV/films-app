import { IsNotEmpty } from 'class-validator';

export class CreateActorDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
}
