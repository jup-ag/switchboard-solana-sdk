import * as fs from "fs-extra";
import path from "path";

async function replaceInFiles(
  dir: string,
  searchValue: string,
  replaceValue: string
): Promise<void> {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        let content = await fs.readFile(filePath, "utf-8");
        content = content.replace(new RegExp(searchValue, "g"), replaceValue);
        await fs.writeFile(filePath, content);
      } else if (stats.isDirectory()) {
        await replaceInFiles(filePath, searchValue, replaceValue);
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

(async () => {
  // Copy docs site from ./target/doc to ./doc
  const IN_DIR = path.join(__dirname, "../target/doc");
  const OUT_DIR = path.join(__dirname, "../doc");
  await fs.removeSync(OUT_DIR);
  await fs.copy(IN_DIR, OUT_DIR, { overwrite: true });

  // Remove the ../doc/crates.js file
  await fs.remove(path.join(OUT_DIR, "crates.js"));

  // Find each file in ./doc/switchboard_solana and replace all "../static.files" with "static.files"
  const SRC_DIR = path.join(OUT_DIR, "switchboard_solana");
  await replaceInFiles(SRC_DIR, "../static.files", "static.files");
  await replaceInFiles(SRC_DIR, "../src", "src");
  await replaceInFiles(
    SRC_DIR,
    "/switchboard_solana/index.html",
    "/index.html"
  );

  // Move contents of ./doc/switchboard_solana/ to ./doc
  await fs.copy(SRC_DIR, OUT_DIR);
  await fs.remove(SRC_DIR);
})();
