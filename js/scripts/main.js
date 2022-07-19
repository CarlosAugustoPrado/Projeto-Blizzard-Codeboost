// Swiper da sessão principal
var slide_thumbnail = new Swiper(".slide-thumbnail", {
    slidesPerView: 5,
    direction: 'vertical',
    spaceBetween: 20,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        direction: 'horizontal',
      },
      1150: {
        direction: 'vertical',
      }
    }
});

const progressSlide = document.querySelector('.js-progress')

var slide_hero = new Swiper(".slide-principal", {
  effect: 'fade',
  thumbs: {
    swiper: slide_thumbnail
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  on: {
    init: function() {
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('animate');
      progressSlide.classList.add('active');
    },
    slideChangeTransitionStart: function() {
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('active');
    },  
    slideChangeTransitionEnd: function() {
      progressSlide.classList.add('animate');
    },
  }
});


//Código dos filtros da sessão de jogos
const allFilters = document.querySelectorAll('.js-nav-games li a');
const tabPane = document.querySelectorAll('.tab-pane-games');

allFilters.forEach((filter, index) => {
  filter.addEventListener('click', (event) => {
    event.preventDefault();

    allFilters.forEach (item => {
      item.classList.remove('active');
    })

    tabPane.forEach(tab => {
      tab.classList.remove('active');
    })

    tabPane[index].classList.add('active');
    filter.classList.add('active'); 
  })
})


// Código do Modal
const btnOpenModal = document.querySelector('.js-open-modal');
const btnFecharModal = document.querySelector('.js-close');

btnOpenModal.addEventListener('click', (event) => {
  event.preventDefault();
  let tagHtml = document.documentElement;
  tagHtml.classList.add('show-modal');
})

btnFecharModal.addEventListener('click', () => {  
  let tagHtml = document.documentElement;
  tagHtml.classList.remove('show-modal');
})


// Código dos dropdowns do menu
const btnMenu = document.querySelectorAll('.js-btn-menu');
const menuSite = document.querySelectorAll('.js-menu');

btnMenu.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault(); 

    menuSite.forEach(itemMenu => {
      itemMenu.classList.remove('active');
      itemMenu.addEventListener('mouseleave', () => {
        itemMenu.classList.remove('active');
        btnMenu.forEach(itemBtn => {
          itemBtn.classList.remove('active');
        })
        
      })
    })

    btnMenu.forEach(itemBtn => {
      itemBtn.classList.remove('active');
    })
    
    btn.classList.add('active');
    menuSite[index].classList.add('active');
    
  })
})


// Código do menu mobile 

const btnMenuMobile = document.querySelector('.btn-mobile');
const menuMobile = document.querySelector('.js-menu-mobile');
const closeMenuMobile = document.querySelector('.js-close-mobile')

function openMenuMobile() {  
  menuMobile.classList.add('active');  
}
function fecharMenuMobile () {
  menuMobile.classList.remove('active');
}
btnMenuMobile.addEventListener('click', openMenuMobile);
closeMenuMobile.addEventListener('click', fecharMenuMobile);




