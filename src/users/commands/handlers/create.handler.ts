import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from '../impl/create.command';
import { User } from '../../entity/user.entity';
import { UserRepository } from 'src/users/repository/user.repository';


@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CreateCommand) {
        const user = new User(command.name, command.email);
        await this.userRepository.save(user);
        user.isCreated();
        this.publisher.mergeObjectContext(user).commit();
        return command;
    }
}