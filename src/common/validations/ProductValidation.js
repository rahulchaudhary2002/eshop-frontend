import * as yup from 'yup';

const createProductSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    brand: yup.string().required('Brand is required.'),
    price: yup.number().positive().required('Price is required.'),
    category: yup.string().required('Category is required.'),
    file: yup
        .mixed()
        .test('fileRequired', 'Image is required', function(value) {
            if (!this.parent.file) return false;
            return true;
        })
        .test(
            'fileType',
            'Only image files are allowed (jpg, jpeg, png, gif)',
            (value) => {
                if (!value) return true;
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }
        )
});

const updateProductSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    brand: yup.string().required('Brand is required.'),
    price: yup.number().positive().required('Price is required.'),
    category: yup.string().required('Category is required.'),
    file: yup
        .mixed()
        .test(
            'fileType',
            'Only image files are allowed (jpg, jpeg, png, gif)',
            (value) => {
                if (!value) return true;
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }
        )
});

export {
    createProductSchema,
    updateProductSchema
}