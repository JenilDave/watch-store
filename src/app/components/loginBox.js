import Form from '@rjsf/material-ui';
import validator from '@rjsf/validator-ajv8';
import CenterOfPage from './centerOfPage';


function LoginBox({ onSubmit, onError = (e) => {
    console.log(e)
} }) {

    const loginSchema = {
        title: 'User Login',
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string', title: 'Username', minLength: 2 },
            password: { type: 'string', format: "password", title: 'Password', minLength: 2 },
        },
    };

    return <>
        <CenterOfPage>
            <Form schema={loginSchema} validator={validator} onSubmit={onSubmit} onError={onError} />
        </CenterOfPage>
    </>
}

export default LoginBox;
