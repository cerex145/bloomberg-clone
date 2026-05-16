// Placeholder para Prisma client
// Este archivo se usará cuando se conecte PostgreSQL real

let prismaClient = null;

export function initDb() {
    // Aquí ir la conexión real cuando se necesite
    // import { PrismaClient } from '@prisma/client';
    // prismaClient = new PrismaClient();
    // return prismaClient;
    return null;
}

export function getDb() {
    return prismaClient;
}

export default { initDb, getDb };
