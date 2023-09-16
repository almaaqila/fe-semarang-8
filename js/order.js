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

//mendefinisikan function untuk menampilkan pesan konfirmasi ketika submit
function confirmSubmit() {
    // Membuat const untuk menampilkan pesan konfirmasi
    const confirmation = confirm("Apakah Anda yakin untuk menyimpan formulir ini?");
    
    //Jika klik 'OK'
    if (confirmation) {
        // Select semua input element di order-form dan reset
        const submitform = document.querySelector(".order-form");                
        submitform.reset();

        // Pesan telah berhasil mengirim form
        alert("Terima kasih telah membeli dari Pasar Segar");

        return true; // melakukan submit form

    } else {
        //Jika klik 'cancel', return false untuk tidak submit form
        return false;
    }
}