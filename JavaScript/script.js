// Gallery Lightbox

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

if (lightbox && lightboxImage && closeLightbox) {

    document.addEventListener("click", function(event) {

        if (event.target.matches(".vehicle-card img")) {

            lightbox.style.display = "flex";
            lightboxImage.src = event.target.src;
            lightboxImage.alt = event.target.alt;

        }

    });

    closeLightbox.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }

    });

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }

    });

}

// Vehicle Search and Filter

const searchInput = document.getElementById("vehicleSearch");
const vehicleFilter = document.getElementById("vehicleFilter");

function searchVehicles() {

    const vehicleCards = document.querySelectorAll(".vehicle-card");

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = vehicleFilter.value;

    vehicleCards.forEach(function(card) {

        const vehicleName = card.querySelector("h3").textContent.toLowerCase();

        const matchesSearch = vehicleName.includes(searchText);

        let matchesCategory = true;

        if (selectedCategory === "sedan") {
            matchesCategory = [
                "toyota corolla",
                "bmw 3 series",
                "mercedes-benz c-class"
            ].includes(vehicleName);
        }

        else if (selectedCategory === "suv") {
            matchesCategory = vehicleName === "hyundai tucson";
        }

        else if (selectedCategory === "pickup") {
            matchesCategory = vehicleName === "ford ranger";
        }

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

if (searchInput && vehicleFilter) {

    searchInput.addEventListener("input", searchVehicles);
    vehicleFilter.addEventListener("change", searchVehicles);

}

const vehicles = [
    {
        name: "Toyota Corolla",
        image: "images/toyota-corolla.jpg",
        details: "2022 | Automatic | 65,000 km",
        price: "R219,900"
    },
    {
         name: "Volkswagen Golf",
        image: "images/volkswagen-golf.jpg",
        details: "2021 | Automatic | 52,000 km",
        price: "R249,900"
    },
    {
         name: "BMW 3 Series",
        image: "images/bmw-3-series.jpg",
        details: "2020 | Automatic | 70,000 km",
        price: "329,900"
    },
    {
         name: "Ford Ranger",
        image: "images/ford-ranger.jpg",
        details: "2022 | Automatic | 58,000 km",
        price: "R399,900"
    },
    {
         name: "Hyundai Tucson",
        image: "images/hyumdai-tucson.jpg",
        details: "2023 | Automatic | 35,000 km",
        price: "R369,900"
    },
    {
         name: "Mercedes-Benz C-Class",
        image: "images/mercedes-benz-c-class.jpg",
        details: "2021 | Automatic | 48,000 km",
        price: "R449,900"
    }
];
const vehicleGallery = document.getElementById("vehicleGallery");
if (vehicleGallery) {
    vehicles.forEach(function(vehicle) {
        const vehicleCard = document.createElement("div");
        vehicleCard.className = "vehicle-card";

       vehicleCard.innerHTML = `
    <img src="${vehicle.image}" alt="Used ${vehicle.name} for sale at AutoNexa" width="300">

    <div class="vehicle-info">
        <h3>${vehicle.name}</h3>
        <p class="vehicle-details">${vehicle.details}</p>
        <p class="vehicle-price">${vehicle.price}</p>
        <a href="Contact.html" class="vehicle-btn">Enquire Now</a>
    </div>
`;
        vehicleGallery.appendChild(vehicleCard);    
    });
}


// Contact Form Validation and AJAX Submission

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9+\s()-]{10,20}$/;

        if (name === "" || email === "" || subject === "" || message === "") {
            formMessage.textContent = "Please fill in all the required fields.";
            formMessage.style.color = "red";
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.style.color = "red";
            return;
        }

        if (phone !== "" && !phonePattern.test(phone)) {
            formMessage.textContent = "Please enter a valid phone number.";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "Sending your message...";
        formMessage.style.color = "black";

        try {

            const response = await fetch("https://formsubmit.co/ajax/mannyngindumwaka@gmail.com", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message,
                    _subject: "New AutoNexa Contact Message"
                })

            });

            const result = await response.json();

            if (response.ok && result.success) {

                formMessage.textContent = "Thank you! Your message has been sent successfully.";
                formMessage.style.color = "green";

                contactForm.reset();

            } else {

                formMessage.textContent = "Sorry, your message could not be sent. Please try again.";
                formMessage.style.color = "red";

            }

        } catch (error) {

            formMessage.textContent = "There was a problem sending your message. Please try again.";
            formMessage.style.color = "red";

        }

    });

}

const inquiryForm = document.getElementById("inquiryForm");
const inquiryResponse = document.getElementById("inquiryResponse");

if (inquiryForm) {

    inquiryForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();
        const customerEmail = document.getElementById("customerEmail").value.trim();
        const selectedVehicle = document.getElementById("vehicle").value;
        const inquiryType = document.getElementById("inquiryType").value;
        const inquiryMessage = document.getElementById("inquiryMessage").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            customerName === "" ||
            customerEmail === "" ||
            selectedVehicle === "" ||
            inquiryType === "" ||
            inquiryMessage === ""
        ) {

            inquiryResponse.textContent = "Please complete all the required fields.";
            inquiryResponse.style.color = "red";
            return;

        }

        if (!emailPattern.test(customerEmail)) {

            inquiryResponse.textContent = "Please enter a valid email address.";
            inquiryResponse.style.color = "red";
            return;

        }

        const selectedCar = vehicles.find(function(vehicle) {
            return vehicle.name === selectedVehicle;
        });

        if (!selectedCar) {

            inquiryResponse.textContent = "Sorry, we could not find that vehicle.";
            inquiryResponse.style.color = "red";
            return;

        }

        let customerReply = "";

        if (inquiryType === "Price") {

            customerReply = "The listed price of the " +
                selectedVehicle + " is " + selectedCar.price + ".";

        }

        else if (inquiryType === "Availability") {

            customerReply = "Your availability inquiry for the " +
                selectedVehicle + " has been received. Please contact our team to confirm availability.";

        }

        else {

            customerReply = "Your inquiry about the " +
                selectedVehicle + " has been received. Our team will be happy to assist you.";

        }

        inquiryResponse.textContent = "Sending your inquiry...";
        inquiryResponse.style.color = "black";

        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/mannyngindumwaka@gmail.com",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify({

                        name: customerName,
                        email: customerEmail,
                        vehicle: selectedVehicle,
                        inquiryType: inquiryType,
                        message: inquiryMessage,
                        _subject: "New AutoNexa Vehicle Inquiry"

                    })

                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                inquiryResponse.textContent =
                    "Thank you, " + customerName + "! " + customerReply;

                inquiryResponse.style.color = "green";

                inquiryForm.reset();

            }

            else {

                inquiryResponse.textContent =
                    "Sorry, your inquiry could not be sent. Please try again.";

                inquiryResponse.style.color = "red";

            }

        }

        catch (error) {

            inquiryResponse.textContent =
                "There was a problem sending your inquiry. Please try again.";

            inquiryResponse.style.color = "red";

        }

    });

}
