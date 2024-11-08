"use client";

import { getAllWatches, getWatchImgURL } from "@/utils/api/api";
import { useAppSelector } from "@/utils/store/hook";
import { selectUsers } from "@/utils/store/usersSlice";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const users = () => {
  const usersList = useAppSelector(selectUsers);
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
            <Grid2 key={`${element.id}`} size={gridSize[data?.length] || 3} display="flex" justifyContent="center" alignItems="center">
              <Card sx={{ width: "350px", height: "400px" }} >
                <CardMedia
                  component="img"
                  height={"60%"}
                  image={getWatchImgURL(element.uid)}
                />
                <CardContent sx={{ flexDirection: "column", display: "flex" }}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                    {element.watch_name}
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 10 }}>
                    {element.color}
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 10 }}>
                    {element.company}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Chip
                    label="Details"
                    component="a"
                    href={`/edit-watch/${element.uid}`}
                    variant="outlined"
                    clickable
                  />
                </CardActions>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </div >
  );
};

export default users;
