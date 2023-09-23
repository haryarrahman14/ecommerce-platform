import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getDetailUsers } from "../../client/users";
import queries from "../../consts/queries";

export const useGetDetailUser = (userId: number, options?: UseQueryOptions) => {
  const queryKey = queries.users.detail(userId).queryKey;

  const queryFn = () => {
    return getDetailUsers(userId);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
