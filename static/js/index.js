$(document).ready(function() {
    $('.card-slider').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false 
    });
    $("#range__first").ionRangeSlider({
        type: "single",
        min: 1,
        max: 12,
        from: 1,
        step: 1,
        grid: true,
        grid_snap: true,
        grid_num: 5,
        values: [1, 3, 6, 9, 12],
        prettify: function(num) {
            return num + " month" + (num > 1 ? "s" : "");
        },
        skin: "round",
        min_interval: 1,
        max_interval: 1
    });
    $("#range__second").ionRangeSlider({
        type: "single",
        min: 300,
        max: 15000,
        from: 300,
        step: 1,
        grid: true,
        grid_snap: true,
        grid_num: 5,
        values: [300, 3975, 7650, 11325, 15000],
        prettify: function(num) {
            return "€ " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        skin: "round",
        min_interval: 1,
        max_interval: 1
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-block__input').forEach((input) => {
        input.addEventListener('input', () => {
            const label = input.parentElement.querySelector(".form-block__label") == null ? input.parentElement.parentElement.querySelector(".form-block__label") : input.parentElement.querySelector(".form-block__label");
            const errorMessage = input.parentElement.querySelector(".error-message") == null ? input.parentElement.parentElement.querySelector(".error-message") : input.parentElement.querySelector(".error-message");
            if (input.value.trim() !== "") {
                label.style.visibility = 'hidden';
                input.style.boxShadow = "none";
                errorMessage.innerText = "";

            } else {
                label.style.visibility = 'visible';
            }
        });
    });

    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        customPlaceholder: () => "",
        initialCountry: "it",
        autoPlaceholder: "aggressive", 
        formatOnDisplay: true,
        separateDialCode: true,  
        allowDropdown: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    const form = document.querySelector("#registrationForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerText = "";
        });
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.style.boxShadow = "none";
        });
        let valid = true;
        const nameInput = document.getElementById("name");
        if (nameInput.value.trim() === "") {
            valid = false;
            showError(nameInput, "Inserisci il nome");
        }

        const surnameInput = document.getElementById("surname");
        if (surnameInput.value.trim() === "") {
            valid = false;
            showError(surnameInput, "Inserisci il cognome");
        }

        const emailInput = document.getElementById("email");
        if (!validateEmail(emailInput.value)) {
            valid = false;
            showError(emailInput, "Inserisci un indirizzo email valido");
        }

        if (!phoneInput.isValidNumber()) {
            valid = false;
            showError(phoneInputField, "Inserisci un numero di telefono valido");
        }

        if (valid) {
            const formData = {
                name: nameInput.value,
                surname: surnameInput.value,
                email: emailInput.value,
                phone: phoneInput.getNumber() 
            };
            console.log(formData);
        }
    });

    function showError(input, message) {
        const errorMessage = input.parentElement.querySelector(".error-message") == null ? input.parentElement.parentElement.querySelector(".error-message") : input.parentElement.querySelector(".error-message");
        input.style.boxShadow = "0 0 5px rgba(255, 0, 0, 0.8)";
        errorMessage.innerText = message;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});


