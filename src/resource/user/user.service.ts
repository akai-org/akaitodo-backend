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

    async editUserById(
        userId: number,
        editUserDto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        const { affected } = await this.userRepository.update(
            {
                id: userId,
            },
            {
                ...editUserDto,
            },
        );
        if (affected == 0) throw new NotFoundException('User not found');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = await this.userRepository.findOneBy({
            id: userId,
        });
        return result;
    }

    async getUserById(userId: number): Promise<ReturnUserDTO> {
        const user = await this.userRepository.findOneBy({ id: userId });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }
}
