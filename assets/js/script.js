$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 00) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});




// Carousel
$(document).ready(function () {
  simpleCarousel($(".simple-carousel"), 6000);
});

function simpleCarousel(carousel, intervalTime = 6000) {
  var slideCount = $(carousel).find("ul li.slide").length;
  var activeSlide = 0;

  function showSlide() {
    $(carousel)
      .find("ul li.slide")
      .each(function (index) {
        if (index == activeSlide) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      });
  }

  setInterval(function () {
    moveRight();
  }, intervalTime);

  function moveLeft() {
    activeSlide -= 1;
    if (activeSlide < 0) {
      activeSlide = slideCount - 1;
    }
    showSlide();
  }

  function moveRight() {
    activeSlide += 1;
    if (activeSlide >= slideCount) {
      activeSlide = 0;
    }
    showSlide();
  }

  $(carousel)
    .find("a.control_prev")
    .click(function () {
      moveLeft();
    });

  $(carousel)
    .find("a.control_next")
    .click(function () {
      moveRight();
    });
}



//SERVICE

 function changeAtiveTab(event, tabID) {
   let element = event.target;
   while (element.nodeName !== "A") {
     element = element.parentNode;
   }
   ulElement = element.parentNode.parentNode;
   aElements = ulElement.querySelectorAll("li > a");
   tabContents = document
     .getElementById("tabs-id")
     .querySelectorAll(".tab-content > div");
   for (let i = 0; i < aElements.length; i++) {
     aElements[i].classList.remove("text-white");
     aElements[i].classList.remove("bg-teal-400");
     aElements[i].classList.add("text-teal-400");
     aElements[i].classList.add("bg-white");
     tabContents[i].classList.add("hidden");
     tabContents[i].classList.remove("block");
   }
   element.classList.remove("text-teal-400");
   element.classList.remove("bg-white");
   element.classList.add("text-white");
   element.classList.add("bg-teal-400");
   document.getElementById(tabID).classList.remove("hidden");
   document.getElementById(tabID).classList.add("block");
 }




 //Service

 const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = [];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }

  // Construct the carousel navigation
  // setNav() {
    // galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    // this.carouselArray.forEach(item => {
    //   const nav = galleryContainer.lastElementChild;
    //   nav.appendChild(document.createElement('li'));
    // }); 
  // }s

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();

        if (control.className == 'gallery-controls-add') {
          const newItem = document.createElement('img');
          const latestItem = this.carouselArray.length;
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length)+1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem,{
            className: 'gallery-item',
            src: ``
          });
          newItem.setAttribute('data-index', this.carouselArray.length+1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();

        } else {
          this.setCurrentState(control);
        }

      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
// exampleCarousel.setNav();
exampleCarousel.useControls();