import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getProducts,
  getProductsSearch,
  getProductCategories,
  getProductsOfCategory,
} from "../../client/products";
import queries from "../../consts/queries";

export const useGetProducts = (
  params: Record<string, unknown>,
  options?: UseQueryOptions
) => {
  const queryKey = queries.products.list(params).queryKey;

  const queryFn = () => {
    const { category, q, ...restParams } = params;
    let getDataFn;

    if (category) {
      getDataFn = getProductsOfCategory(category as string, restParams);
    } else if (q) {
      getDataFn = getProductsSearch({
        q,
        ...restParams,
      });
    } else {
      getDataFn = getProducts(restParams);
    }

    return getDataFn;
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

export const useGetProductCategories = (options?: UseQueryOptions) => {
  const queryKey = ["list-product-categories"];

  const queryFn = () => {
    return getProductCategories();
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
