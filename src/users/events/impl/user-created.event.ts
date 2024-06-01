import { User } from "src/users/entity/user.entity";

export class UserCreatedEvent {
    constructor(public readonly user: User) { }
}