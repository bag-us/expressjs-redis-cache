const redis = require('redis')

const redisClient = redis.createClient({ url: 'redis://server:rahasia@localhost:6379' });

(async () => {
    redisClient.on("error", (error) => console.error(`Ups : ${error}`));
    await redisClient.connect();
    await redisClient.set('key', 'value');
    await redisClient.expire('key',60);
    const value = await redisClient.get('key');
    console.log(value)

    await redisClient.disconnect();
  })();

