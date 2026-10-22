import { readdir, mkdir, copyFile } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const sourceDir = resolve(root, "image-source");
const imageDir = resolve(root, "public/assets/images");
const fontDir = resolve(root, "public/assets/fonts");
await mkdir(imageDir, { recursive: true });
await mkdir(fontDir, { recursive: true });

const widths = [480, 800, 1200, 1600];
const sources = (await readdir(sourceDir)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

for (const file of sources) {
  const input = resolve(sourceDir, file);
  const name = basename(file, extname(file));
  for (const width of widths) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width <= 480 ? 76 : 80, effort: 5 })
      .toFile(resolve(imageDir, `${name}-${width}.webp`));
  }
  console.log(`Optimized ${file}`);
}

await sharp(resolve(sourceDir, "sample-hero.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.86 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(resolve(imageDir, "og-image.jpg"));

const fontFiles = [
  ["@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", "cormorant-400.woff2"],
  ["@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2", "cormorant-500.woff2"],
  ["@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2", "cormorant-600.woff2"],
  ["@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2", "cormorant-400-italic.woff2"],
  ["@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", "manrope-variable.woff2"],
];
for (const [source, destination] of fontFiles) {
  await copyFile(resolve(root, "node_modules", source), resolve(fontDir, destination));
}
await copyFile(resolve(root, "node_modules/@fontsource/cormorant-garamond/LICENSE"), resolve(fontDir, "Cormorant-LICENSE.txt"));
await copyFile(resolve(root, "node_modules/@fontsource-variable/manrope/LICENSE"), resolve(fontDir, "Manrope-LICENSE.txt"));

for (const size of [192, 512]) {
  await sharp(resolve(root, "public/favicon.svg"), { density: 300 })
    .resize(size, size)
    .png()
    .toFile(resolve(root, `public/favicon-${size}.png`));
}
await sharp(resolve(root, "public/favicon.svg"), { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(resolve(root, "public/apple-touch-icon.png"));

console.log(`Prepared ${sources.length} sample images, local fonts, social image and favicons.`);
