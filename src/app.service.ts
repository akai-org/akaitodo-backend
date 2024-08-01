import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { RecurrenceType, UserRole } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

    async seedDatabase(): Promise<string> {
        const admin = this.userRepository.create({
            id: 1,
            username: 'admin',
            email: 'admin@local.host',
            hash: '$argon2id$v=19$m=65536,t=3,p=4$VIdKpSJabFpUj4Q5LfsCyQ$+lK9AziRRoT66i2QKRlYSdSUbpQ9onbgmvqiJAfEYWA',
            isLocal: true,
            role: UserRole.ADMIN,
        });
        const user = this.userRepository.create({
            id: 2,
            username: 'user',
            email: 'user@local.host',
            hash: '$argon2id$v=19$m=65536,t=3,p=4$yih+ZcO7TSpF5ETgdv2G1g$pBO2WkEOy1SC6XbCfvw9hH0DxwcD0fuSfpmvD/E+w6U',
            isLocal: true,
            role: UserRole.USER,
        });
        if (
            !(await this.userRepository.findOne({
                where: { username: 'admin' },
            }))
        )
            await this.userRepository.save(admin);
        if (
            !(await this.userRepository.findOne({
                where: { username: 'user' },
            }))
        )
            await this.userRepository.save(user);

        const event1 = this.eventRepository.create({
            name: 'event1',
            description: 'Event 1',
            startDate: new Date(2024, 2, 26),
            isFullDay: true,
            createdById: 1,
        });
        const event2 = this.eventRepository.create({
            name: 'event2',
            description: 'Event 2',
            startDate: new Date(2024, 2, 3, 14),
            endDate: new Date(2024, 2, 3, 18),
            isFullDay: false,
            createdById: 1,
        });
        const event3 = this.eventRepository.create({
            name: 'event3',
            description: 'Event 3',
            startDate: new Date(2024, 0, 2),
            endDate: new Date(2024, 0, 18),
            isFullDay: true,
            createdById: 1,
            recurrencePattern: {
                recurrenceType: RecurrenceType.DAILY,
                separationCount: 2,
            },
        });
        const event4 = this.eventRepository.create({
            name: 'event4',
            description: 'Event 4',
            startDate: new Date(2024, 3, 22),
            endDate: new Date(2024, 11, 22),
            isFullDay: true,
            createdById: 1,
            recurrencePattern: {
                recurrenceType: RecurrenceType.MONTHLY,
            },
        });
        const event5 = this.eventRepository.create({
            name: 'event5',
            description: 'Event 5',
            startDate: new Date(2024, 3, 22),
            isFullDay: true,
            createdById: 1,
            recurrencePattern: {
                recurrenceType: RecurrenceType.WEEKLY,
                numberOfOccurrences: 15,
            },
        });
        const event6 = this.eventRepository.create({
            name: 'event6',
            description: 'Event 6',
            startDate: new Date(2024, 8, 11),
            isFullDay: true,
            createdById: 1,
            recurrencePattern: {
                recurrenceType: RecurrenceType.MONTHLY,
                numberOfOccurrences: 6,
            },
            eventExceptions: [
                {
                    isRescheduled: true,
                    isCancelled: false,
                    originalDate: new Date(2024, 11, 11),
                    startDate: new Date(2024, 11, 13),
                    isFullDay: true,
                },
            ],
        });
        if (!(await this.eventRepository.findOneBy({ name: 'event1' })))
            await this.eventRepository.save(event1);
        if (!(await this.eventRepository.findOneBy({ name: 'event2' })))
            await this.eventRepository.save(event2);
        if (!(await this.eventRepository.findOneBy({ name: 'event3' })))
            await this.eventRepository.save(event3);
        if (!(await this.eventRepository.findOneBy({ name: 'event4' })))
            await this.eventRepository.save(event4);
        if (!(await this.eventRepository.findOneBy({ name: 'event5' })))
            await this.eventRepository.save(event5);
        if (!(await this.eventRepository.findOneBy({ name: 'event6' })))
            await this.eventRepository.save(event6);

        return 'Database successfully populated';
    }
}
