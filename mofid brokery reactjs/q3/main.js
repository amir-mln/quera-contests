function timeit(callback) {
  return async function (...args) {
    const before = new Date().getTime();
    const callbackResult = await callback(...args);
    const after = new Date().getTime();
    return { value: callbackResult, time: after - before };
  };
}
