import * as yup from 'yup';
import { API_URL } from '../constants'
import jsCookie from 'js-cookie';
import { createUserSchema, updateUserSchema } from '../common/validations/UserValidation';

const getUsers = async (page = 1, perPage = 10) => {
    const response = await fetch(`${API_URL}/api/get-user?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jsCookie.get('accessToken')}`
        },
    });

    return await response.json()
}

const createUser = async (state, setError) => {
    try {
        await createUserSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({ name: state.name, email: state.email, role: state.role, isActive: state.isActive })
        });

        const res = await response.json();

        if (res.status !== 200 && res.validation) {
            const newErrors = {};
            res.validation.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }

        return res

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const newErrors = {};
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }
        return error
    }
}

const updateUser = async (state, setError) => {
    try {
        await updateUserSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/update-user/${state._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({ name: state.name, role: state.role, isActive: state.isActive })
        });

        const res = await response.json();

        if (res.status !== 200 && res.validation) {
            const newErrors = {};
            res.validation.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }

        return res

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const newErrors = {};
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }
        return error
    }
}

export {
    getUsers,
    createUser,
    updateUser
}