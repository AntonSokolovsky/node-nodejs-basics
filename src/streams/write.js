import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const { stdin } = process;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolderName = "files";
const targetFileName = "fileToWrite.txt";

const write = async () => {
  const targetFilePath = path.join(__dirname, targetFolderName, targetFileName);
  const stream = fs.createWriteStream(targetFilePath, "utf-8");
  stdin.on("data", (data) => {
    stream.write(data);
  });
};

await write();
