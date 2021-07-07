export const useAnonymousRequest = () => {
  return async (method: string, path: string, body?: any) => {
    const response = await fetch(`${path}`, {
      method,
      headers: {
        ...(body && !(body instanceof FormData)
          ? {
              'content-type': 'application/json; charset=utf-8',
            }
          : {}
        ),
      },
      body: (!body || body instanceof FormData) ? body : JSON.stringify(body),
    });
    const json = await response.json();
    if (response.ok && json.success) {
      return json.result;
    }
    const err = new Error(json.message);
    (err as any).code = json.code;
    throw err;
  };
};
