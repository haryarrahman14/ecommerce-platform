import { createQueryKeyStore } from "@lukemorales/query-key-factory";

const queries = createQueryKeyStore({
  products: {
    list: (params?: any) => [params],
    detail: (id: number) => [id],
  },
  carts: {
    list: (params?: any) => [params],
    detail: (id: number) => [id],
  },
  users: {
    detail: (id: number) => [id],
  },
});

export default queries;
