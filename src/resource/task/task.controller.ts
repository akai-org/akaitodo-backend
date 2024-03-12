import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
    Post,
    Delete,
    Res,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';
import { TaskService } from './task.service';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    async getTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number,
        @Res() res: Response,
    ): Promise<void> {
        const task = await this.taskService.getTask(userId, taskId);
        if (task) {
            res.status(HttpStatus.OK).json(task);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'Task not found',
            });
        }
    }

    @Get()
    getAllTasks(@GetUser('id') userId: number): Promise<ReturnTaskDTO[]> {
        return this.taskService.getAllTasks(userId);
    }

    @Post()
    addTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser('id') userId: number,
    ): Promise<ReturnTaskDTO> {
        return this.taskService.addTask(userId, createTaskDTO);
    }

    @Patch(':id')
    async editTask(
        @Param('id', ParseIntPipe) taskId: number,
        @GetUser('id') userId: number,
        @Body() editTask: EditTaskDTO,
        @Res() res: Response,
    ): Promise<void> {
        const task = await this.taskService.editTask(taskId, userId, editTask);
        if (task) {
            res.status(HttpStatus.OK).json(task);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'Task not found',
            });
        }
    }

    @Delete(':id')
    async deleteTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number,
        @Res() res: Response,
    ): Promise<void> {
        const task = await this.taskService.deleteTask(userId, taskId);
        if (!task) {
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'Task not found',
            });
        } else {
            res.status(HttpStatus.OK).json({ message: 'Task deleted' });
        }
    }
}
