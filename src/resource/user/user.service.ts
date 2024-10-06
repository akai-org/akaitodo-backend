import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDTO } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async editMe(userId: number, editUserDto: EditUserDTO) {
        const userToUpdate = await this.userRepository.findOneBy({
            id: userId,
        });
        if (!userToUpdate) return null;
        this.userRepository.merge(userToUpdate, editUserDto);
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                ...editUserDto,
            },
        );
        delete userToUpdate.hash;
        return userToUpdate;
    }

    async getUserById(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) return null;
        delete user.hash;
        return user;
    }
}
