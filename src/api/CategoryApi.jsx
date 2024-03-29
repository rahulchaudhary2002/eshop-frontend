import * as yup from 'yup';
import { API_URL } from '../constants'
import jsCookie from 'js-cookie';
import { createCategorySchema, updateCategorySchema } from '../common/validations/CategoryValidation';

const getCategories = async (page = 1, perPage = 10) => {
    const response = await fetch(`${API_URL}/api/get-category?page=${page}&perPage=${perPage}`);

    return await response.json()
}

const createCategory = async (state, setError) => {
    try {
        await createCategorySchema.validate(state, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('file', state.file);

        const response = await fetch(`${API_URL}/api/create-category`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: formData
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

const updateCategory = async (state, setError) => {
    try {
        await updateCategorySchema.validate(state, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('old_file', state.old_file);
        formData.append('file', state.file);

        const response = await fetch(`${API_URL}/api/update-category/${state.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: formData
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
    getCategories,
    createCategory,
    updateCategory
}