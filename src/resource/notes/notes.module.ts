import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesEntity } from 'src/database/entities/notes.entity';

@Module({ imports: [TypeOrmModule.forFeature([NotesEntity])] })
export class NotesModule {}
