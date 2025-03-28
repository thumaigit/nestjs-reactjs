import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    private prisma = new PrismaClient();
    async getUsers() {
        return this.prisma.user.findMany();
    }

    async login(loginDto: { username: string; password: string }) {
        const { username, password } = loginDto;
        try {
            const user = await this.prisma.user.findUnique({ where: { email: username } });

            if (user && bcrypt.compareSync(password, user.password)) {
                return { message: 'Login successful', token: 'dummy-jwt-token' };
            } else {
                throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserProfile(id: number) {
        //This is a raw query to get user profile
        const query = `SELECT id, email, name FROM user WHERE id = ${id} limit 1`;
        const user = await this.prisma.$queryRawUnsafe(query);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}