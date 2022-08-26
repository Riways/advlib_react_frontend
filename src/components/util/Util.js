const sleepHelper = (ms) => new Promise((r) => setTimeout(r, ms));

const sleep = async (ms) => {
  await sleepHelper(ms);
};

export { sleep };
