const btn_ham = document.querySelector('.navbar__ham');
const navbar = document.querySelector('.navbar__links');
const learn_more = document.querySelector('.learn_more');
btn_ham.addEventListener('click', ()=>{
    btn_ham.classList.toggle('toggle-btn');
    navbar.classList.toggle('navbar__open');
});
function scrollSmooth(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var startTime = null;
    function animation(currentTime){
        if(startTime ===null) startTime = currentTime;
        var timeElapse = currentTime - startTime;
        var run = ease(timeElapse, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if(timeElapse < duration){
            requestAnimationFrame(animation);
        }
    }
    var ease = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };
    requestAnimationFrame(animation);
}
//scrolling
learn_more.addEventListener('click', (e)=>{
    e.preventDefault();
    scrollSmooth('#feature', 1000);
});

const links = document.querySelectorAll('.navbar__link a');
navbar.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.parentElement.classList.contains('navbar__link')){
        scrollSmooth(`${e.target.getAttribute('href')}`, 1000);
    }
});
//updown
const random =(min, max)=> Math.floor(Math.random()*(max-min+1) + min);
const randomColor = ()=>`rgb(${random(0, 255)}, ${random(0, 255)},${random(0, 255)})`;
const title = document.querySelector('h1');
// console.dir(title);
// console.log(title.childNodes);
// console.log(title.children);
// console.log(title.querySelectorAll('span'));
// [...title.querySelectorAll('span')].forEach(function(el){
//     el.style.backgroundColor = randomColor();
// });


//going up ward
// console.log(title.parentElement);
// console.log(title.closest('.container'));
// title.closest('.container').style.backgroundColor = randomColor();


//going sbling
// console.log(title.previousElementSibling);
// console.log(title.nextElementSibling);
const list = document.querySelector('.tabbed__desc__list');
const load = list.querySelector('.tabbed__desc__list__load');
const list_tabs = document.querySelector('.tabbed__buttons');
const content_details = document.querySelectorAll('.tabbed__desc__container__detail');
const buttons = list_tabs.querySelectorAll('.tabbed__button__item');
list.addEventListener('click', (e)=>{
    load.style.animation = 'loading 1s 2 forwards';
});
load.addEventListener('animationend', (e)=>{
    list_tabs.classList.toggle('hidden');
    e.target.style.animation = "";
});
list_tabs.addEventListener('click', (e)=>{
    const target = e.target;
    console.log(target);
    if(target){
       let button = target.closest('.tabbed__button__item');
        buttons.forEach(btn=>btn.classList.remove("active__button"));
        button.classList.add("active__button");
        content_details.forEach(content =>content.classList.remove('open__detail'));
        content_details[parseInt(button.dataset.tab)-1].classList.add('open__detail');
    }
});


//face animation
const nav = document.querySelector('nav.container');

function fadeMenu(e){
    if(e.target.classList.contains('link')){
        const link  = e.target;
        const siblings = link.closest('.container').querySelectorAll('.link');
        const logo = link.closest('.container').querySelector('.navbar__logo');
        siblings.forEach(sib=>{
            if(sib!== link){
                sib.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
}
nav.addEventListener('mouseover', fadeMenu.bind(0.5));
nav.addEventListener('mouseout', fadeMenu.bind(1));


//stickey header when scroll
// const header = document.querySelector('header');
// const initialValue = header.getBoundingClientRect().height;
// const banner = document.querySelector('#banner');
// function callback(entries){
//     const [first] = entries;
//     if(!first.isIntersecting) {
//         header.classList.add('sticky');
//     }
//     else {
//         header.classList.remove('sticky');
//     }
    
// }
// const optionServer = {
//     root: null,
//     threshold: 0,
//     rootMargin: `${-initialValue}px`
// }
// const headerServer = new IntersectionObserver(callback, optionServer);
// headerServer.observe(banner);



//animation 
// var feature = document.querySelector('#feature');
// function scrollAnimation(){
//     var topFeature = feature.getBoundingClientRect().top;
//     var positionScreen = window.innerHeight/2;
//     console.log(topFeature, positionScreen);
//     if(positionScreen > topFeature){
//         feature.classList.remove('feature__hidden');
//     }
// }
// window.addEventListener('scroll', scrollAnimation);
const sections = document.querySelectorAll('section');
function revealSection(entries, observe){
    const [first] = entries;
    console.log(first);
    if(!first.isIntersecting) return;
    first.target.classList.remove('feature__hidden');
    observe.unobserve(first.target);
}
const sectionScroll = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
console.log(sections);
sections.forEach(section=>{
    if(section!=sections[sections.length -1]){
        sectionScroll.observe(section);
        section.classList.add('feature__hidden');
    }
});
// const allImages = document.querySelectorAll('img[data-src]');
// function cbLoading(entries, observe){
//     const [entry] = entries;
//     if(!entry.isIntersecting) return;
//     entry.target.src = entry.target.dataset.src;
//     entry.target.addEventListener('load', function(){
//         entry.target.classList.remove('lazy-loading');
//     });
//     observe.unobserve(entry.target);
// }
// const loadingOption = {
//     root: null,
//     threshold: 0
// }
// const loadingImage = new IntersectionObserver(cbLoading, loadingOption);
// allImages.forEach(image=>{
//     loadingImage.observe(image);
//     image.classList.add('lazy-loading');
// })

const slide_container = document.querySelector('.slide__container');
const slide__container__details = document.querySelectorAll('.slide__container__detail');
function slideDown(e){
    if(e.target.closest('.arrow__down')){
        const target = e.target.parentElement;
        var parent = target.closest('.slide__container__detail');
        var nextSibling = parent.nextElementSibling;
        if(!parent.nextElementSibling.classList.contains('slide__container__detail')){
            nextSibling = slide__container__details[0];
        }
        if(nextSibling){
            slide__container__details.forEach(sli=>{
                sli.classList.add('slide__hidden__down');
            })
            nextSibling.classList.remove("slide__hidden__down");
        }
    }
}
slide_container.addEventListener('click', slideDown);

