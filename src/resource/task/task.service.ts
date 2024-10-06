import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TaskEntity } from 'src/database/entities/task.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO, EditTaskDTO, ReturnTaskDTO } from './dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async fetchById(user: UserEntity, id: number) {
        const task = await this.taskRepository.findOne({
            where: { id, user },
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return plainToInstance(ReturnTaskDTO, task);
    }

    async fetchByUser(user: UserEntity) {
        const tasks = await this.taskRepository.find({
            where: { user },
        });
        return plainToInstance(ReturnTaskDTO, tasks);
    }

    async add(user: UserEntity, createTaskDTO: CreateTaskDTO) {
        const newTask = this.taskRepository.create(createTaskDTO);
        const addedTask: TaskEntity = await this.taskRepository.save({
            ...newTask,
            user,
        });
        return plainToInstance(ReturnTaskDTO, addedTask);
    }

    async edit(user: UserEntity, editTask: EditTaskDTO) {
        const task = await this.taskRepository.findOneBy({
            id: editTask.id,
            user,
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        const editedTask: TaskEntity = await this.taskRepository.save({
            ...editTask,
        });
        return plainToInstance(ReturnTaskDTO, editedTask);
    }

    async delete(user: UserEntity, id: number) {
        const task = await this.taskRepository.findOneBy({
            id,
            user,
        });
        if (task) {
            try {
                await this.taskRepository.remove(task);
                return true;
            } catch {
                return false;
            }
        }

        return false;
    }
}
