import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BlogService {
    private prisma = new PrismaClient();
    async getAllBlogs() {
        return this.prisma.blog.findMany({
            include: { author: true, comments: { include: { user: { select: { name: true } } } } },
        });
    }

    async createComment(blogId: number, content: string, userId: number) {
        return this.prisma.comment.create({
            data: {
                content,
                blogId,
                userId,
            },
            include: {
                user: {
                    select: { name: true },
                },
            },
        });
    }
}
