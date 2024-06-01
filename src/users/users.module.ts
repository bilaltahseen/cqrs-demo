import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/models/user.model';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule,TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...CommandHandlers,...QueryHandlers,...EventHandlers,UserRepository]
})
export class UsersModule { }
