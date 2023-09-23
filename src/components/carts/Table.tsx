"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import TableRowsLoader from "../shared/TableRowsLoader";
import Link from "next/link";

import { useGetCarts } from "@/hooks/api/useCarts";
import { useGetDetailUser } from "@/hooks/api/useUsers";

interface Column {
  id:
    | "userName"
    | "totalProducts"
    | "totalQuantity"
    | "total"
    | "discountedTotal"
    | "details";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "userName", label: "User Name", minWidth: 170 },
  { id: "totalProducts", label: "Total Products", minWidth: 100 },
  { id: "totalQuantity", label: "Total Quantity", minWidth: 100 },
  { id: "total", label: "Total Price", minWidth: 100 },
  { id: "discountedTotal", label: "Discount Total Price", minWidth: 100 },
  { id: "details", label: "Details", minWidth: 100, align: "center" },
];

const CartsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
  };

  const {
    data,
    isFetching,
  }: {
    data: any;
    isFetching: boolean;
  } = useGetCarts(params, {
    select: (data: any) => data?.data,
  });

  const carts = data?.carts;
  const total = data?.total || 0;

  return (
    <div className="flex flex-col gap-[16px]">
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
            ) : carts?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  Sorry, there is no data yet
                </TableCell>
              </TableRow>
            ) : (
              carts?.map((row: any, idx: number) => {
                return <Row key={idx} row={row} idx={idx} columns={columns} />;
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

const Row = ({
  row,
  idx,
  columns,
}: {
  row: any;
  idx: number;
  columns: Column[];
}) => {
  const { data }: any = useGetDetailUser(row?.userId, {
    select: (data: any) => data?.data,
  });

  const { firstName = "", lastName = "" } = data || {};
  const userName = `${firstName} ${lastName}`;

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
      {columns.map((column: Column) => {
        if (column.id == "details") {
          return (
            <TableCell key={column.id} align={column.align}>
              <Link href={`/carts/${idx + 1}`}>
                <Button className="bg-blue-500" variant="contained">
                  Details
                </Button>
              </Link>
            </TableCell>
          );
        }

        const value = column.id == "userName" ? userName : row[column.id];

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
};

export default CartsTable;
