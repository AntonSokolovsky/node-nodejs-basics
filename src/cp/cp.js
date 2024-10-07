import * as path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { stdin, stdout } = process;
const targetFolderName = "files";
const targetFileName = "script.js";

export function spawnChildProcess(args) {
  const targetFilePath = path.join(__dirname, targetFolderName, targetFileName);

  const child = spawn("node", [targetFilePath, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);

  child.on("error", (error) => {
    console.error(error);
  });
}

const someArgs = ["someArgument1", "someArgument2", "someArgument3"];
spawnChildProcess(someArgs);
