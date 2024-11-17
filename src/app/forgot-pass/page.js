"use client";

import { resetPassword } from "@/utils/api/api";
import { Typography } from '@mui/material';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import ResetPasswordBox from "../components/resetPasswordBox";

function ForgotPassword() {

    const router = useRouter();
    const [validate, setValidate] = useState(true);

    const handleUpdatePassword = ({ formData }) => {
        setValidate(formData.new_password == formData.confirm_new_password);
        if (formData.new_password == formData.confirm_new_password) {
            resetPassword('/reset_pass', formData).then(resp => {
                if (resp) {
                    router.push("/watches");
                }
            })
        }
    }

    return (
        <div>
            {
                !validate && (
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 50 }}>
                        Confirm new password is not matching
                    </Typography>
                )
            }
            <ResetPasswordBox onSubmit={handleUpdatePassword} />
        </div>
    );
}

export default ForgotPassword;
