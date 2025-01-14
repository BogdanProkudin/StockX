import Redis from "ioredis";

// Создание клиента Redis
const redisClient = new Redis({
  host: "localhost", // или 127.0.0.1
  port: 6379,
  password: "123456",
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export const redisMiddleware = async (req, res, next) => {
  try {
    const cacheKey = req.originalUrl;
    console.log("cacheKey", cacheKey);

    // Используем асинхронный get для Redis
    const data = await redisClient.get(cacheKey);

    if (data) {
      // Если данные найдены в кэше, возвращаем их
      console.log("Cache hit for:", cacheKey);
      const parsedData = JSON.parse(data);
      return res.status(200).json(parsedData);
    }

    console.log("Cache miss for:", cacheKey);
    next(); // Если данных нет в кэше, продолжаем выполнение
  } catch (error) {
    console.error("Redis middleware error:", error);
    next(); // В случае ошибки продолжаем выполнение
  }
};

export const setCache = async (key, data, expiration = 600) => {
  try {
    // Используем асинхронный setex
    await redisClient.setex(key, expiration, JSON.stringify(data));
  } catch (error) {
    console.error("Redis set error:", error);
  }
};
