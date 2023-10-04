async function getProducts() {
    const res = await fetch('https://be-semarang-8-production.up.railway.app/api/products');

    const restJSON = await res.json();
    const products = document.querySelector(".list");

    if (restJSON.success) {
        for (let i = 0; i < restJSON.data.length; i++) {
            const div = document.createElement("div");
            if(i != 0){
                div.classList.add("card");
            }
            if(i % 3 == 0){
                div.classList.remove("card");
            }
            const product = `
            <img class="gambar" src=${restJSON.data[i].image} alt="" />
            <h3>${restJSON.data[i].name}</h3>
            <p>${restJSON.data[i].weight} ${restJSON.data[i].satuan}</p>
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
