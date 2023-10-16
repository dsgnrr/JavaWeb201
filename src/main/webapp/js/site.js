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

function createButtonClick() {
    fetch(window.location.href, {
        method: 'PUT'
    }).then(r => r.json()).then(j => {
        console.log(j);
    });
}