import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
    ) {}

    async handle(event: UserCreatedEvent) {
        console.log(`User created: ${event.user.name} with email ${event.user.email}`);
        console.log("Sending welcome email to user...");
    }
}