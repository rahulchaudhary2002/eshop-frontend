import * as yup from 'yup';

const createCategorySchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
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

const updateCategorySchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
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
    createCategorySchema,
    updateCategorySchema
}