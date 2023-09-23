"use client";

import { useGetCarts } from "@/hooks/api/useCarts";
import { useGetDetailUser } from "@/hooks/api/useUsers";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import CartTable from "./Table";
import Link from "next/link";
import { Button } from "@mui/material";

const Cart = ({ pageId }: { pageId: string }) => {
  const pageIdx = parseInt(pageId) - 1;

  const isFirst = pageIdx == 0;
  const limit = isFirst ? 2 : 3;
  const skip = isFirst ? 0 : pageIdx - 1;

  const params = {
    limit,
    skip,
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

  const disabledNext = !isFirst && data?.carts?.length < 3;
  const disabledPrev = isFirst;

  const total = data?.total;
  const currentData =
    data?.carts?.length < 3 ? data?.carts?.[0] : data?.carts?.[1];

  const { data: userData }: any = useGetDetailUser(currentData?.userId, {
    enabled: !!currentData?.userId,
    select: (data: any) => data?.data,
  });

  return (
    <Card className="shadow-lg">
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <div className="flex flex-col p-[24px]">
          <div className=" flex flex-row items-center gap-[8px]">
            <Image
              width={24}
              height={24}
              src="/navigation/carts.svg"
              alt="carts"
            />
            <p className="typography-h700 text-n-900 ">Cart {pageId}</p>
          </div>

          <p className="mt-[24px] typography-h600 text-n-900 ">Details</p>
          <div className="mt-[8px] w-full p-[24px] bg-n-300 rounded-[8px]">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <p className="typography-h500 text-n-900">
                  User: {`${userData?.firstName} ${userData?.lastName}`}
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <p className="typography-h500 text-n-900">
                  Total Products: {currentData?.total}
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <p className="typography-h500 text-n-900">
                  Total Quantity of Products: {currentData?.totalQuantity}
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <p className="typography-h500 text-n-900">
                  Total Price: {currentData?.total}
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <p className="typography-h500 text-n-900">
                  Total Amount (after discount): {currentData?.discountedTotal}
                </p>
              </Grid>
            </Grid>
          </div>
        </div>

        <CartTable
          products={currentData?.products || []}
          isFetching={isFetching}
        />

        <div className="flex flex-row justify-end p-[24px] gap-[16px] items-center">
          {!disabledPrev && (
            <Link href={`/carts/${parseInt(pageId) - 1}`}>
              <Button className="bg-blue-500" variant="contained">
                Prev
              </Button>
            </Link>
          )}

          <p className="typography-h500 text-n-900">
            Page {pageId}/{total}
          </p>

          {!disabledNext && (
            <Link href={`/carts/${parseInt(pageId) + 1}`}>
              <Button className="bg-blue-500" variant="contained">
                Next
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
