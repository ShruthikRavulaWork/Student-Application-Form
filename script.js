document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.querySelector(".student-form");
  if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
      clearErrors();
      const requiredTextFields = [
        "firstName",
        "lastName",
        "dob",
        "gender",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zip",
        "class",
        "roll",
      ];
      for (const id of requiredTextFields) {
        const field = studentForm.querySelector(`#${id}`);
        if (!field || !field.value.trim()) {
          showError(field, "This field is required");
          e.preventDefault();
        }
      }
      const phone = studentForm.querySelector("#phone");
      if (phone && !/^\d{10}$/.test(phone.value)) {
        showError(phone, "Phone number must be exactly 10 digits");
        e.preventDefault();
      }
      const zip = studentForm.querySelector("#zip");
      if (zip && !/^\d{6}$/.test(zip.value)) {
        showError(zip, "Zip code must be exactly 6 digits");
        e.preventDefault();
      }
      const subjects = studentForm.querySelectorAll('input[name="subjects"]:checked');
      if (subjects.length === 0) {
        const subjectGroup = studentForm.querySelector(".checkbox-group");
        showError(subjectGroup, "Select at least one subject");
        e.preventDefault();
      }
      const extraSelected = studentForm.querySelector('input[name="extra"]:checked');
      if (!extraSelected) {
        const radioGroup = studentForm.querySelector(".radio-group");
        showError(radioGroup, "Please select an option");
        e.preventDefault();
      }
      if (document.querySelector(".error-message")) {
        e.preventDefault();
        const firstError = document.querySelector(".error-message");
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
    function showError(element, message) {
      if (!element) return;
      let error = document.createElement("span");
      error.className = "error-message";
      error.style.color = "red";
      error.style.fontSize = "0.9em";
      error.textContent = message;
      if (
        element.classList.contains("checkbox-group") ||
        element.classList.contains("radio-group")
      ) {
        element.parentElement.appendChild(error);
      } else {
        element.parentElement.appendChild(error);
      }
    }
    function clearErrors() {
      const errors = studentForm.querySelectorAll(".error-message");
      errors.forEach((err) => err.remove());
    }
  }
  const exampleForm = document.querySelector("#example");
  if (exampleForm) {
    exampleForm.addEventListener("submit", (e) => {
      const input = exampleForm.querySelector("#formInput");
      if (!input.value.trim()) {
        e.preventDefault();
        alert("Input cannot be empty");
        setTimeout(() => {
          input.focus();
          exampleForm.submit();
        }, 10000);
      }
    });
  }
});
