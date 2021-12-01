const menu = document.querySelector('.navbar__ham');
const navbar = document.querySelector('.navbar__links');
const btn_learnmore = document.querySelector('.learn_more');
const section1 = document.querySelector('#feature');
menu.addEventListener('click', ()=>{
    menu.classList.toggle('toggle-btn');
    navbar.classList.toggle('navbar__open');
});

function smoothScroll(x, duration){
    var target = document.querySelector(x);
    var targetPosition = target.getBoundingClientRect().top;
    // console.log(targetPosition);
    // window.scrollTo(0, targetPosition.top + window.pageYOffset);







    var startPosition = window.pageYOffset; //0
    var distance = targetPosition + window.pageYOffset - startPosition;
    var startTime = null;
    function animation(currentTime){
        if(startTime===null) startTime = currentTime;
        var timeElapse  = currentTime - startTime;
        console.log("Current: ", currentTime);  
        var run = ease(timeElapse, startPosition, distance, duration);
        console.log("KQ: ", run);
        window.scrollTo(0, run);
        if(timeElapse<duration) requestAnimationFrame(animation);
    }
    function ease (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
        t--;
        return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    };       
    requestAnimationFrame(animation);
}
//smoothScroll('#feature', 1000);
btn_learnmore.addEventListener('click', function(e){
    e.preventDefault();
    smoothScroll('#feature',2000);
});

window.addEventListener('scroll', function(){
    console.log('Top', section1.getBoundingClientRect().top);
    console.log('Windown', window.pageYOffset);
});