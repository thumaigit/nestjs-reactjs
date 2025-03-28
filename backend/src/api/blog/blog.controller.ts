import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Post('comment')
  createComment(@Body() body: { blogId: number; content: string; userId: number }) {
    const { blogId, content, userId } = body;
    return this.blogService.createComment(blogId, content, userId);
  }
}
