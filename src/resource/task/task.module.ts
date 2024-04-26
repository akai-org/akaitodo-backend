import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}
