import client from "./apiClient";

export const getDetailUsers = (id: number) => {
  return client.get(`users/${id}`);
};
