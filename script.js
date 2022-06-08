
const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const showerror = (input, message) => {

    const formControl = input.parentElement;

    formControl.classList.remove('success');
    formControl.classList.add('error');

    const small = formControl.querySelector('small');
    small.innerText = message;

}

const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

const checkRequired = inputArray => {
    inputArray.forEach(input => {
        if (input.value.trim() == '') {
            showerror(input, `${getfieldName(input.id)} cannot be empty`)
        }
    });
};

const getfieldName = input => {
    return input.charAt(0).toUpperCase() + input.slice(1).replace('-n', 'N')
}

//check email is valid

const checkEmail = input => {
    if (!isValidEmail(input.value)) {
        showerror(input, 'Looks like this not an email')
    } else {
        showSuccess(input);
    }
};

const isValidEmail = email => {
    return String(email).toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const checkLength = (input, min, max) => {
    if (input.value.trim().length < min) {
        showerror(input, `The ${getfieldName(input.id)} should be at least ${min} characters`)
    } else if (input.value.trim().length > max) {
        showerror(input, `the ${getfieldName(input.id)} should be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
};

const checkPasswordMatching = (password, password2) => {
    if (password2.value !== password.value) {
        showerror(password2, 'Password does not match');
    } else {
        showSuccess(password2);
    }
}

//Event listener

form.addEventListener('submit', event => {
    event.preventDefault();

    checkRequired([firstname, lastname, email, password, password2]);

    if (firstname.value.trim() !== '') {
        checkLength(firstname, 3, 15);
    }
    if (lastname.value.trim() !== '') {
        checkLength(lastname, 3, 15);
    }
    if (email.value.trim() !== '') {
        checkEmail(email);
    }
    if (password.value.trim() !== '') {
        checkLength(password, 8, 25);
    }

    checkPasswordMatching(password, password2);

})
