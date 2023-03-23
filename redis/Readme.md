Using Redis 7

1. docker-compose -f redis/docker/docker-compose.yaml up -d
2. docker logs redis
3. docker container exec -it redis sh
4. redis-cli -h localhost


Server verion 1:
Mengambil satu data dan push ke redis (satu key satu value)


Server version 2:
Mengambil banyak data dan push ke redis (satu key banyak value)
NOTE : value pada key maksimal 512 Mb