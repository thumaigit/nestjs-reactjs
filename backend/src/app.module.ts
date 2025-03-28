import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { BlogModule } from './api/blog/blog.module';

@Module({
  imports: [BlogModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
