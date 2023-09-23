"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import TableRowsLoader from "../shared/TableRowsLoader";
import LineHighchart from "../shared/LineHighchart";

import { useGetProducts } from "@/hooks/api/useProducts";

interface Column {
  id: "title" | "brand" | "price" | "stock" | "category";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "title", label: "Product Name", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "stock", label: "Stock", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
];

const ProductsTable = ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const params = {
    limit: rowsPerPage,
    skip: page * rowsPerPage,
    q: search,
    category: category,
  };

  const {
    data,
    isFetching,
  }: {
    data: any;
    isFetching: boolean;
  } = useGetProducts(params, {
    select: (data: any) => data?.data,
  });

  const highchartData = data?.products?.map((e) => ({
    title: e?.title,
    stock: e?.stock,
  }));
  const products = data?.products;
  const total = data?.total || 0;

  return (
    <div className="flex flex-col gap-[16px]">
      <LineHighchart highchartData={highchartData} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="bg-blue-400 text-n-000"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRowsLoader rowsNum={10} cellsNum={5} />
            ) : products?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  Sorry, there is no data yet
                </TableCell>
              </TableRow>
            ) : (
              products?.map((row: any, idx: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProductsTable;
