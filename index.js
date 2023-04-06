const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const birthday = document.getElementById("birthday");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const firstNameMessage = document.getElementById("first-name-message");
const lastNameMessage = document.getElementById("last-name-message");
const birthdayMessage = document.getElementById("birthday-message");
const emailMessage = document.getElementById("email-message");
const passwordMessage = document.getElementById("password-message");
const passwordConfirmMessage = document.getElementById(
  "password-confirm-message"
);
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

birthday.setAttribute("max", dayjs(new Date()).format("YYYY-MM-DD").toString());
birthday.setAttribute(
  "value",
  dayjs(new Date()).format("YYYY-MM-DD").toString()
);

const addInvalidClass = (className) => {
  className.classList.add("is-invalid");
};

const removeInvalidAction = (className, message) => {
  className.classList.remove("is-invalid");
  return (message.innerHTML = "");
};

function validateFirstName(value) {
  if (value.length < 2 || value.length > 25) {
    addInvalidClass(firstName);
    firstNameMessage.innerHTML =
      "First name must be between 2 and 25 characters.";
    return false;
  } else if (value === "") {
    addInvalidClass(firstName);
    firstNameMessage.innerHTML = "First name is a required field.";
    return false;
  } else {
    removeInvalidAction(firstName, firstNameMessage);
  }
}

function validateLastName(value) {
  if (value.length < 2 || value.length > 25) {
    addInvalidClass(lastName);
    lastNameMessage.innerHTML =
      "Last name must be between 2 and 25 characters.";
    return false;
  } else if (value === "") {
    addInvalidClass(lastName);
    lastNameMessage.innerHTML = "Last name is a required field.";
    return false;
  } else {
    removeInvalidAction(lastName, lastNameMessage);
  }
}

function validateBirthday(value) {
  if (value === "") {
    addInvalidClass(birthday);
    birthdayMessage.innerHTML = "Date of birth is a required field.";
    return false;
  } else {
    removeInvalidAction(birthday, birthdayMessage);
  }
}

function validateEmail(value) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === "") {
    addInvalidClass(email);
    emailMessage.innerHTML = "Email is a required field.";
    return false;
  } else if (!emailRegex.test(value)) {
    addInvalidClass(email);
    emailMessage.innerHTML = "Please enter a valid email address.";
    return false;
  } else {
    removeInvalidAction(email, emailMessage);
  }
}

function validatePassword(value) {
  let passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[1-9])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (value === "") {
    addInvalidClass(password);
    passwordMessage.innerHTML = "Password is a required field.";
    return false;
  } else if (!passwordRegex.test(value) && !/[1-9]/.test(password)) {
    addInvalidClass(password);
    passwordMessage.innerHTML =
      "Password must be at least 8 characters long, contain at least one uppercase character, one number 1-9 and one special character (!@#$%).";
    return false;
  } else {
    removeInvalidAction(password, passwordMessage);
  }
}

function validatePasswordConfirm(value) {
  if (value === "" || value !== password.value) {
    addInvalidClass(passwordConfirm);
    passwordConfirmMessage.innerHTML =
      "Password does not match the confirmation.";
    return false;
  } else {
    removeInvalidAction(passwordConfirm, passwordConfirmMessage);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("registration-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateFirstName(firstName.value) === false) {
      appendAlert("Please enter correct first name", "primary");
      return false;
    } else if (validateLastName(lastName.value) === false) {
      appendAlert("Please enter correct last name", "primary");
      return false;
    } else if (validateBirthday(birthday.value) === false) {
      appendAlert("Please enter correct birthday", "primary");
      return false;
    } else if (validateEmail(email.value) === false) {
      appendAlert("Please enter correct email", "primary");
      return false;
    } else if (validatePassword(password.value) === false) {
      appendAlert("Please enter correct password", "primary");
      return false;
    } else if (validatePasswordConfirm(passwordConfirm.value) === false) {
      appendAlert("Please enter correct password confirm", "primary");
      return false;
    }

    let formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      birthday: birthday.value,
      email: email.value,
      password: password.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async function (response) {
        if (response.ok) {
          appendAlert("Registration successful!", "success");
          console.log(await response.text());
          form.reset();
        } else {
          appendAlert("Error submitting form", "danger");
        }
      })
      .catch(function (error) {
        appendAlert("Error submitting form", "danger");
      });
  });
});
