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

import { GetTask } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditTaskDTO, ReturnTaskDTO, CreateTaskDTO } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) taskId: number): Promise<ReturnTaskDTO> {
        return this.taskService.getTask(taskId);
    }

    @Get()
    getAllTasks(): Promise<ReturnTaskDTO[]> {
        return this.taskService.getAllTasks();
    }

    @Post()
    addTask(@Body() createTaskDTO: CreateTaskDTO): Promise<ReturnTaskDTO> {
        return this.taskService.addTask(createTaskDTO);
    }

    @Patch(':id')
    editTask(
        @Param('id', ParseIntPipe) taskId: number,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        return this.taskService.editTask(taskId, editTask);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<void> {
        await this.taskService.deleteTask(taskId);
    }
}
