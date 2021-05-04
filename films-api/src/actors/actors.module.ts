import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorRepository } from './repository/actor.repository';
import { ActorsService } from './services/actors.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActorRepository])],
  exports: [TypeOrmModule, ActorsService],
  providers: [ActorsService],
})
export class ActorsModule {}
