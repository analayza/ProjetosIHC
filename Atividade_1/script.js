let slideIndex = 0;
    mostrarSlides(slideIndex);

    function mudarSlide(n) {
        mostrarSlides(slideIndex += n);
    }

    function mostrarSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slides");

        if (n >= slides.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = slides.length - 1;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex].style.display = "block";
    }