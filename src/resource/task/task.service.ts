import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO, EditTaskDTO } from './dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async fetchById(user: UserEntity, id: number) {
        return await this.taskRepository.findOne({
            where: { id, user },
        });
    }

    async fetchByUser(user: UserEntity) {
        return await this.taskRepository.find({
            where: { user },
        });
    }

    async add(user: UserEntity, createTaskDTO: CreateTaskDTO) {
        const newTask = this.taskRepository.create(createTaskDTO);
        return await this.taskRepository.save({ ...newTask, user });
    }

    async edit(user: UserEntity, editTask: EditTaskDTO) {
        const task = await this.taskRepository.findOneBy({
            id: editTask.id,
            user,
        });
        if (!task) {
            return null;
        }
        return await this.taskRepository.save({ ...editTask });
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
