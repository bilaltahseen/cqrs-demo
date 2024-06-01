import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDto } from './interfaces/create.dto';
import { CreateCommand } from './commands/impl/create.command';
import { GetQuery } from './queries/impl/get.query';

@Controller('users')
export class UsersController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }


    @Post()
    async create(@Body() createDto: CreateDto) {
        return this.commandBus.execute(new CreateCommand(createDto.name, createDto.email));
    }

    @Get(":id")
    async get(@Param('id') id: number) {
        return this.queryBus.execute(new GetQuery(id));
    }
}
