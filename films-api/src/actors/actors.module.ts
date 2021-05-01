import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorRepository } from './repository/actor.repository';
import { ActorsServiceService } from './services/actors-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActorRepository])],
  exports: [TypeOrmModule, ActorsServiceService],
  providers: [ActorsServiceService],
})
export class ActorsModule {}
