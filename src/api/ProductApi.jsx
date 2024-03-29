import * as yup from 'yup';
import { API_URL } from '../constants'
import jsCookie from 'js-cookie';
import { createProductSchema, updateProductSchema } from '../common/validations/ProductValidation';

const getProducts = async (page = 1, perPage = 10, search = '') => {
    const response = await fetch(`${API_URL}/api/get-product?page=${page}&perPage=${perPage}&search=${search}`);

    return await response.json()
}

const createProduct = async (state, setError) => {
    try {
        await createProductSchema.validate(state, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('brand', state.brand);
        formData.append('price', state.price);
        formData.append('category', state.category);
        formData.append('description', state.description);
        formData.append('file', state.file);

        const response = await fetch(`${API_URL}/api/create-product`, {
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

const updateProduct = async (state, setError) => {
    try {
        await updateProductSchema.validate(state, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('brand', state.brand);
        formData.append('price', state.price);
        formData.append('category', state.category);
        formData.append('description', state.description);
        formData.append('old_file', state.image);
        formData.append('file', state.file);

        const response = await fetch(`${API_URL}/api/update-product/${state._id}`, {
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

const findProductById = async (id) => {
    const response = await fetch(`${API_URL}/api/product/${id}`);

    return await response.json()
}

const findProductByCategory = async (id, page = 1, perPage = 10) => {
    const response = await fetch(`${API_URL}/api/product/category/${id}?page=${page}&perPage=${perPage}`);

    return await response.json()
}

export {
    getProducts,
    createProduct,
    updateProduct,
    findProductById,
    findProductByCategory
}