document.addEventListener('DOMContentLoaded', function () {
    // var elems = document.querySelectorAll('.modal');
    M.Modal.init(document.querySelectorAll('.modal'), {
        opacity: .5,
        inDuration: 200,
        outDuration: 200
    });
    const span = document.getElementById("currentYear");
    span.textContent = String(new Date().getFullYear());
    // db.jsp
    const createButton = document.getElementById("db-create-button");
    if (createButton) {
        createButton.addEventListener('click', createButtonClick);
    }
    const insertButton = document.getElementById("db-insert-button");
    if (insertButton) {
        insertButton.addEventListener('click', insertButtonClick);
    }
});

function insertButtonClick() {
    const nameInput = document.querySelector('[name="user-name"]');
    if (!nameInput) {
        throw '[name="user-name"] not found';
    }
    const phoneInput = document.querySelector('[name="user-phone"]');
    if (!phoneInput) {
        throw '[name="user-phone"] not found';
    }
    if (validateFields(nameInput, phoneInput)) {
        fetch(window.location.href, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                phone: phoneInput.value
            })
        }).then(r => r.json()).then(j => {
            console.log(j);
        });
    }
}

function createButtonClick() {
    fetch(window.location.href, {
        method: 'PUT'
    }).then(r => r.json()).then(j => {
        console.log(j);
    });
}

function validateFields(nameInput, phoneInput) {
    if (nameInput.classList.contains("invalid")) {
        nameInput.classList.remove("invalid");
    }
    if (phoneInput.classList.contains("invalid")) {
        phoneInput.classList.remove("invalid");
    }
    let isValid = true;
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    //const namePattern = new RegExp("^[а-яА-Яa-zA-ZіІїЇ]+$");
    const phonePattern = new RegExp("^\\+38\\s?(\\(\\d{3}\\)|\\d{3})\\s?\\d{3}(-|\\s)?\\d{2}(-|\\s)?\\d{2}$");
    if (nameInput.value.trim() === '') {
        isValid = false;
        nameInput.classList.add("invalid");
        nameError.setAttribute("data-error", "Ім'я не може бути порожнім");
    }
    // } else if (!namePattern.test(nameInput.value)) {
    //     isValid = false;
    //     nameInput.classList.add("invalid");
    //     nameError.setAttribute("data-error", "Ім'я не відповідає шаблону, тільки букви, без пробілів");
    // }
    if (phoneInput.value.trim() === '') {
        isValid = false;
        phoneInput.classList.add("invalid");
        phoneError.setAttribute("data-error", "Телефон не може бути порожнім");
    } else if (!phonePattern.test(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.add("invalid");
        phoneError.setAttribute("data-error", "Телефон не відповідає шаблону: +38099xxxxxxx або +38(099)xxx-xx-xx");
    }
    return isValid;
}