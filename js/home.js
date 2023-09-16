//Untuk Carousel slider tesimonial

// Variabel yang menyimpan index testi saat ini
let currentTestimonial = 0;

//Const untuk mengambil semua elemen di class testimonial-card
const testimonials = document.querySelectorAll('.testimonial-card');

//Const untuk mengambil semua elemen di kelas dot
const dots = document.querySelectorAll('.dot');

//Mendefinisikan function untuk menampilkan testi pada index terentu
function showTestimonial(index) {
    testimonials.forEach((testimonial, idx) => { //Iterasi semua testi
        if (idx === index) { //Jika index sesuai
            testimonial.style.display = 'block'; //Menampilkan testi
            dots[idx].classList.add('active'); //Mengaktifkan dot
        } else { //Jika index tidak sesuai
            testimonial.style.display = 'none';
            dots[idx].classList.remove('active');
        }
    });
    //Mengupdate value currentTestimonial dengan index
    currentTestimonial = index;
}

//Mendefinisikan function untuk melihat testi sebelumnya
function prevTestimonial() {
    //Menghitung index testi sebelumnya dan disimpan di currentTestimonial
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial); //Menampilkan testi sebelumnya
}

//Mendefinisikan function untuk melihat testi setelahnya
function nextTestimonial() {
    //Menghitung index testi setelahnya dan disimpan di currentTestimonial
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial); //Menampilkan testi setelahnya
}

// Mendefinisikan function untuk auto slide testi
function autoChangeTestimonial() {
    nextTestimonial(); //Memanggil function nextTestimonial
}

// Mengatur interval waktu untuk call function autoChangeTestimonial
setInterval(autoChangeTestimonial, 6000);

showTestimonial(currentTestimonial);