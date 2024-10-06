import { Transform } from "stream";

const transform = async () => {
  const { stdin, stdout } = process;
  const reverseText = new Transform({
    transform(chunk, encoding, cb) {
      const reversed = chunk.toString().split("").reverse().join("") + `\n`;
      cb(null, reversed);
    },
  });
  stdin.pipe(reverseText).pipe(stdout);
};

await transform();
