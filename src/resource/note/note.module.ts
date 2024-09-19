import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, UserEntity])],
    controllers: [NoteController],
    providers: [NoteService],
})
export class NoteModule {}
