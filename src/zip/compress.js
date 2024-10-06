import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolderName = "files";
const sourceFileName = "fileToCompress.txt";
const targetFileName = "archive.gz";

const compress = async () => {
  const sourceFilePath = path.join(__dirname, targetFolderName, sourceFileName);
  const targetFilePath = path.join(__dirname, targetFolderName, targetFileName);

  const gzip = createGzip();
  const source = fs.createReadStream(sourceFilePath);
  const target = fs.createWriteStream(targetFilePath);

  source
    .pipe(gzip)
    .pipe(target)
    .on("error", (err) => console.error(err));
};

await compress();
