import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { IsNull, Repository } from 'typeorm';
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
            return null;
        }
        await this.taskRepository.update({ id: taskId ,userId: userId}, { ...editTask });
        return await this.taskRepository.findOneBy({ id: taskId,userId: userId });;
    }
    

    async getTask(userId:number,taskId: number): Promise<ReturnTaskDTO> {
        return await this.taskRepository.findOneBy({ userId:userId,id: taskId });

    }

    async getAllTasks(userId: number): Promise<ReturnTaskDTO[]> {
        return await this.taskRepository.find({ where: { userId: userId } });
    }

    async addTask(userId: number,createTaskDTO: CreateTaskDTO): Promise<ReturnTaskDTO> {
        const newTask = this.taskRepository.create(createTaskDTO);
        newTask.userId = userId;
        return await this.taskRepository.save(newTask);
    }

    async deleteTask(userId: number,taskId: number): Promise<boolean> {
        const task = await this.taskRepository.findOneBy({ id: taskId, userId: userId });
        if (!task) {
            return false;
        }
        await this.taskRepository.remove(task);
        return true;
    }
}
