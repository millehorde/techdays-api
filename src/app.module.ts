import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as entities from './entities';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.TYPEORM_HOST,
          port: Number(process.env.TYPEORM_PORT),
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: process.env.TYPEORM_DATABASE,
          entities: Object.keys(entities).map(key => (entities as any)[key]),
          synchronize: true,
      }),
      SubjectsModule,
      UsersModule,
      EventsModule,
      AuthModule,
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule{}
