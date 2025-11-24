import express from "express";
import cors from "cors";

import Link from "./model/links.js";
import linkRoutes from "./routes/link.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.status(200).send("Server is running.");
});
app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

// API routes
app.use("/api/links", linkRoutes);

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Redirect route
app.get("/:code", async (req, res) => {
  const { code } = req.params;
  // Ignore bots like Render health check, curl, GoogleBot, etc.
  if (/render|healthcheck|bot|crawl|spider/i.test(ua)) {
    return res.redirect(302, link.url);
  }

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).json({ message: "Not found" });
  link.clicks++;
  link.lastClicked = new Date();
  await link.save();
  return res.redirect(302, link.url);
});

export default app;
