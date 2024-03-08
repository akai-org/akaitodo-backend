import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
    Post,
    Delete,
} from '@nestjs/common';

import { UserEntity } from 'src/database/entities/user.entity';
import { GetTask,GetUser } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    getTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number
    ): Promise<ReturnTaskDTO> {
        return this.taskService.getTask(userId,taskId);
    }

    @Get()
    getAllTasks(
        @GetUser('id') userId: number)
    : Promise<ReturnTaskDTO[]> {
        return this.taskService.getAllTasks(userId);
    }

    @Post()
    addTask(
        @GetUser('id') userId: any,
        @Body() createTaskDTO: CreateTaskDTO
    ): Promise<ReturnTaskDTO> {
        console.log('12345654323userId:', userId);
        return this.taskService.addTask(userId,createTaskDTO);
    }

    @Patch(':id')
    editTask(
        @Param('id', ParseIntPipe) taskId: number,
        @GetUser('id') userId: number,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        return this.taskService.editTask(taskId,userId, editTask);
    }

    @Delete(':id')
    async deleteTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number
    ): Promise<void> {
        await this.taskService.deleteTask(userId,taskId);
    }
}
