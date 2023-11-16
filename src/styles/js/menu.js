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
    document.getElementById('menu-back-btn').style.display = 'none';
    document.getElementById('menu-back-btn').style.opacity = '0';

    document.getElementById('main-logo').style.display = 'flex'
})

document.getElementById('img-settings').addEventListener('click', function() {
   
    document.getElementById('img-settings-container').classList.toggle('on')
    setOpacity("img-settings-container");
})