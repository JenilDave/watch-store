"use client";
// import "./globals.css";


import AuthUser from "@/app/AuthUser";


export default function EditWatchLayout({ children }) {
    return (
        <AuthUser>
            {children}
        </AuthUser>
    );
}
