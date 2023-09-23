//mendefinisikan function untuk mengambil value dari parameter di URL
function getQueryParameter(param) { 
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//untuk mengambil value dari parameter produk di URL dan disimpan di const
const produkValue = getQueryParameter('produk');

//define const input dari ID produk
const produkInput = document.getElementById('produk');

//Kondisi jika URL diakhiri string "order.html"
if (window.location.pathname.endsWith('order.html')) {
    // Jika value query 'produk' ada, set menjadi value input 
    if (produkValue) {
        produkInput.value = produkValue;
    } 
    // Jika value 'produk' tidak ada, menjadi dapat input
    else {
        produkInput.removeAttribute('readonly'); //menghapus atribut readonly
    }
}

// Mendefinisikan function untuk menampilkan pesan konfirmasi ketika submit
function confirmationForm() {
    // Membuat const untuk menampilkan pesan konfirmasi
    const confirmation = confirm("Apakah Anda yakin untuk menyimpan formulir ini?");

    // Jika klik 'OK'
    if (confirmation) {
        // Select semua input element di order-form dan reset
        const submitform = document.querySelector(".order-form");
        submitform.reset();

        // Pesan telah berhasil mengirim form
        alert("Terima kasih telah membeli dari Pasar Segar");
        return true; // melakukan submit form
    } else {
        // Jika klik 'cancel', return false untuk tidak submit form
        return false;
    }
}

// Mendefinisikan function untuk submit form
function submitForm() {
    // Membuat const untuk input yang memiliki atribut "required"
    const inputFields = document.querySelectorAll('input[required]');
    // Membuat const untuk input select
    const satuanSelect = document.getElementById("satuan");

    // Menambahkan event listener ke inputFields
    inputFields.forEach((input) => {
        input.addEventListener('input', function () {
            this.setCustomValidity(''); // Reset pesan validasinya
        });

        // Event listener ketika input kosong 
        input.addEventListener('invalid', function () {
            this.setCustomValidity('Data yang diisikan belum lengkap, silahkan lengkapi terlebih dahulu');
        });
    });

    if (satuanSelect.value === "") { // Jika belum memilih satuan
        alert("Harap pilih salah satu opsi pada Satuan.");
        return false; // Mencegah submit form

    } else { //Jika semua form tervalidasi
        return confirmationForm(); // Memanggil fungsi konfirmasi submit form 
    }
}