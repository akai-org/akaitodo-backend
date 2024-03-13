import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
    Post,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';
import { TaskService } from './task.service';
import { UserEntity } from 'src/database/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    async getTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskService.getTask(user, taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return { ...task, user };
    }

    @Get()
    async getAllUserTasks(
        @GetUser() user: UserEntity,
    ): Promise<ReturnTaskDTO[]> {
        return await this.taskService.getAllUserTasks(user);
    }

    @Post()
    async addTask(
        @GetUser() user: UserEntity,
        @Body() createTaskDTO: CreateTaskDTO,
    ): Promise<ReturnTaskDTO> {
        return await this.taskService.addTask(user, createTaskDTO);
    }

    @Patch(':id')
    async editTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskService.editTask(user, taskId, editTask);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<void> {
        const isTaskRemoved = await this.taskService.deleteTask(user, taskId);
        if (!isTaskRemoved) throw new NotFoundException('Task not found');
        return;
    }
}
