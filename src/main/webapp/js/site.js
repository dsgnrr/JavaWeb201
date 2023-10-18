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
    const readButton = document.getElementById("db-read-button");
    if (readButton) {
        readButton.addEventListener('click', readButtonClick);
    }
    const cardTableDiv = document.getElementById("cardTable");
    if (cardTableDiv) {
        cardTableDiv.hidden = true;
    }
});

function readButtonClick() {
    fetch(window.location.href, {
        method: "COPY"
    }).then(r => r.json())
        .then(showCalls);
}

function showCalls(j) {
    if (Array.isArray(j)) {
        document.getElementById("cardTable").hidden = false;
        const tableBody = document.getElementById("tableBody");
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        let tr;
        let td;
        for (let call of j) {
            tr = document.createElement("tr");

            td = document.createElement("td");
            td.textContent = call.id;
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = call.name;
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = call.phone;
            tr.appendChild(td);

            td = document.createElement("td");
            td.textContent = call.moment;
            tr.appendChild(td);

            td = document.createElement("td");
            td.innerHTML = call.callMoment === null ? `<button data-id="${call.id}" class="waves-effect waves-light btn deep-purple darken-4" onclick="callClick(event)"><i class="material-icons right">call</i>call</button>` : call.callMoment;
            tr.appendChild(td);
            tableBody.appendChild(tr);
        }
    }
}

function insertButtonClick() {
    const nameInput = document.querySelector('[name="user-name"]');
    if (!nameInput) {
        throw '[name="user-name"] not found';
    }
    const phoneInput = document.querySelector('[name="user-phone"]');
    if (!phoneInput) {
        throw '[name="user-phone"] not found';
    }

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
        if (j.last_id.length !== 0) {
            const lastId = document.getElementById("lastId");
            lastId.textContent = `Last added id: ${j.last_id}`;
        }
    });
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
        // nameError.setAttribute("data-error", "Ім'я не може бути порожнім");
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

function callClick(e) {
    const userId = e.target.getAttribute("data-id")
    const result = confirm(`Do you really want to call the user:${userId}?`);
    if (result) {
        fetch(window.location.href, {
            method: "LINK",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: userId})
        }).then(r => r.json())
            .then(j => {
                if (j.status === "204") {
                    window.location.reload();
                }
            })
    }
    //alert('CALLING id= ' + e.target.getAttribute("data-id"));
}