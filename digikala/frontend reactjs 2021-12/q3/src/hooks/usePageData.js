import { useEffect, useState } from "react";

const memo = {};

function usePageData({ url, fireOnLoad, successCallback, failedCallback }) {
  const [pending, setPending] = useState(fireOnLoad);

  async function fetchRequest() {
    if (memo[url]) {
      successCallback(memo[url].data);
      return memo[url];
    }

    setPending(true);

    let res, data;
    try {
      res = await fetch(url);
      data = await res.json();
      memo[url] = { hasError: false, data: data };
      successCallback(data);
      setPending(false);
      return res;
    } catch (error) {
      memo[url] = { hasError: true, data: error };
      failedCallback(error);
      setPending(false);
    }
  }

  useEffect(() => {
    if (fireOnLoad) {
      fetchRequest();
    }
    // eslint-disable-next-line
  }, [fireOnLoad]);

  return memo[url]
    ? { request: fetchRequest, pending, ...memo[url] }
    : { request: fetchRequest, pending, hasError: false, data: null };
}

export default usePageData;
