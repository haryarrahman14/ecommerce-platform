import client from "./apiClient";

export const getCarts = (params?: Record<string, unknown>) => {
  return client.get("carts", { params });
};

export const getDetailCarts = (id: number) => {
  return client.get(`carts/${id}`);
};
