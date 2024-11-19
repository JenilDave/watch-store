import { addFavourite, getWatchImgURL, removeFavourite } from "@/utils/api/api";
import { useAppDispatch, useAppSelector } from "@/utils/store/hook";
import { addUser } from "@/utils/store/usersSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardMedia, Chip, Grid2, Typography } from "@mui/material";
import { useState } from "react";


function WatchCard({ element, gridSize, data }) {

    const [favLoading, setFavLoading] = useState(false);
    const userFav = useAppSelector((state) => state.users.value);
    const dispatch = useAppDispatch();
    
    const isFav = () => {
        return userFav?.favourites?.includes(element.uid);
    }

    const addToFavourite = (e) => {
        if (!isFav()) {
            addFavourite(userFav.username, element.uid).then(resp => {
                if(resp.status == 201) {
                    dispatch(addUser({
                        username: userFav.username,
                        favourites: [...userFav.favourites, element.uid]
                    }))
                }
            })
        }
        else {
            removeFavourite(userFav.username, element.uid).then(resp => {
                if(resp.status == 201) {
                    dispatch(addUser({
                        username: userFav.username,
                        favourites: userFav.favourites.filter(elem => elem != element.uid)
                    }))
                }
            })
        }
    }


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
                        startIcon={isFav() ? <Favorite /> : <FavoriteBorder />}
                        variant="text"
                        onClick={(e) => addToFavourite(e)}
                    />
                </CardActions>
            </Card>
        </Grid2>
    </>;
}

export default WatchCard;
