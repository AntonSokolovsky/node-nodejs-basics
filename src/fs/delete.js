import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const customError = "FS operation failed";
const targetFolderName = "files";
const targetFileName = "fileToRemove.txt";

const remove = async () => {
  const targetPathFile = path.join(__dirname, targetFolderName, targetFileName);

  try {
    await fs.access(targetPathFile);
    await fs.unlink(targetPathFile);
  } catch (error) {
    throw new Error(customError);
  }
};

await remove();
