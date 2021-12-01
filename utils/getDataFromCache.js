export const getDataFromCache = async (key) => {
  const result = await fetch(
    `https://global-premium-duck-30683.upstash.io/get/${key}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REDIS_BEARER_TOKEN}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const parsed = JSON.parse(data.result);
      return parsed;
    });

  return result;
};
