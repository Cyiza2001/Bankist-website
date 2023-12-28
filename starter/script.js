'use strict';

///////////////////////////////////////
// select elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const btnNavLink = document.querySelector(".nav__links");
const btnSections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header =  document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const imageTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener("click",openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////////
//////Functions
const handleFunction=function(e){

  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');

    const logo=link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el !==link) el.style.opacity=this;
    })
    
    logo.style.opacity=this;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////EventListners

btnScroll.addEventListener('click', function(e){
  e.preventDefault();
 
  section1.scrollIntoView({ behavior:'smooth'});
});
btnNavLink.addEventListener('click',function(e){
  e.preventDefault();
  
    const id = e.target.getAttribute('href');
  document.querySelectorAll(id).forEach(function (el){
    el.scrollIntoView({behavior:'smooth'})});
});

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //add active classes
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});
nav.addEventListener('mouseover',handleFunction.bind(0.5)
);
nav.addEventListener('mouseout',
  handleFunction.bind(1)
);

const obsCallBack = function(entries){
const [entry] = entries;
if(!entry.isIntersecting) nav.classList.add('sticky');
else nav.classList.remove('sticky');
}
const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
  root : null,
  threshold :0,
  rootMargin: `-${navHeight}px`,
}
const observer = new IntersectionObserver(obsCallBack , obsOptions);
observer.observe(header);
const revealSection = function(entries , observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(section);
  

}
const observeSection = new IntersectionObserver (revealSection , {
  root: null,
  threshold: 0.15,
})

allSections.forEach(function(section){
  observeSection.observe(section);
  //section.classList.add('section--hidden');
  
})
const loadImage = function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting)return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);

}
const observeImage = new IntersectionObserver(loadImage, {
  root: null,
  threshold:0,
  rootMargin:'200px',

})
imageTargets.forEach(img => observeImage.observe(img));

const sliderFunction = function (){
let curSlide = 0;

const maxSlide = slides.length;


//function to move into slides
const goToSlide = function (slide){
  slides.forEach((s , i) => s.style.transform =`translateX(${100*(i-slide)}%)`);
}

//change slide function
const changeSlide = function (s){
  goToSlide(s);
  activateDots(s);
}
//next slide function
 const nextSlide = function(){

  if(curSlide=== maxSlide-1){
    curSlide =0;
 }
    else {
      curSlide++;
     }
   changeSlide(curSlide);
  }
  //previous slide function
  const prevSlide=  function(){

    if(curSlide===0) {
      curSlide = maxSlide-1;
    }
      else {
 
        curSlide--;
       }
       changeSlide(curSlide);
    }
const createDots = function(){
    slides.forEach(function(_, i){
      dotsContainer.insertAdjacentHTML('beforeend', 
      `<button class="dots__dot" data-slide="${i}"></button>`
      )
    })};
const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach( dot =>dot.classList.remove('dots__dot--active')
)
  document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add('dots__dot--active')
}

//initial status
const initial = function (){
  createDots();
  changeSlide(0);
}
initial();
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);
document.addEventListener('keydown',function(e){
if (e.key === 'ArrowLeft') prevSlide();
if(e.key === 'ArrowRight') nextSlide();
});
dotsContainer.addEventListener('click', function (e){
if(e.target.classList.contains('dots__dot')){
const {slide} = e.target.dataset;
changeSlide(Slide);
}

})}

sliderFunction();











 