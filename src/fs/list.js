import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const customError = "FS operation failed";
const targetFolderName = "files";
const list = async () => {
  const targetFolderPath = path.join(__dirname, targetFolderName);

  try {
    await fs.access(targetFolderPath);
    const files = await fs.readdir(targetFolderPath);
    console.log(files);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(customError);
    } else {
      throw err;
    }
  }
};

await list();
