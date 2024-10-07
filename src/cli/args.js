const parseArgs = () => {
  const args = process.argv;
  const properties = {};

  args.forEach((arg, i) => {
    if (arg.startsWith("--")) {
      const propName = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        properties[propName] = args[i + 1];
      }
    }
  });

  Object.entries(properties).forEach(([key, value]) => {
    console.log(`${key} is ${value}`);
  });
};

parseArgs();
