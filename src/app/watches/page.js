"use client";

import { getAllWatches } from "@/utils/api/api";
import { useAppSelector } from "@/utils/store/hook";
import { Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import WatchCard from "../components/watchCard";

const users = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    "/watches",
    (url) => getAllWatches(url)
  );

  const gridSize = {
    1: 12,
    2: 6,
    3: 4
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "lightgrey", flexDirection: "column" }}>
      <Typography variant="h2" component="h2" margin={10}>
        List of Watches
      </Typography>
      <Grid2 container spacing={6}>
        {data?.map((element, idx) => {
          return (
            <WatchCard element={element} gridSize={gridSize} data={data} />
          );
        })}
      </Grid2>
    </div >
  );
};

export default users;
