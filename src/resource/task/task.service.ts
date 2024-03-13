import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async editTask(
        user: UserEntity,
        id: number,
        editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({
            id,
            user,
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.taskRepository.update({ id, user }, { ...editTask });
        return await this.taskRepository.findOneBy({
            id,
            user,
        });
    }

    async getTask(user: UserEntity, id: number): Promise<ReturnTaskDTO> {
        return await this.taskRepository.findOneBy({
            id,
            user,
        });
    }

    async getAllUserTasks(user: UserEntity): Promise<ReturnTaskDTO[]> {
        return await this.taskRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async addTask(
        user: UserEntity,
        createTaskDTO: CreateTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const newTask = this.taskRepository.create(createTaskDTO);
        return await this.taskRepository.save({ ...newTask, user });
    }

    async deleteTask(user: UserEntity, id: number): Promise<boolean> {
        const task = await this.taskRepository.findOneBy({
            id,
            user,
        });
        if (task) {
            await this.taskRepository.remove(task);
            return true;
        }
        return false;
    }
}
