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
        userId: number,
        editUserDto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                ...editUserDto,
            },
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }

    async getUserById(userId: number): Promise<ReturnUserDTO> {
        const user = await this.userRepository.findOneBy({ id: userId });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }
}
