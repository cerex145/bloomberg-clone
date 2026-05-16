// Placeholder for Redis config
// Este archivo se usará cuando se conecte Redis real

let redisClient = null;

export function initRedis() {
    // Aquí ir la conexión real a Redis cuando se necesite
    // import redis from 'redis';
    // redisClient = redis.createClient({
    //   url: process.env.REDIS_URL || 'redis://localhost:6379'
    // });
    // return redisClient;
    return null;
}

export function getRedis() {
    return redisClient;
}

export default { initRedis, getRedis };
