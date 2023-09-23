import client from "./apiClient";

export const getProducts = (params?: Record<string, unknown>) => {
  return client.get("products", { params });
};

export const getProductsSearch = (params?: Record<string, unknown>) => {
  return client.get("products/search", { params });
};

export const getProductCategories = () => {
  return client.get("products/categories");
};

export const getProductsOfCategory = (
  category: string,
  params?: Record<string, unknown>
) => {
  return client.get(`products/category/${category}`, { params });
};
