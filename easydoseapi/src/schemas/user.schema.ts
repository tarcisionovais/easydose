import * as yup from 'yup';

export const UserSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    isAdmin: yup.boolean().required()
});