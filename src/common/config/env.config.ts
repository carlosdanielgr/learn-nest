const { env } = process;

export const environments = () => ({
  mongoDb: env.MONGODB,
  defaultLimit: env.DEFAULT_LIMIT ?? 5,
});
