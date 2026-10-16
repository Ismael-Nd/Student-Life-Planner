const previewLink = document.querySelector(".preview-link");
const role = document.body.dataset.role;

previewLink.addEventListener("click", function(event) {
    event.preventDefault();

    sessionStorage.setItem("role", role);
    window.location.href = "index.html";
});