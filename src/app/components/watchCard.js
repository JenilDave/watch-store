import { getWatchImgURL } from "@/utils/api/api";
import { useAppSelector } from "@/utils/store/hook";
import { selectValue } from "@/utils/store/usersSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardMedia, Chip, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";


function WatchCard({ element, gridSize, data }) {

    const [favLoading, setFavLoading] = useState(false);
    const addToFavourite = () => {
        setTimeout(setFavLoading(true), 2);
        setTimeout(setFavLoading(false), 7);
    }
    const userFav = useAppSelector((state) => state.users.value);

    return <>
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
                    <LoadingButton
                        loading={favLoading}
                        loadingPosition="start"
                        startIcon={userFav?.favourites?.includes(element.uid) ? <Favorite /> : <FavoriteBorder />}
                        variant="text"
                        onClick={addToFavourite}
                    />
                </CardActions>
            </Card>
        </Grid2>
    </>;
}

export default WatchCard;
