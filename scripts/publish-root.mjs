import { copyFile, mkdir, readdir, rm } from "node:fs/promises";

await rm("assets", { recursive: true, force: true });
await mkdir("assets", { recursive: true });

for (const file of await readdir("dist/assets")) {
  await copyFile(`dist/assets/${file}`, `assets/${file}`);
}

for (const entry of await readdir("dist", { withFileTypes: true })) {
  if (entry.isFile()) {
    await copyFile(`dist/${entry.name}`, entry.name);
  }
}
