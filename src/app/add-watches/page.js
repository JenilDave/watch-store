"use client";

import { addWatch, getAllCollections } from "@/utils/api/api";
import {
  Box,
  Button, Card, CardActions, CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select, TextField, Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import UploadImage from "../components/uploadImage";

const users = () => {
  const router = useRouter();
  const [watchImg, setwatchImg] = useState(null);
  const [watch, setWatch] = useState({});
  const [watchImgStr, setWatchImgStr] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([])
  const { data, error, isLoading } = useSWR(
    "/watch-collections",
    (url) => getAllCollections(url), {
    revalidateOnFocus: false
  }
  );

  const getBase64 = async (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setWatchImgStr(reader.result.toString());
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleSave = () => {
    const res = addWatch('/admin/watch', { ...watch, img: watchImgStr, categories: selectedCategory })
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "lightgrey" }}>
      <Card>
        <CardContent sx={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 50 }}>
            Add New Watch
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
            Upload Image Below
          </Typography>
          {
            watchImg &&
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(watchImg)}
            />
          }
          <UploadImage onChange={(e) => {
            setwatchImg(e.target.files[0])
            getBase64(e.target.files[0])
          }} />
          <Box width={300}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Watch name"
              variant="outlined"
              margin="normal"
              onChange={(e) => setWatch({ ...watch, name: e.target.value })}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Color"
              variant="outlined"
              margin="normal"
              onChange={(e) => setWatch({ ...watch, color: e.target.value })}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Company"
              variant="outlined"
              margin="normal"
              onChange={(e) => setWatch({ ...watch, company: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
              {isLoading && "Loading Collections..."}
              {error && "Error Loading Collections!!!"}
              {(data) &&
                <>
                  <InputLabel id="demo-select-small-label">Collections</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    value={selectedCategory}
                    label="Collections"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    multiple
                  >
                    {data?.map(element => {
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
        </CardActions>
      </Card>
    </div>
  );
};

export default users;
