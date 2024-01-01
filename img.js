function showImage(img) {
    document.getElementById("overlay-image").src = img.src;
    document.getElementById("overlay").style.display = "flex";
}

function hideImage() {
    document.getElementById("overlay").style.display = "none";
}