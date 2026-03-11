import Swal from 'sweetalert2';

export const showAlert = (title: string, text?: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info') => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#000000',
    });
};

export const showConfirm = async (title: string, text?: string) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });
    return result.isConfirmed;
};

export const showPrompt = async (title: string, placeholder?: string) => {
    const { value: text } = await Swal.fire({
        title,
        input: 'text',
        inputPlaceholder: placeholder,
        showCancelButton: true,
        confirmButtonColor: '#000000',
    });
    return text;
};

export default Swal;
