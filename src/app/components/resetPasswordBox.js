import Form from '@rjsf/material-ui';
import validator from '@rjsf/validator-ajv8';
import CenterOfPage from './centerOfPage';


function ResetPasswordBox({ onSubmit, onError = (e) => {
    console.log(e)
} }) {

    const schema = {
        title: 'Reset Password',
        type: 'object',
        required: ['username', 'password', 'new_password', 'confirm_new_password'],
        properties: {
            username: { type: 'string', title: 'Username', minLength: 2 },
            password: { type: 'string', format: "password", title: 'Old Password', minLength: 2 },
            new_password: { type: 'string', format: "password", title: 'New Password', minLength: 2 },
            confirm_new_password: { type: 'string', format: "password", title: 'Confirm New Password', minLength: 2 },
        },
    };

    return <>
        <CenterOfPage>
            <Form schema={schema} validator={validator} onSubmit={onSubmit} onError={onError} />
        </CenterOfPage>
    </>
}

export default ResetPasswordBox;
