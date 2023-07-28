const { env } = process;

export const environments = () => ({
  mongoDb: env.MONGODB,
  port: env.PORT ?? 3001,
  defaultLimit: env.DEFAULT_LIMIT ?? 5,
});
