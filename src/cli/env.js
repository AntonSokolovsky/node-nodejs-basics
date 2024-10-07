const parseEnv = () => {
  const rssPrefix = "RSS_";
  const rssVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith(rssPrefix))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(rssVariables);
};

parseEnv();
