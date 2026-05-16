async function fetchWithRetry(getDataFn, url, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getDataFn(url);
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

module.exports = { fetchWithRetry };
