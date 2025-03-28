const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seeding() {
    // Clear existing data
    await prisma.user.deleteMany();

    // Hash passwords
    const password1 = await bcrypt.hash('123456', 10);
    const password2 = await bcrypt.hash('password123', 10);

    // Seed the database with new users
    const user1 = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@example.com',
            password: password1
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@example.com',
            password: password2
        },
    });

    // Seed the database with new blogs
    const blog1 = await prisma.blog.create({
        data: {
            title: 'First Blog Post',
            content: 'This is the content of the first blog post.',
            authorId: user1.id,
        },
    });

    const blog2 = await prisma.blog.create({
        data: {
            title: 'Second Blog Post',
            content: 'This is the content of the second blog post.',
            authorId: user2.id,
        },
    });

    console.log({ user1, user2, blog1, blog2 });
}

seeding()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
