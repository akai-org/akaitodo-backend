import { Injectable, NotFoundException } from '@nestjs/common';
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

    async editTask(taskId: number,userId: number, editTask: EditTaskDTO): Promise<ReturnTaskDTO> {
        const task = await this.taskRepository.findOneBy({ id: taskId,userId: userId });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.taskRepository.update({ id: taskId ,userId: userId}, { ...editTask });
        return task;
    }
    

    async getTask(userId:number,taskId: number): Promise<ReturnTaskDTO> {
        return await this.taskRepository.findOneBy({ userId:userId,id: taskId });
    }

    async getAllTasks(userId: number): Promise<ReturnTaskDTO[]> {
        return await this.taskRepository.find({ where: { userId: userId } });
    }

    async addTask(userId: any,createTaskDTO: CreateTaskDTO): Promise<ReturnTaskDTO> {
        console.log('userId:', userId);
        const newTask = this.taskRepository.create(createTaskDTO);
        newTask.userId = userId;
        return await this.taskRepository.save(newTask);
    }

    async deleteTask(userId: number,taskId: number): Promise<void> {
        const task = await this.taskRepository.findOneBy({ id: taskId, userId: userId });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        await this.taskRepository.remove(task);
    }
}
