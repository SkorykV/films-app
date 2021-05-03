import { IsNotEmpty } from 'class-validator';

export interface CreateActorDTO {
  firstName: string;
  lastName: string;
}

export interface Actor extends CreateActorDTO {
  id: number;
}

export class CreateActorDTO {
  @IsNotEmpty()
  firstName!: string;
  @IsNotEmpty()
  lastName!: string;
}
