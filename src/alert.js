import Swal from 'sweetalert2';

export const shortAlert = (text) => {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '系統提示',
        text: text,
        showConfirmButton: false,
        timer: 1800
    });
}