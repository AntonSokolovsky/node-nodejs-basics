import * as fs from "fs";
import * as path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolderName = "files";
const targetFileName = "fileToCalculateHashFor.txt";

const calculateHash = async () => {
  try {
    const targetPathFile = path.join(
      __dirname,
      targetFolderName,
      targetFileName
    );
    const hash = createHash("sha256");
    const stream = fs.createReadStream(targetPathFile);

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      const hashHex = hash.digest("hex");
      console.log(`HashHex: ${hashHex}`);
    });

    stream.on("error", (err) => {
      console.error("Error!", err.message);
    });
  } catch (error) {
    throw error;
  }
};

await calculateHash();
