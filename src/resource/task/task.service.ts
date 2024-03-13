import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async editTask(
        id: number,
        userId: number,
        editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({
            id,
            userId,
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.taskRepository.update(
            { id, userId: userId },
            { ...editTask },
        );
        return await this.taskRepository.findOneBy({
            id,
            userId: userId,
        });
    }

    async getTask(id: number, userId: number): Promise<ReturnTaskDTO> {
        return await this.taskRepository.findOneBy({
            id,
            userId: userId,
        });
    }

    async getAllUserTasks(userId: number): Promise<ReturnTaskDTO[]> {
        return await this.taskRepository.find({ where: { userId: userId } });
    }

    async addTask(
        userId: number,
        createTaskDTO: CreateTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const newTask = this.taskRepository.create(createTaskDTO);
        return await this.taskRepository.save({ ...newTask, userId });
    }

    async deleteTask(userId: number, id: number): Promise<boolean> {
        const task = await this.taskRepository.findOneBy({
            id,
            userId: userId,
        });
        if (task) {
            this.taskRepository.remove(task);
            return true;
        }
        return false;
    }
}
