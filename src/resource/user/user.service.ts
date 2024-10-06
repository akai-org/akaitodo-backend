import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDTO, ReturnUserDTO } from './dto';

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
        if (!userToUpdate) throw new NotFoundException('User not found');
        this.userRepository.merge(userToUpdate, editUserDto);
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                ...editUserDto,
            },
        );
        return plainToInstance(ReturnUserDTO, userToUpdate);
    }

    async getUserById(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException('User not found');
        return plainToInstance(ReturnUserDTO, user);
    }
}
