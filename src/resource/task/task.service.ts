import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getUserTask(user: UserEntity, id: number): Promise<TaskEntity> {
        return await this.taskRepository.findOne({
            where: { id, user },
        });
    }

    async getAllUserTasks(user: UserEntity): Promise<ReturnTaskDTO[]> {
        return await this.taskRepository.find({
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

    async editTask(
        user: UserEntity,
        editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({
            id: editTask.id,
            user,
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return await this.taskRepository.save({ ...editTask });
    }

    async deleteTask(user: UserEntity, id: number): Promise<boolean> {
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
