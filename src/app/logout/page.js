"use client";
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    let authKey = "{}"
    const localStVal = localStorage.getItem("authKey")
    if (typeof window !== 'undefined' && localStVal && localStVal !== 'undefined') {
        authKey = JSON.parse(localStVal);
    }
    return (
        <h1>
            {router.push('/login')}
            Redirecting...
        </h1>
    )
}


