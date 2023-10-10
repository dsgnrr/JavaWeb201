document.addEventListener('DOMContentLoaded', function () {
    // var elems = document.querySelectorAll('.modal');
    M.Modal.init(document.querySelectorAll('.modal'), {
        opacity: .5,
        inDuration: 200,
        outDuration: 200
    });
});