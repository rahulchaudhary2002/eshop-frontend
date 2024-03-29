import * as yup from 'yup';

const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match.').required('Confirm Password is required.'),
})

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email address.').required('Email is required.')
});

const resetPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match.').required('Confirm Password is required.'),
})

const changePasswordSchema = yup.object().shape({
    old_password: yup.string().required('Password is required.'),
    new_password: yup.string().required('New password is required.'),
    confirm_password: yup.string().oneOf([yup.ref('new_password'), null], 'Passwords must match.').required('Confirm Password is required.'),
})

export {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema
}