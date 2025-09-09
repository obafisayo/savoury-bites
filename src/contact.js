document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const nameInput = document.getElementById("reservationName");
  const emailInput = document.getElementById("reservationEmail");
  const partySizeInput = document.getElementById("partysize");
  const dateInput = document.getElementById("reservationDate");
  const messageInput = document.getElementById("reservationMessage");
  const confirmationMessage = document.getElementById("confirmationMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const partyError = document.getElementById("partyError");
  const dateError = document.getElementById("dateError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Reset errors and confirmation
    nameError.textContent = "";
    emailError.textContent = "";
    partyError.textContent = "";
    dateError.textContent = "";
    confirmationMessage.textContent = "";

    let hasError = false;

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
      nameError.textContent = "Name can only contain letters and spaces.";
      hasError = true;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    // Validate party size
    const partySize = parseInt(partySizeInput.value, 10);
    if (partySize <= 0 || isNaN(partySize)) {
      partyError.textContent =
        "Party size must be a number greater than zero.";
      hasError = true;
    } else if (partySize > 12) {
      partyError.textContent =
        "Sorry, we do not allow reservations above 12.";
      hasError = true;
    }

    // Validate reservation date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservationDate = new Date(dateInput.value);

    if (!dateInput.value) {
      dateError.textContent = "Please select a reservation date.";
      hasError = true;
    } else if (reservationDate < today) {
      dateError.textContent = "The reservation date cannot be in the past.";
      hasError = true;
    }

    if (hasError) return;

    // Save reservation data
    const reservationData = {
      name: nameInput.value,
      email: emailInput.value,
      partySize: partySize,
      reservationDate: dateInput.value,
      message: messageInput.value,
    };

    try {
      sessionStorage.setItem(
        "reservationDetails",
        JSON.stringify(reservationData)
      );
      console.log("Reservation data saved:", reservationData);

      confirmationMessage.textContent = `Thank you, ${nameInput.value}! Your reservation for ${partySize} people on ${dateInput.value} has been successfully submitted.`;

      form.reset();
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
      confirmationMessage.textContent =
        "There was an issue saving your reservation. Please try again.";
    }
  });
});
