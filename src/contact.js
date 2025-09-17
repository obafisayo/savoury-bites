document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // DOM elements
  const reservationForm = document.getElementById("reservationForm");
  const contactForm = document.getElementById("contactForm");

  // Reservation form inputs
  const nameInput = document.getElementById("reservationName");
  const emailInput = document.getElementById("reservationEmail");
  const partySizeInput = document.getElementById("partysize");
  const dateInput = document.getElementById("reservationDate");
  const messageInput = document.getElementById("reservationMessage");

  // Error message elements
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const partyError = document.getElementById("partyError");
  const dateError = document.getElementById("dateError");
  const errorMessage = document.getElementById("errorMessage");

  // === Save and Load Data in Session Storage ===
  const saveFormData = () => {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      partySize: partySizeInput.value,
      date: dateInput.value,
      message: messageInput.value,
    };
    sessionStorage.setItem("reservationFormData", JSON.stringify(formData));
  };

  const loadFormData = () => {
    const savedData = sessionStorage.getItem("reservationFormData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      nameInput.value = formData.name || "";
      emailInput.value = formData.email || "";
      partySizeInput.value = formData.partySize || "";
      dateInput.value = formData.date || "";
      messageInput.value = formData.message || "";
    }
  };

  loadFormData();

  [nameInput, emailInput, partySizeInput, dateInput, messageInput].forEach((input) =>
    input.addEventListener("input", saveFormData)
  );

  // === Reservation Form Validation ===
  function validateReservationForm() {
    let valid = true;

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    partyError.textContent = "";
    dateError.textContent = "";
    errorMessage.textContent = "";

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
      nameError.textContent = "Name can only contain letters and spaces.";
      valid = false;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Validate party size
    const partySize = parseInt(partySizeInput.value, 10);
    if (isNaN(partySize) || partySize <= 0) {
      partyError.textContent = "Party size must be greater than 0.";
      valid = false;
    } else if (partySize > 12) {
      partyError.textContent = "Sorry, we do not allow reservations above 12.";
      valid = false;
    }

    // Validate date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dateInput.value) {
      dateError.textContent = "Please select a reservation date.";
      valid = false;
    } else {
      const selectedDate = new Date(dateInput.value);
      if (selectedDate < today) {
        dateError.textContent = "The reservation date cannot be in the past.";
        valid = false;
      }
    }

    console.log("Validation Result:", valid);
    return valid;
  }

  // === Submit to Web3Forms ===
  async function submitToWeb3Forms(form) {
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Web3Forms Response:", result);

      if (result.success) {
        sessionStorage.removeItem("reservationFormData");
        window.location.href = "success.html"; // Redirect to thank you page
      } else {
        errorMessage.textContent = result.message || "Something went wrong!";
      }
    } catch (error) {
      console.error("Network Error:", error);
      errorMessage.textContent = "Network error, please try again.";
    }
  }

  // === Handle Reservation Form Submission ===
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Reservation Form Submitted");

    if (!validateReservationForm()) {
      console.log("Validation failed, stopping submission.");
      return;
    }

    console.log("Validation passed, submitting to Web3Forms...");
    submitToWeb3Forms(reservationForm);
  });

  // === Handle Contact Form Submission ===
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted");

    submitToWeb3Forms(contactForm);
  });
});
