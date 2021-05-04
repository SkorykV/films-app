import { EntityRepository, In, Repository } from 'typeorm';
import { CreateActorDTO } from '../dto/create-actor.dto';
import { Actor } from './actor.entity';

@EntityRepository(Actor)
export class ActorRepository extends Repository<Actor> {
  async getOrCreateMany(actorDTOs: CreateActorDTO[]): Promise<Actor[]> {
    await this.createQueryBuilder()
      .insert()
      .into(Actor)
      .values(actorDTOs)
      .onConflict(`("firstName", "lastName") DO NOTHING`)
      .execute();

    return this.findActors(actorDTOs);
  }

  async findActors(actorDTOs: CreateActorDTO[]): Promise<Actor[]> {
    return this.find({
      where: {
        firstName: In(actorDTOs.map((actor) => actor.firstName)),
        lastName: In(actorDTOs.map((actor) => actor.lastName)),
      },
    });
  }
}
