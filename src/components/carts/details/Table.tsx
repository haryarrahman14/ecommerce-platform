"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableRowsLoader from "../../shared/TableRowsLoader";

interface Column {
  id:
    | "title"
    | "quantity"
    | "price"
    | "discountPercentage"
    | "total"
    | "discountPercentage"
    | "discountedPrice";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "title", label: "Product Name", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "total", label: "Total Price", minWidth: 100 },
  { id: "discountPercentage", label: "Discount (%)", minWidth: 100 },
  { id: "discountedPrice", label: "Total Price", minWidth: 100 },
];
const CartTable = ({
  isFetching,
  products,
}: {
  isFetching?: boolean;
  products?: any[];
}) => {
  return (
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
            <TableRowsLoader rowsNum={10} cellsNum={6} />
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
  );
};

export default CartTable;
