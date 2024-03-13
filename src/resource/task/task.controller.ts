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

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    getTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<ReturnTaskDTO> {
        const task = this.taskService.getTask(taskId, userId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @Get()
    getAllTasks(@GetUser('id') userId: number): Promise<ReturnTaskDTO[]> {
        return this.taskService.getAllUserTasks(userId);
    }

    @Post()
    addTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser('id') userId: number,
    ): Promise<ReturnTaskDTO> {
        return this.taskService.addTask(userId, createTaskDTO);
    }

    @Patch(':id')
    editTask(
        @Param('id', ParseIntPipe) taskId: number,
        @GetUser('id') userId: number,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        const task = this.taskService.editTask(taskId, userId, editTask);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @Delete(':id')
    @HttpCode(200)
    deleteTask(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<void> {
        const isTaskRemoved = this.taskService.deleteTask(userId, taskId);
        if (!isTaskRemoved) throw new NotFoundException('Task not found');
        return;
    }
}
