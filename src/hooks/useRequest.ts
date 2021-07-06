import { useAuthentication } from './useAuthentication';

/**
 * @example
 * const request = useRequest();
 *
 * const createStore = (name: string) => request('POST', '/api/stores', { name });
 *
 * const getStores = () => request('GET', '/api/stores');
 *
 * const updateStore = (storeId: string, updates: { name?: string; branding?: Record<string, string | number | boolean>; logo?: File }) => {
 *   const body = new FormData();
 *   Object.keys(updates).forEach((key) => {
 *     body.append(key, updates[key]);
 *   });
 *   return request('PUT', `/api/stores/${storeId}/logo`, body);
 * };
 *
 * const addProduct = (storeId: string, product: { name: string; description: string; price: number }) => (
 *   request('POST', `/api/stores/${storeId}/products`, product)
 * );
 *
 * const updateProduct = (storeId: string, product: { name: string; description: string; price: number }) => (
 *   request('POST', `/api/stores/${storeId}/products`, product)
 * );
 */

export const useRequest = () => {
  const { getAccessToken } = useAuthentication();

  return async (method: string, path: string, body?: any) => {
    const response = await fetch(`${path}`, {
      method,
      headers: {
        Authorization: 'Bearer ' + await getAccessToken(),
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
