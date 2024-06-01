import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetQuery } from "../impl/get.query";
import { UserRepository } from "src/users/repository/user.repository";

@QueryHandler(GetQuery)
export class GetQueryHandler implements IQueryHandler<GetQuery> {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(query: GetQuery) {
        console.log("Query received with id: ", query.id);
        const user = await this.userRepository.findOneById(query.id)
        user.sayHello();
        return user;
    }
}