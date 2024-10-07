import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const customError = "FS operation failed";
const targetFolderName = "files";
const targetFileName = "fileToRead.txt";

const read = async () => {
  const filePath = path.join(__dirname, targetFolderName, targetFileName);

  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
  } catch (error) {
    throw new Error(customError);
  }
};

await read();
