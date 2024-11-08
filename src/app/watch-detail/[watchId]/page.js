"use client";

import { getWatchDetail } from "@/utils/api/api";
import { useAppDispatch } from "@/utils/store/hook";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";

function page(props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useSWR(
    "/watch-detail",
    (url) => getWatchDetail(props.params.watchId)
  );

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            {data}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default page;
