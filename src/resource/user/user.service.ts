import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDTO, ReturnUserDTO } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async editMe(
        userID: number,
        edituserdto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        const user = await this.userRepository.findOneBy({ id: userID });
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.update(
            {
                id: userID,
            },
            {
                ...edituserdto,
            },
        );
        const { hash, ...result } = user;
        return result;
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
    }
}
