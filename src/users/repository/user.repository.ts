import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/models/user.model";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }

    async save(user: User) {
        const userEntity = new UserEntity();
        userEntity.name = user.name;
        userEntity.email = user.email;
        await this.userRepository.save(userEntity);
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id } });
        const userEntity = new User(user.name, user.email, user.id);
        return userEntity;
    }
}