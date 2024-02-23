import { Injectable, NotFoundException } from '@nestjs/common';
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

    async editUser(
        userID: number,
        edituserdto: EditUserDTO,
    ): Promise<UserEntity> {
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
        delete user.password;
        return user;
    }
}
