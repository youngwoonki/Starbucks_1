const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder',''); // focus의 반대로 줄때 blur
});



const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //배지 숨기기
    // badgeEl.style.display = 'none';
    //gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity:0,
      display:'none'
    });
    // to-top버튼 보이기
    gsap.to('#to-top', .2, {
      x:0
    });
  }
  else{
    //배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity:1,
      display:'block'
    });
    // to-top버튼 숨기기
    gsap.to('#to-top', .2, {
      x:100
    });
  }
},300));

const toTopEl = document.querySelector('#to-top');

toTopEl.addEventListener('click',function(){
  gsap.to(window, .7, {
    scrollTo: 0 // 좌표를 뜻함.
  });
});

// 0.3초마다 function함수가 실행되게 한다. scroll은 과부하가 많이 걸릴 수 있기 때문에 이 라이브러리(html에 lodash cdn자바스크립트 넣어주고)를 사용한다.
// _.throttle(함수, 시간)
// 구글에 lodash cdn 검색 후 첫번째 페이지 들어가서 첫번째꺼 copy script tag하고 html에 넣어주면됨.

//html에서 gsap cdn은 부드럽게 없어지고 나타나게 하는 애니메이션 라이브러리.
//gsap.to(요소, 지속시간, 옵션)
// 구글에 gsap cdn 검색 후 첫번째 페이지 들어가서 첫번째꺼 copy script tag하고 html에 넣어주면됨.

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  //gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay:(index + 1) * .7, // 0,7 -> 1.4 -> 2.1 이런 순서로. 지연시간
    opacity:1
  });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal',
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보인다.
  loop: true, // 반복 재생 여부
  pagination:{ // 페이지 번호 사용 여부
    el : '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable : true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation:{ //슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', //이전 버튼 선택자
    nextEl: '.promotion .swiper-next', //다음 버튼 선택자
  }
});

new Swiper('.awards .swiper-container', {
  autoplay:true,
  loop:true,
  spaceBetween:30,
  slidesPerView:5,
  navigation:{ //슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', //이전 버튼 선택자
    nextEl: '.awards .swiper-next', //다음 버튼 선택자
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click',function(){
  isHidePromotion = !isHidePromotion; //반대의 값으로 줄때 !를 붙혀서
  if(isHidePromotion){
    //숨김 처리!!
    promotionEl.classList.add('hide');
  } else{
    //보임 처리!!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
  //gsap.to(요소, 지속시간, 옵션)
  gsap.to(
    selector, // 선택자
    random(1.5,2.5), //애니메이션 동작 시간
    { //옵션
      y: size,
      yoyo: true,//한번동작했던거를 반대로 동작하겠다. 이걸 넣어주면 위로도 올라오고 그런다.
      repeat: -1, //-1이 무한반복하겠다는 값
      ease: Power1.easeInOut, //easing
      delay: random(0,delay)
    }
  );
}
floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3',1.5,20);

// ScrollMagic cdn
// 요소가 화면에 보여짐 여부에 따른 요소 관리

// 관리할 요소를 검색
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement:spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부를 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스를 추가한다.
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
});

const thisYear = document.querySelector('footer .this-year')
thisYear.textContent = new Date().getFullYear();

// TO-TOP BUTTON
