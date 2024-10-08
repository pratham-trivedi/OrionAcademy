import {Redis} from "ioredis";
require('dotnet').config();

const redisClient  = () => {
    if(process.env.REDIS_URL){
        console.log("Redis Connected");
        return process.env.REDIS_URL;
    }
    throw new Error('Redis Conextion failed');
};

export const redis = new Redis(redisClient());

