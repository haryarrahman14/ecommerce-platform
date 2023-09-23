"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Grid from "@mui/material/Grid";

import Table from "./Table";
import Dropdown from "../shared/Dropdown";
import { useGetProductCategories } from "@/hooks/api/useProducts";

const Products = () => {
  const [search, setSearch] = useState("");
  const [paramsSearch] = useDebounce(search, 300);

  const [category, setCategory] = useState("");
  const { data: options } = useGetProductCategories({
    select: (data: any) =>
      data?.data?.map((data: string) => ({
        label: data,
        value: data,
      })),
  });

  const handleSetCategory = (category: string) => {
    setSearch("");
    setCategory(category);
  };

  const handleSetSearch = (search: string) => {
    setCategory("");
    setSearch(search);
  };

  return (
    <Card className="shadow-lg">
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Grid container spacing="24px" padding="24px">
          <Grid item lg={6} md={12} xs={12}>
            <div className=" flex flex-row items-center gap-[8px]">
              <Image
                width={24}
                height={24}
                src="/navigation/products.svg"
                alt="products"
              />
              <p className="typography-h700 text-n-900 ">Products</p>
            </div>
          </Grid>

          <Grid container item lg={6} md={12} xs={12} spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Search Product Name / Brand"
                variant="outlined"
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleSetSearch(event.target.value);
                }}
              />
            </Grid>
            <Grid container item xs={12} md={6}>
              <Dropdown
                label="Filter By Category"
                options={options}
                value={category}
                setValue={handleSetCategory}
              />
            </Grid>
          </Grid>
        </Grid>

        <Table category={category} search={paramsSearch} />
      </CardContent>
    </Card>
  );
};

export default Products;
