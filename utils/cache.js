const get = (key) => {
  return await fetch(`${process.env.READ_ONLY_REDIS_URL}/get/${key}`, {
    headers: {
      Authorization: `Bearer ${process.env.REDIS_BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

module.exports = { get };
