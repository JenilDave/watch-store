"use client";
import UploadImage from '@/app/components/uploadImage';
import { getAllCollections, getWatchDetail, getWatchImgURL, editWatch } from '@/utils/api/api';
import {
    Box, Button,
    Card,
    CardActions, CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField, Typography
} from '@mui/material';
import { useState } from 'react';
import useSWR from "swr";


const page = (props) => {
    const [watchImg, setwatchImg] = useState(null);
    const [watch, setWatch] = useState({});
    const [watchImgStr, setWatchImgStr] = useState("");
    const [selectedCategory, setSelectedCategory] = useState([])

    const { data: watchData, error: watchError, isLoading: watchLoading } = useSWR(
        '/watch-details/',
        (url) => getWatchDetail(props.params.watchId, setSelectedCategory, setWatch, collectionFilter), {
        revalidateOnFocus: false
    }
    )

    const { data: collection, error: collectionError, isLoading: collectionLoading } = useSWR(
        "/watch-collections",
        (url) => getAllCollections(url), {
        revalidateOnFocus: false
    }
    )

    const collectionFilter = (data) => Object.keys(data?.categories).filter((x) => data?.categories[x] === true)

    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setWatchImgStr(reader.result.toString());
        };
        reader.onerror = function (err) {
            console.log('Error: ', err);
        };
    }

    const handleSave = () => {
        const res = editWatch(`/admin/edit-watch/${watch.uid}`, { ...watch, img: watchImgStr, categories: selectedCategory })
    };

    const LoadingCard = () =>
        <Card>
            <CardContent sx={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                    Loading Watch Data...
                </Typography>
            </CardContent>
        </Card>


    const ErrorCard = () =>
        <Card>
            <CardContent sx={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                    Error Loading Watch Data...
                </Typography>
            </CardContent>
        </Card>

    return (
        <>
            {watchLoading && <LoadingCard />}
            {watchError && <ErrorCard />}
            {watchData && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "lightgrey" }}>
                    <Card sx={{ height: "75%" }}>
                        <CardContent sx={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 50 }}>
                                Edit Watch
                            </Typography>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                                Edit Image Below
                            </Typography>
                            {
                                watch &&
                                <img
                                    alt="not found"
                                    width="50%"
                                    src={(watchImg && URL.createObjectURL(watchImg)) || (getWatchImgURL(watch.uid))}
                                />
                            }
                            <UploadImage onChange={(e) => {
                                setwatchImg(e.target.files[0])
                                getBase64(e.target.files[0])
                            }} />
                            <Box width="80%">
                                <TextField
                                    fullWidth
                                    label="Watch Name"
                                    value={watch.watch_name}
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => setWatch({ ...watch, watch_name: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Color"
                                    value={watch.color}
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => setWatch({ ...watch, color: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Company"
                                    value={watch.company}
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => setWatch({ ...watch, company: e.target.value })}
                                />
                                <FormControl fullWidth margin="normal">
                                    {collectionLoading && "Loading Categories..."}
                                    {collectionError && "Error Loading Categories!!!"}
                                    {(collection) &&
                                        <>
                                            <InputLabel id="demo-select-small-label">Categories</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                value={selectedCategory}
                                                label="Categories"
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                multiple
                                            >
                                                {collection?.map(element => {
                                                    return (
                                                        <MenuItem
                                                            key={element.id}
                                                            value={element.collection_name}
                                                        >
                                                            {element.collection_name}
                                                        </MenuItem>
                                                    )
                                                }
                                                )}
                                            </Select>
                                        </>
                                    }
                                </FormControl>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleSave}>
                                Save Watch
                            </Button>
                            <Button onClick={() => {
                                setWatch(watchData)
                                setSelectedCategory(collectionFilter(watchData))
                            }}>
                                Reset Edits
                            </Button>
                        </CardActions>
                    </Card>
                </div >
            )}
        </>
    );
}

export default page;
