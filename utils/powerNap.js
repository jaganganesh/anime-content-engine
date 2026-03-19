const powerNap = async (duration) => {
  const randomDelay = Math.floor(Math.random() * duration);
  console.log("powerNap:", "Random Delay (ms):", randomDelay);

  await new Promise((resolve) => setTimeout(resolve, randomDelay));
};

export default powerNap;
