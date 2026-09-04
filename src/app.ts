import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";

const app = express();
const corsOrigins = (process.env.CORS_ORIGIN ?? process.env.FRONTEND_URL)
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    // If no origin is configured, allow local development requests.
    // In Vercel, set CORS_ORIGIN to one or more comma-separated frontend URLs.
    origin: corsOrigins && corsOrigins.length > 0 ? corsOrigins : true,
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(router);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});

export { app };
