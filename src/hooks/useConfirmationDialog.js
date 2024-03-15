import Swal from 'sweetalert2';
const useConfirmationDialog = (title, text, confirmButtonText) => {
    const confirmAction = async () => {
        const language = localStorage.getItem('i18nextLng');
        const result = await Swal.fire({
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: '#9A65D1',
            cancelButtonColor: '#d33',
            cancelButtonText: language === 'en-US'?"Cancel":"বাতিল করুন",
            confirmButtonText,
        });
        return result.isConfirmed;
    }
    return confirmAction;
}
export default useConfirmationDialog;