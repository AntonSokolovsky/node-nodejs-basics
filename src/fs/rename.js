import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const customError = "FS operation failed";
const wrongFileName = "wrongFilename.txt";
const properFilename = "properFilename.md";

const rename = async () => {
  const folderPath = path.join(__dirname, "files");
  const wrongFilePath = path.join(folderPath, wrongFileName);
  const properFilePath = path.join(folderPath, properFilename);

  try {
    await fs.access(wrongFilePath);
    try {
      await fs.access(properFilePath);
      throw new Error(customError);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    await fs.rename(wrongFilePath, properFilePath);
  } catch (error) {
    throw new Error(customError);
  }
};

await rename();
