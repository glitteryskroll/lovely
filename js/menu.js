async function setOpacity(elementid) {
    var el = document.getElementsByClassName(elementid)[0];
    var op = 0;
    while (op <= 1) {
        (function(_op) {
            setTimeout(function() { el.style.opacity = _op; }, 60 + op * 10);
        })(op);
        op += 0.1;
    }
}



document.getElementById('settings-btn').addEventListener("click",function() {
    
    document.getElementById('settings').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('menu').style.opacity = '0';
    document.getElementById('img-settings').style.display = 'block';
    document.getElementById('menu-back-btn').style.display = 'block';
    document.getElementById('main-logo').style.display = 'none'

    setOpacity("settings-list");
    setOpacity("menu-back-btn-container");
    setOpacity("img-settings");
})

document.getElementById('menu-back-btn').addEventListener('click', function() {
    document.getElementById('settings').style.display = 'none';
    document.getElementById('settings').style.opacity = '0';
    document.getElementById('img-settings').style.display = 'none';
    document.getElementById('img-settings').style.opacity = '0';
    document.getElementById('menu').style.display = 'block';
    setTimeout(() => {
        document.getElementById('menu').style.opacity = '1';
    }, 100);
    document.getElementById('menu-back-btn').style.display = 'none';
    document.getElementById('menu-back-btn').style.opacity = '0';

    document.getElementById('main-logo').style.display = 'flex'
})


document.getElementById('reciprocity-open-btn').addEventListener("click",function() {
    document.getElementById('reciprocity').style.display= 'flex';
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('profile-container').style.opacity = '0';
    document.getElementById('reciprocity-back-btn').style.display = 'block';
    document.getElementById('reciprocity-back-btn').style.opacity = '1';
    setTimeout(() => {
        document.getElementById('reciprocity').style.opacity = '1';
    }, 100);
    document.getElementById('main-logo').style.display = 'none';

})


document.getElementById('reciprocity-back-btn').addEventListener('click', function() {
    document.getElementById('profile-container').style.display = 'block';
    setTimeout(() => {
        document.getElementById('profile-container').style.opacity = '1';
    }, 100);
    document.getElementById('reciprocity').style.display= 'none';

    document.getElementById('reciprocity').style.opacity= '0';
    document.getElementById('reciprocity-back-btn').style.display = 'none';
    document.getElementById('reciprocity-back-btn').style.opacity = '0';
    document.getElementById('main-logo').style.display = 'flex';
})


document.getElementById('img-settings').addEventListener('click', function() {
   
    document.getElementById('img-settings-container').classList.toggle('on')
    setOpacity("img-settings-container");
})

var $add = document.getElementsByClassName('add')[0];
var $form = document.getElementsByClassName('interests-container')[0];
$add.addEventListener('click', function(event) {
  var $input = document.createElement('input');
  var $div = document.createElement('div');
  $input.type = 'text';
  $input.placeholder = 'Увлечение';
  $input.classList.add('interests-item');
  $div.classList.add('interests-item')
  $form.insertBefore($div, $add);
  $div.insertBefore($input, $div);
});


document.getElementById('open-user-profile-1').addEventListener('click', function() {
    document.getElementById('user-profile-container').style.display = 'block';
    setTimeout(() => {
        document.getElementById('user-profile-container').style.opacity = '1';
    }, 100);
    document.getElementById('user-profile-back-btn').style.display = 'block';
    document.getElementById('user-profile-back-btn').style.opacity = '1';
    document.getElementById('reciprocity').style.display= 'none';
    document.getElementById('reciprocity').style.opacity= '0';
    document.getElementById('reciprocity-back-btn').style.display = 'none';
    document.getElementById('reciprocity-back-btn').style.opacity = '0';
})

document.getElementById('user-profile-back-btn').addEventListener('click', function() {
    document.getElementById('user-profile-container').style.display = 'none';
    document.getElementById('user-profile-container').style.opacity = '0';
    document.getElementById('reciprocity').style.display= 'flex';
    setTimeout(() => {
        document.getElementById('reciprocity').style.opacity = '1';
    }, 100);
    document.getElementById('reciprocity-back-btn').style.display = 'block';
    document.getElementById('reciprocity-back-btn').style.opacity = '1';
})


