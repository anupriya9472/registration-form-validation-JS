const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const fatherName = document.getElementById('fatherName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const address = document.getElementById('address');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
});


function validate() {
    const fullnameVal = fullname.value.trim();
    const fatherNameVal = fatherName.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const addressVal = address.value.trim();

    // after successfully validation
    let registeredMember = JSON.parse(localStorage.getItem('registeredMember'));
    let id = 0;
    if (registeredMember) {
        id = registeredMember[registeredMember.length - 1].id + 1;
    }
    else {
        registeredMember = [];
    }
    const scucessMsg = () => {
        if (document.getElementsByClassName('form-control success').length == document.getElementsByClassName('form-control').length) {
            alert("Your Data is successfully added.");

            document.getElementById('fullname').value="";
            document.getElementById('fatherName').value=""
            document.getElementById('email').value=""
            document.getElementById('phone').value="";
            document.getElementById('password').value="";
            document.getElementById('cpassword').value="";
            document.getElementById('address').value="";

            const obj = {
                id: id,
                fullname: fullnameVal,
                fatherName: fatherNameVal,
                email: emailVal,
                phone: phoneVal,
                password: passwordVal,
                address: addressVal
            };
            registeredMember.push(obj);
            id++;
            localStorage.setItem('registeredMember', JSON.stringify(registeredMember));
            document.getElementById('form-data').className = "form-data show";

            document.getElementById('fd-fullname').innerText = fullnameVal;
            document.getElementById('fd-fatherName').innerText = fatherNameVal;
            document.getElementById('fd-email').innerText = emailVal;
            document.getElementById('fd-phone').innerText = phoneVal;
            document.getElementById('fd-password').innerText = passwordVal;
            document.getElementById('fd-address').innerText = addressVal;
        }
    }

    // validate fullname
    if (fullnameVal === "") {
        setErrorMsg(fullname, 'Name can not be blank.');
    } else if (fullnameVal.length < 3) {
        setErrorMsg(fullname, 'Name should be 3 character.');
    } else if (!fullnameVal.match(/^[A-Za-z]+[A-Za-z \s]{2,}$/)) {
        setErrorMsg(fullname, 'Name is not valid. Name should be character only.');
    } else {
        setSuccessMsg(fullname);
    }

    // Validate fatherName
    if (fatherNameVal === "") {
        setErrorMsg(fatherName, 'Father Name can not be blank.');
    } else if (fatherNameVal.length < 3) {
        setErrorMsg(fatherName, 'Father Name should be 3 character.');
    } else if (!fatherNameVal.match(/^[A-Za-z]+[A-Za-z \s]{2,}$/)) {
        setErrorMsg(fatherName, 'Father Name is not valid. Father Name should be character only.');
    } else {
        setSuccessMsg(fatherName);
    }

    // validate email
    const isEmail = (emailVal) => {
        if (emailVal.match(/^[A-Z a-z][\w \. \- \_]+[@][a-z]{3,}[\.][a-z]{2,3}$/) || emailVal.match(/^[A-Z a-z][\w \. \- \_]+[@][a-z]{3,}[\.][a-z]{2}[\.][a-z]{2}$/)) {
            return true;
        }
        return false;
    }

    if (emailVal === "") {
        setErrorMsg(email, 'Email can not be blank.');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Not a valid email.');
    } else {
        setSuccessMsg(email);
    }

    // Validate phone
    if (phoneVal === "") {
        setErrorMsg(phone, 'Phone number can not be blank.');
    } else if (phoneVal.length != 10 || !phoneVal.match(/^[0-9]{10}$/)) {
        setErrorMsg(phone, 'Not a valid phone number.');
    } else {
        setSuccessMsg(phone);
    }

    // Validate Password
    const isValidPassword = (passwordVal) => {
        // To check a password between 8 to 16 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
        if (passwordVal.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)) {
            return true;
        }
        return false;
    }

    if (passwordVal === "") {
        setErrorMsg(password, 'Password can not be blank.');
    } else if (passwordVal.length < 8 || passwordVal.length > 15) {
        setErrorMsg(password, 'Password should be min 8 character and max 15 character.');
    } else if (!isValidPassword(passwordVal)) {
        setErrorMsg(password, 'Password is not Strong(Example:- paSs@word1,Pa8ssWo$12).');
    } else {
        setSuccessMsg(password);
    }

    // Validate confirm Password
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'Confirm Password can not be blank.');
    } else if (cpasswordVal != passwordVal) {
        setErrorMsg(cpassword, 'Password are not matching.');
    } else {
        setSuccessMsg(cpassword);
    }

    // Validate Address
    if (addressVal === "") {
        setErrorMsg(address, 'Address can not be blank.');
    } else if (!addressVal.match(/^[a-z A-Z \s \. \-]{4,}$/)) {
        setErrorMsg(address, 'Address is not valid.');
    } else {
        setSuccessMsg(address);
    }

    scucessMsg();
}


// Setting error class in form-control
function setErrorMsg(input, errorMsg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errorMsg;
}
// setting success class in form-control
function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// 
function btnOK() {
    if (confirm("Do you want to Delete all recordes from LoaclStorage?")) {
        localStorage.removeItem('registeredMember');
    }
    document.getElementById('form-data').className = "form-data";
    location.reload();
}
