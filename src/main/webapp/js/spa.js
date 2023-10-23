/* Script for SPA page + Auth functions */
document.addEventListener("DOMContentLoaded", () => {
    M.Modal.init(document.querySelectorAll('.modal'), {
        opacity: .5,
        inDuration: 200,
        outDuration: 200,
        onOpenStart: onModalopens,
    });
    const authSignInButton = document.getElementById("auth-sign-in");
    if (authSignInButton) {
        authSignInButton.addEventListener('click', authSignInButtonClick)
    } else {
        console.error("#auth-sign-in not found");
    }
});

function onModalopens() {
    [authLogin, authPassword, authMessage] = getAuthElements();
    authLogin.value = '';
    authPassword.value = '';
    authMessage.innerText = '';
}

function authSignInButtonClick() {
    [authLogin, authPassword, authMessage] = getAuthElements();
    if (authLogin.value.length === 0) {
        authMessage.innerText = "Логін не може бути порожнім"
    }
    const appContext = window.location.pathname.split('/')[1];
    fetch(`/${appContext}/auth?login=${authLogin.value}&password=${authPassword.value}`, {
        method: 'GET'
    }).then(console.log);
}

function getAuthElements() {
    const authLogin = document.getElementById("auth-login");
    if (!authLogin) {
        throw '#auth-login not found';
    }
    const authPassword = document.getElementById("auth-password");
    if (!authPassword) {
        throw '#auth-password not found';
    }
    const authMessage = document.getElementById("auth-message");
    if (!authMessage) {
        throw '#auth-message not found';
    }
    return [authLogin, authPassword, authMessage];
}
