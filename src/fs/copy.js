import * as fs from "fs/promises";
import * as path from "path";

const __dirname = import.meta.dirname;

const sourceFolderName = "files";
const targetFolderName = "files_copy";
const customError = "FS operation failed";

const copy = async () => {
  const sourcePath = path.join(__dirname, sourceFolderName);
  const targetPath = path.join(__dirname, targetFolderName);

  try {
    await fs.access(sourcePath);
    try {
      await fs.access(targetPath);
      throw new Error(customError);
    } catch {}
    await fs.mkdir(targetPath);
    const files = await fs.readdir(sourcePath, { withFileTypes: true });
    await Promise.all(
      files.map(async (file) => {
        const sourcePathFile = path.join(sourcePath, file.name);
        const targetPathFile = path.join(targetPath, file.name);

        if (file.isFile()) {
          await fs.copyFile(sourcePathFile, targetPathFile);
        }
      })
    );
  } catch (error) {
    throw new Error(customError);
  }
};

await copy();
