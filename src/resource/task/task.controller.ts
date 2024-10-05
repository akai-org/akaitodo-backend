import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { UserEntity } from 'src/database/entities/user.entity';
import { GetUser } from 'src/decorators';
import {
    AddTaskApi,
    DeleteTaskApi,
    EditTaskApi,
    GetTaskByIdApi,
    GetUserTasksApi,
} from 'src/decorators/OpenAPI';
import { CreateTaskDTO, EditTaskDTO, ReturnTaskDTO } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @GetUserTasksApi()
    async getUserTasks(@GetUser() user: UserEntity): Promise<ReturnTaskDTO[]> {
        return await this.taskService.fetchByUser(user);
    }

    @Get(':id')
    @GetTaskByIdApi()
    async getTaskById(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<ReturnTaskDTO> {
        const task = await this.taskService.fetchById(user, taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    @Post()
    @AddTaskApi()
    async addTask(
        @GetUser() user: UserEntity,
        @Body() createTaskDTO: CreateTaskDTO,
    ): Promise<ReturnTaskDTO> {
        return await this.taskService.add(user, createTaskDTO);
    }

    @Patch(':id')
    @EditTaskApi()
    async editTask(
        @Param('id') id: number,
        @GetUser() user: UserEntity,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        if (id != editTask.id) {
            throw new BadRequestException('ID is not valid in URL and body');
        }

        const task = await this.taskService.edit(user, editTask);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @DeleteTaskApi()
    async deleteTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<void> {
        const isTaskRemoved = await this.taskService.delete(user, taskId);
        if (!isTaskRemoved) throw new NotFoundException('Task not found');
        return;
    }
}
