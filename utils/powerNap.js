const powerNap = async (duration) => {
  const DELAY_STEP = 1000;
  const delaySteps = Math.max(1, Math.floor(duration / DELAY_STEP));
  const randomDelay =
    (Math.floor(Math.random() * delaySteps) + 1) * DELAY_STEP;

  console.log("powerNap:", "Random Delay (ms):", randomDelay);

  await new Promise((resolve) => setTimeout(resolve, randomDelay));
};

export default powerNap;
