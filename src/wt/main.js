import { Worker } from "worker_threads";
import os from "os";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerFile = "worker.js";
const startNumber = 10;

const performCalculations = async () => {
  const workerPath = path.join(__dirname, workerFile);
  const numberOfCPU = os.cpus().length;
  const workers = [];
  const result = new Array(numberOfCPU);

  const createWorker = (index) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      workers.push(worker);

      worker.postMessage(index + startNumber);

      worker.on("message", (message) => {
        result[index] = message;
        resolve();
      });

      worker.on("error", () => {
        result[index] = { status: "error", data: null };
        resolve();
      });
    });
  };

  const workerPromises = Array.from({ length: numberOfCPU }, (_, index) =>
    createWorker(index)
  );

  await Promise.all(workerPromises);
  console.log(result);
};

await performCalculations();
