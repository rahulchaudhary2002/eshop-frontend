import * as yup from 'yup';

const createOrderSchema = yup.object().shape({
    province: yup.string().required('Province is required.'),
    district: yup.string().required('District is required.'),
    municipality: yup.string().required('Municipality is required.'),
    street: yup.string().required('Street is required.'),
})

export {
    createOrderSchema
}