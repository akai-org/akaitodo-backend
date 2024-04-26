import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { NoteService } from './notes.service';
import { NoteController } from './notes.controller';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, UserEntity])],
    controllers: [NoteController],
    providers: [NoteService],
    exports: [NoteService],
})
export class NoteModule {}
