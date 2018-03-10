import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as entities from './entities';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.TYPEORM_HOST,
          port: Number(process.env.TYPEORM_PORT),
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: process.env.TYPEORM_DATABASE,
          entities: Object.keys(entities).map(key => (entities as any)[key]),
          synchronize: true,
      }),
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule{}
