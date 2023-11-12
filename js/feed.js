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


document.getElementById('filter-open-btn').addEventListener('click', function() {
    document.getElementById('filter-container').style.display = 'block';
    document.getElementById('form-user').style.display = 'none';
    document.getElementById('form-user').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('filter-container').style.opacity = '1';
    }, 100);
    document.getElementById('menu-back-btn').style.display = 'none';

})

document.getElementById('filter-close-btn').addEventListener('click', function() {
    document.getElementById('filter-container').style.display = 'none';
    document.getElementById('filter-container').style.opacity = '0';
    document.getElementById('form-user').style.display = 'block';
    setTimeout(() => {
        document.getElementById('form-user').style.opacity = '1';
    }, 100);
    document.getElementById('menu-back-btn').style.display = 'block';
    
})


function fun(){
    document.getElementById('range-value').innerHTML = document.getElementById('myRange').value + 'м';
}

var $add = document.getElementsByClassName('add')[0];
var $form = document.getElementsByClassName('interests-container')[0];
$add.addEventListener('click', function(event) {
  
  var $div = document.createElement('div');
  var $input = document.createElement('input');
  $input.type = 'text';
  $input.placeholder = 'Увлечение';
  $input.classList.add('interests-item');
  $div.classList.add('interests-item')
  $form.insertBefore($div, $add);
  $div.appendChild($input);
});
