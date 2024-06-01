import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';


export class User extends AggregateRoot {

    private id: number;
    public name: string;
    public email: string;


    constructor(name: string, email: string,id?: number) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
    }

    sayHello() {
        console.log(`Hello, ${this.name}!`);
    }

    isCreated() {
        this.apply(new UserCreatedEvent(this))
    }
}