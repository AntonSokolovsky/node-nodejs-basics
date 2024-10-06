import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolderName = "files";
const targetFileName = "fileToRead.txt";

const read = async () => {
  const targetFilePath = path.join(__dirname, targetFolderName, targetFileName);
  const stream = fs.createReadStream(targetFilePath, "utf-8");

  let data = "";

  stream.on("data", (chunk) => (data += chunk));
  stream.on("end", () => console.log(data));
  stream.on("error", (error) => console.log("Error!", error.message));
};

await read();
