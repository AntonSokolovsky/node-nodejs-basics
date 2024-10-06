import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { createGunzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolderName = "files";
const sourceFileName = "archive.gz";
const targetFileName = "fileToCompress.txt";
const decompress = async () => {
  const sourceFilePath = path.join(__dirname, targetFolderName, sourceFileName);
  const targetFilePath = path.join(__dirname, targetFolderName, targetFileName);

  const gunzip = createGunzip();
  const source = fs.createReadStream(sourceFilePath);
  const destination = fs.createWriteStream(targetFilePath);

  source
    .pipe(gunzip)
    .pipe(destination)
    .on("error", (err) => console.error(err));
};

await decompress();
