import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { ActorsModule } from './actors/actors.module';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),
    FilmsModule,
    ActorsModule,
    SharedModule,
  ],
})
export class AppModule {}
