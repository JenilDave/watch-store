"use client";

import { Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function AuthUser({ children }) {
    const [authKey, setAuthKey] = useState("{}")
    console.log("Authing", authKey);

    useEffect(() => {
        const value = localStorage.getItem('authKey');
        const key = !!value ? JSON.parse(value) : "{}";
        setAuthKey(key)
    }, [])

    return (
        (authKey === '{}') ?
            <>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                    {"You're not logged in. Please Do it!"}
                </Typography>
                <Chip
                    label="Goto Login Page"
                    component="a"
                    href={`/login`}
                    variant="outlined"
                    clickable
                />
            </>
            : <>{children}</>
    )
}


export default AuthUser;
