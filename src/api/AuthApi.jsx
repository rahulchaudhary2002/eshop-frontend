import * as yup from 'yup';
import { API_URL } from '../constants'
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from '../common/validations/AuthValidation';
import jsCookie from 'js-cookie';

const register = async (state, setError) => {
    try {
        await registerSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'role': state.role ? state.role : 'customer'
            },
            body: JSON.stringify({ name: state.name, email: state.email, password: state.password, confirm_password: state.confirm_password })
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

const verify = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/verify/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

const login = async (state, setError) => {
    try {
        await loginSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: state.email, password: state.password })
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

const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

const refreshToken = async () => {
    try {
        const response = await fetch(`${API_URL}/api/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: jsCookie.get('refreshToken') })
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

const forgotPassword = async (state, setError) => {
    try {
        await forgotPasswordSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/forget-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: state.email })
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

const checkRestPasswordToken = async (token) => {
    const response = await fetch(`${API_URL}/api/check-reset-password-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
    });

    return await response.json();
}

const resetPassword = async (state, setError, token) => {
    try {
        await resetPasswordSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/reset-password/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: state.email, password: state.password, confirm_password: state.confirm_password })
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

const changePassword = async (state, setError) => {
    try {
        await changePasswordSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({ old_password: state.old_password, new_password: state.new_password, confirm_password: state.confirm_password })
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

const getCurrentUser = async () => {
    try {
        const response = await fetch(`${API_URL}/api/current-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
        });
    
        return await response.json();

    } catch (error) {
        return error
    }
}

export {
    register,
    verify,
    login,
    logout,
    refreshToken,
    forgotPassword,
    checkRestPasswordToken,
    resetPassword,
    changePassword,
    getCurrentUser
}
