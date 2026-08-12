import { copyFile, mkdir, readdir } from "node:fs/promises";

await mkdir("assets", { recursive: true });

for (const file of await readdir("dist/assets")) {
  await copyFile(`dist/assets/${file}`, `assets/${file}`);
}

for (const file of ["index.html", "404.html", "profile.jpg", "resume.pdf"]) {
  await copyFile(`dist/${file}`, file);
}
