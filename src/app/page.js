"use client";

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={(e) => router.push("/watches", { userlist: [1, 2, 3] })}
      >
        Watches Page
      </Button>
    </div>
  )
}

export default page