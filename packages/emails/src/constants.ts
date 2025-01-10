import { env } from "../env";

export const baseUrl = new URL(
  env.VERCEL
    ? `https://create.purr.gg`
    : `http://localhost:${process.env.PORT ?? 3000}`,
);
