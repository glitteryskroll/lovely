document.getElementById('next-btn').addEventListener("click",function() {
    document.getElementById("modal-container").classList.remove("visible")
    document.getElementById("modal-container-2").classList.add("animation")
    document.getElementById("modal-container-2").classList.add("visible")
    
    
})
document.getElementById('next-btn-2').addEventListener("click",function() {
    document.getElementById("modal-container-2").classList.remove("visible")
    document.getElementById("modal-container-2").classList.remove("animation")

    document.getElementById("modal-container-3").classList.add("animation")

    document.getElementById("modal-container-3").classList.add("visible")
})

document.getElementById('next-btn-3').addEventListener("click",function() {
    document.getElementById("modal-container-3").classList.remove("visible")
    document.getElementById("modal-container-3").classList.remove("animation")
    document.getElementById("modal-container-4").classList.add("animation")
    document.getElementById("modal-container-4").classList.add("visible")
})

document.getElementById('next-btn-4').addEventListener("click",function() {
    document.getElementById("modal-container-4").classList.remove("visible")
    document.getElementById("modal-container-4").classList.remove("animation")
    document.getElementById("modal-container-5").classList.add("animation")
    document.getElementById("modal-container-5").classList.add("visible")
})


document.getElementById('back-btn').addEventListener("click",function() {
    document.getElementById("modal-container").classList.add("visible")
    document.getElementById("modal-container-2").classList.remove("animation")
    document.getElementById("modal-container-2").classList.remove("visible")
})

document.getElementById('back-btn-2').addEventListener("click",function() {
    document.getElementById("modal-container-2").classList.add("visible")
    document.getElementById("modal-container-2").classList.add("animation")
    document.getElementById("modal-container-3").classList.remove("visible")
})

document.getElementById('back-btn-3').addEventListener("click",function() {
    document.getElementById("modal-container-3").classList.add("visible")
    document.getElementById("modal-container-3").classList.add("animation")
    document.getElementById("modal-container-4").classList.remove("visible")
})

document.getElementById('back-btn-4').addEventListener("click",function() {
    document.getElementById("modal-container-4").classList.add("visible")
    document.getElementById("modal-container-4").classList.add("animation")
    document.getElementById("modal-container-5").classList.remove("visible")
})

let wrapper = document.querySelector('.img__wrapper'); 


function download(input){
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        let img = document.createElement('img');
        wrapper.appendChild(img);
        img.src = reader.result;
    }
}