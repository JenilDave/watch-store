"use client";
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        localStorage.removeItem("authKey");

    }
    return (
        <h1>
            {router.push('/login')}
            Redirecting...
        </h1>
    )
}


