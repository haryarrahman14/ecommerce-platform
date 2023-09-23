import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getCarts, getDetailCarts } from "../../client/carts";
import queries from "../../consts/queries";

export const useGetCarts = (
  params: Record<string, unknown>,
  options?: UseQueryOptions
) => {
  const queryKey = queries.carts.list(params).queryKey;

  const queryFn = () => {
    return getCarts(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

export const useGetDetailCart = (
  cartsId: number,
  options?: UseQueryOptions
) => {
  const queryKey = queries.carts.detail(cartsId).queryKey;

  const queryFn = () => {
    return getDetailCarts(cartsId);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
