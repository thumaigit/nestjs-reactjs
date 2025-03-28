import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.getUsers();
    }

    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        return this.userService.login(loginDto);
    }

    @Get(':id')
    async getUserProfile(@Param('id') id: number) {
        return this.userService.getUserProfile(id);
    }
}