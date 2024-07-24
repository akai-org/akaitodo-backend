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
import { GetUser } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDTO, EditTaskDTO, ReturnTaskDTO } from './dto';
import { TaskService } from './task.service';
import { UserEntity } from 'src/database/entities/user.entity';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('/user/all')
    @ApiOkResponse({ type: [ReturnTaskDTO] })
    async getAllUserTasks(
        @GetUser() user: UserEntity,
    ): Promise<ReturnTaskDTO[]> {
        return await this.taskService.getAllUserTasks(user);
    }

    @Get('/user/:id')
    @ApiOkResponse({ type: ReturnTaskDTO })
    @ApiNotFoundResponse({ description: 'Task not found' })
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

    @Post()
    @ApiCreatedResponse({ type: ReturnTaskDTO })
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiBody({ type: CreateTaskDTO })
    async addTask(
        @GetUser() user: UserEntity,
        @Body() createTaskDTO: CreateTaskDTO,
    ): Promise<ReturnTaskDTO> {
        return await this.taskService.addTask(user, createTaskDTO);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ReturnTaskDTO })
    @ApiBadRequestResponse({
        description: 'Invalid body / ID is not valid in URL and body',
    })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiBody({ type: EditTaskDTO })
    async editTask(
        @Param('id') id: number,
        @GetUser() user: UserEntity,
        @Body() editTask: EditTaskDTO,
    ): Promise<ReturnTaskDTO> {
        if (id != editTask.id) {
            throw new BadRequestException('ID is not valid in URL and body');
        }

        const task = await this.taskService.editTask(user, editTask);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @ApiNoContentResponse()
    @ApiNotFoundResponse({ description: 'Task not found' })
    async deleteTask(
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) taskId: number,
    ): Promise<void> {
        const isTaskRemoved = await this.taskService.deleteTask(user, taskId);
        if (!isTaskRemoved) throw new NotFoundException('Task not found');
        return;
    }
}
