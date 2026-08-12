import { copyFile, rm } from "node:fs/promises";

await copyFile("dist/source.html", "dist/index.html");
await copyFile("dist/source.html", "dist/404.html");
await rm("dist/source.html");
