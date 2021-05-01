import { Injectable } from '@nestjs/common';
import { Actor } from '../repository/actor.entity';

@Injectable()
export class ActorsServiceService {
  public buildActorsMap(actors: Actor[]): Map<string, Actor> {
    const map = new Map<string, Actor>();

    for (const actor of actors) {
      map.set(actor.fullName, actor);
    }

    return map;
  }
}
