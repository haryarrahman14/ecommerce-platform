"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Table from "./Table";

const Carts = () => {
  return (
    <Card className="shadow-lg">
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <div className=" flex flex-row items-center gap-[8px] p-[24px]">
          <Image
            width={24}
            height={24}
            src="/navigation/carts.svg"
            alt="carts"
          />
          <p className="typography-h700 text-n-900 ">Carts</p>
        </div>

        <Table />
      </CardContent>
    </Card>
  );
};

export default Carts;
