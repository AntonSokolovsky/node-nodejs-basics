import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const folderName = "files";
const newFileName = "fresh.txt";
const contentTextFile = "I am fresh and young";
const customError = "FS operation failed";

const create = async () => {
  const filePath = path.join(__dirname, folderName, newFileName);

  try {
    await fs.stat(filePath);
    throw new Error(customError);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }

    await fs.writeFile(filePath, contentTextFile);
  }
};

await create();
