document.getElementById('more-info-btn').addEventListener("click",function() {
    document.getElementById('form-user-choice').style.display = 'none';
    document.getElementById('form-user-description').style.display = 'block';
    setTimeout(() => {
        document.getElementById('form-user-description').classList.add('active')
    }, 100);
   
})
document.getElementById('more-info-btn-2').addEventListener("click",function() {
    document.getElementById('form-user-choice').style.display = 'none';
    document.getElementById('form-user-description').style.display = 'block';
    setTimeout(() => {
        document.getElementById('form-user-description').classList.add('active')
    }, 100);
})


document.getElementById('more-info-btn-close').addEventListener("click",function() {
    document.getElementById('form-user-choice').style.display = 'block';
    document.getElementById('form-user-description').style.display = 'none';
    setTimeout(() => {
        document.getElementById('form-user-description').classList.remove('active')
    }, 100);
    
})

document.getElementById('like-btn').addEventListener("click",function() {
    document.getElementById('form-user').classList.add('animation-like');
    setTimeout(() => {
        document.getElementById('form-user').style.display = 'none';
    }, 300);
})

document.getElementById('dislike-btn').addEventListener("click",function() {
    document.getElementById('form-user').classList.add('animation-dislike')
    setTimeout(() => {
        document.getElementById('form-user').style.display = 'none';
    }, 300);
})

document.getElementById('superlike-btn').addEventListener("click", function() {
    document.getElementById('error-modal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('error-modal').style.opacity = '1';
    }, 100);
    setTimeout(() => {
        document.getElementById('error-modal').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('error-modal').style.display = 'none';
        }, 100);
        

    }, 2800);
})