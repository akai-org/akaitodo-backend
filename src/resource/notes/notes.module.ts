import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesEntity } from 'src/database/entities/notes.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NotesEntity, UserEntity])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule {}
