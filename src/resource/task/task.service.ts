import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { EditTaskDTO,ReturnTaskDTO,CreateTaskDTO } from './dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    //TODO: Add userId requirement
    async editTask(
        taskId: number,
        editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({ id: taskId });
        if (!task) throw new NotFoundException('Task not found');
        await this.taskRepository.update(
            { id: taskId,},
            {...editTask,},
        );
        const { userId, ...result } = task;
        return result;
    }

    async getTask(taskId: number): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({ id: taskId });
        const { userId, ...result } = task;
        return result;
    }

    async getAllTasks(): Promise<ReturnTaskDTO[]> {
        const tasks = await this.taskRepository.find();
        return tasks.map(({ userId, ...result }) => result);
    }

    async addTask(createTaskDTO: CreateTaskDTO): Promise<ReturnTaskDTO> {
        const newTask = this.taskRepository.create(createTaskDTO);
        const savedTask = await this.taskRepository.save(newTask);
        const {userId, ...result } = savedTask;
        return result;
    }

    async deleteTask(taskId: number): Promise<void> {
        const task = await this.taskRepository.findOneBy({ id: taskId });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.taskRepository.remove(task);
    }

}
