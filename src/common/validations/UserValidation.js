import * as yup from 'yup';

const createUserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    role: yup.string().required('Role is required.'),
})

const updateUserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    role: yup.string().required('Role is required.'),
})

export {
    createUserSchema,
    updateUserSchema
}