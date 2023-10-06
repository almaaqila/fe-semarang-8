let productRowCount = 0; // Initialize with one row for the first product

// Function to add a new product row
function addProductRow() {
    const productRows = document.querySelector(".product-rows");

    // Create a new row
    const newRow = document.createElement("div");
    newRow.classList.add("product-row");

    // Add fields for the new product
    newRow.innerHTML = `
    <label class="required" for="produk">Produk</label> 
    <select name="produk" class="produk-dropdown" required>
        <option value="" disabled selected>Pilih Produk</option>
    </select>
    <div class="item-row">
        <div class="col-30">
        <label class="required" for="jumlah">Jumlah</label> 
            <input type="text" name="jumlah" class="form-jumlah" placeholder="100" required>        
        </div>
        <div class="col-30">
        <label class="required" for="satuan">Satuan</label>
            <select name="satuan" form="satuanform" required>
                <option value="" disabled selected>Pilih</option>
                <option value="kg">kg</option>
                <option value="gr">gr</option>
                <option value="pcs">pcs</option>
            </select>
        </div>
    </div><hr>`;

    // Append the new row to the container
    productRows.appendChild(newRow);

    // Populate the dropdown options for the new product row
    populateProductDropdown(newRow.querySelector(".produk-dropdown"));

    // Increment the product row count
    productRowCount++;

    
    const removeButton = document.querySelector(".btn-remove");
    if (productRowCount > 0) {
        removeButton.style.display = "inline-block";
    }
}

// Function to remove a product row
function removeLastProductRow() {
    const productRows = document.querySelector(".product-rows");
    const rows = productRows.querySelectorAll(".product-row");

    if (rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        lastRow.remove();

        // Decrement the product row count
        productRowCount--;

        // Disable the "Hapus Produk" button when there are no rows left
        const removeButton = document.querySelector(".btn-remove");
        if (productRowCount === 0) {
            removeButton.style.display = "none";
        }
    }
}
// Function to populate the "produk" dropdown
async function populateProductDropdown(dropdown) {
   
    const res = await fetch('https://be-semarang-8-production.up.railway.app/api/products');
    const restJSON = await res.json();

    if (restJSON.success) {
        const productList = resJSON.data;

        // Loop through the products and create an option element for each
        productList.forEach((product) => {
            const option = document.createElement('option');
            option.value = product.name; // Assuming 'name' is the product name in your database
            option.textContent = product.name; // Display the product name
            dropdown.appendChild(option);
        });

        // Call the function to set the dropdown value after it's populated
        setProductDropdownValue();
    }

}

// Function to get the query parameter
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to set the "produk" dropdown based on the query parameter or user input
function setProductDropdownValue() {
    const produkDropdown = document.getElementById('produkDropdown');
    const produkValue = getQueryParameter('produk');

    // If the query parameter exists, set the dropdown value to it
    if (produkValue) {
        produkDropdown.value = produkValue;
    }
}

// Call the functions to populate the dropdown and set the default value
document.addEventListener('DOMContentLoaded', function () {
    populateProductDropdown(document.querySelector(".produk-dropdown"));
});

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

function submitForm() {
    // Membuat const untuk input yang memiliki atribut "required"
    const inputFields = document.querySelectorAll('input[required]');
    // Membuat const untuk select input
    const satuanSelect = document.getElementById("satuan");

    let isValid = true; // Flag to track overall form validity

    // Loop through input fields
    inputFields.forEach((input) => {
        input.addEventListener('input', function () {
            this.setCustomValidity(''); // Reset pesan validasinya
        });

        // Menampilkan pesan validasi secara langsung
        input.reportValidity();

        // Check if the input is empty
        if (input.value === '') {
            isValid = false; // Set the flag to false if any input is empty
        }
    });

    // Menambahkan event listener untuk select element
    satuanSelect.addEventListener('change', function () {
        satuanSelect.setCustomValidity(''); // Reset pesan validasinya saat select diubah
    });

    if (satuanSelect.value === "") { // Jika belum memilih satuan
        satuanSelect.setCustomValidity('Please select an item in the list.'); // Pesan custom untuk select yang belum dipilih
        satuanSelect.reportValidity(); // Menampilkan pesan validasi secara langsung
        isValid = false; // Set the flag to false if satuan is not selected
    }

    if (!isValid) {
        return false; // Mencegah submit form if any field is empty or invalid
    } else {
        return confirmationForm(); // Memanggil fungsi konfirmasi submit form 
    }
}
