async function getProducts() {
    // const res = await fetch('https://be-semarang-8.railway.internal/api/products');
    const res = await fetch('http://localhost:3000/api/products');

    const restJSON = await res.json();
    const products = document.querySelector(".list");

    if (restJSON.success) {
        for (let i = 0; i < restJSON.data.length; i++) {
            const div = document.createElement("div");
            const product = `
            <img class="gambar" src=${restJSON.data[i].image} alt="" />
            <h3>${restJSON.data[i].name}</h3>
            <p>${restJSON.data[i].weight}gr</p>
            <div class="harga">
              <p>${restJSON.data[i].price}</p>
              <a class="pesan" href="order.html?produk=${restJSON.data[i].name}">Pesan</a>
            </div>`

            div.innerHTML = product;
            products.append(div);
        }

    }
    console.log(restJSON);
}

getProducts();
