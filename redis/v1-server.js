const express = require('express');
const axios = require('axios');
const redis = require('redis')
const app = express();
const port = 9000;


const redisClient = redis.createClient({ url: 'redis://server:rahasia@localhost:6379' });
(async () => {
  redisClient.on("error", (error) => console.error(`Ups : ${error}`));
  await redisClient.connect();
})();

const getData = async function (req, res){
  try {
    const cacheKey = req.params.id

    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
      const json = JSON.parse(cachedResult)
      console.log('Data from cache.');
      res.status(200).json({
        data: json
      })

    } else {
      const response = await axios({
        method: 'get',
        url : `https://jsonplaceholder.typicode.com/posts/${cacheKey}`,
      });
      console.log('Data dari Public API')

      await redisClient.set(cacheKey, JSON.stringify(response.data));
      await redisClient.expire(cacheKey,60); //60 second

      res.status(200).json({
        data: response.data
      })
    }
  } catch (error) {
    res.status(404).json({
      message: error.message
  })
  }
}

app.get('/:id', getData);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});