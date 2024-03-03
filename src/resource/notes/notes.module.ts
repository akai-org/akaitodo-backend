import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesEntity } from 'src/database/entities/notes.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([NotesEntity])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule {}
