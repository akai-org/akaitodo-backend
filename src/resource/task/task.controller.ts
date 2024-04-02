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
    async getUserTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskService.getUserTask(user, taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
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

    @Patch()
    async editTask(
        @GetUser() user: UserEntity,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskService.editTask(user, editTask);
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
