 window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
    document.getElementById("navigationBar").style.display = "block";
});

var myNav = document.getElementById('navigationBar');
window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop >80) {
//     document.getElementById("navigationBar").style.padding = "6px";
//     document.getElementById("navigationBar").style.backgroundImage = "1px 0 32px 0 rgba(0,0,0,.14)";
//     // $(".nav-link").css("color","#000000");
//     // $(".navbar-toggler").css("color","#000000");
//     // document.getElementById("navigationBar").style.backgroundColor = "#000";
//      document.getElementById("underline").style.backgroundColor = "#000";
     
//   } else {
//     document.getElementById("navigationBar").style.padding = "6px";
//      document.getElementById("navigationBar").style.backgroundColor = "transparent";
//      document.getElementById("navigationBar").style.borderBottom = "none";
//      document.getElementById("navigationBar").style.boxShadow = "none";

//     //  $(".navbar-toggler").css("color","#000000");
//     //  $(".nav-link").css("color","#000000");
//         myNav.classList.remove("nav-colored");
//   }
// }

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop >80) {
//     document.getElementById("navigationBar").style.padding = "6px";
//     document.getElementById("navigationBar").style.backgroundImage = "1px 0 32px 0 rgba(0,0,0,.14)";
//     // $(".nav-link").css("color","#000000");
//     // $(".navbar-toggler").css("color","#000000");
//     // document.getElementById("navigationBar").style.background = "linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 40%, #c2ff00 150%)";
//      document.getElementById("underline").style.backgroundColor = "#000";
     
//   } else {
//     document.getElementById("navigationBar").style.padding = "6px";
//     //  document.getElementById("navigationBar").style.background = "transparent";
//      document.getElementById("navigationBar").style.borderBottom = "none";
//      document.getElementById("navigationBar").style.boxShadow = "none";

//     //  $(".navbar-toggler").css("color","#000000");
//     //  $(".nav-link").css("color","#000000");
//         myNav.classList.remove("nav-colored");
//   }
// }

$(document).ready(function() {
    $("#news-slider").owlCarousel({
        items : 2,
        itemsDesktop : [1199,2],
        itemsMobile : [600,1],
        pagination :true,
        autoPlay : true
    });
    
    $("#news-slider2").owlCarousel({
        items:3,
        itemsDesktop:[1199,2],
        itemsDesktopSmall:[980,2],
        itemsMobile:[600,1],
        pagination:false,
        navigationText:false,
        autoPlay:true
    });
    
    
});

 const splitToggle = document.getElementById('splitToggle');
        const splitOverlay = document.getElementById('splitOverlay');
        splitToggle.onclick = () => {
            splitToggle.classList.toggle('active');
            splitOverlay.classList.toggle('active');
            splitOverlay.style.pointerEvents = splitOverlay.classList.contains('active') ? 'auto' : 'none';
        }


    

// sidebar 
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});


/*------------------------------
        Album Cover Slider
--------------------------------*/
//start added by Chase
var a = document.getElementsByTagName("a");
var cfImg = document.getElementsByClassName("coverflow__image")

var scaleI = 0;
for (scaleI; scaleI < a.length; scaleI++) {
  if (scaleI === 3) {
    continue;
  } else {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
}

function prevDef(e) {
  e.preventDefault();
}

function forScale(coverflowPos) {
  for (scaleI = 0; scaleI < a.length; scaleI++) {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
  for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
    if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
      cfImg[scaleI].parentElement.style.cursor = "pointer";
      cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
    }
  }
}
//end added by Chase

function setupCoverflow(coverflowContainer) {
  var coverflowContainers;

  if (typeof coverflowContainer !== "undefined") {
    if (Array.isArray(coverflowContainer)) {
      coverflowContainers = coverflowContainer;
    } else {
      coverflowContainers = [coverflowContainer];
    }
  } else {
    coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName('coverflow'));
  }

  coverflowContainers.forEach(function(containerElement) {
    var coverflow = {};
    var prevArrows, nextArrows;

    //capture coverflow elements
    coverflow.container = containerElement;
    coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName('coverflow__image'));
    coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

    //set indicies on images
    coverflow.images.forEach(function(coverflowImage, i) {
      coverflowImage.dataset.coverflowIndex = i + 1;
    });

    //set initial position
    coverflow.container.dataset.coverflowPosition = coverflow.position;

    //get prev/next arrows
    prevArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("prev-arrow"));
    nextArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("next-arrow"));

    //add event handlers
    function setPrevImage() {
      coverflow.position = Math.max(1, coverflow.position - 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //call the functin forScale added
      forScale(coverflow.position);
    }

    function setNextImage() {
      coverflow.position = Math.min(coverflow.images.length, coverflow.position + 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //call the function Chase added
      forScale(coverflow.position);
    }

    function jumpToImage(evt) {
      coverflow.position = Math.min(coverflow.images.length, Math.max(1, evt.target.dataset.coverflowIndex));
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //start added by Chase
      setTimeout(function() {
        forScale(coverflow.position);
      }, 1);
      //end added by Chase
    }

    function onKeyPress(evt) {
      switch (evt.which) {
        case 37: //left arrow
          setPrevImage();
          break;
        case 39: //right arrow
          setNextImage();
          break;
      }
    }
    prevArrows.forEach(function(prevArrow) {
      prevArrow.addEventListener('click', setPrevImage);
    });
    nextArrows.forEach(function(nextArrow) {
      nextArrow.addEventListener('click', setNextImage);
    });
    coverflow.images.forEach(function(image) {
      image.addEventListener('click', jumpToImage);
    });
    window.addEventListener('keyup', onKeyPress);
  });
}

setupCoverflow();


// new js

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.innerText = '0';
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 100;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(update, 50);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
});

//parallax effect
// var swiper = new Swiper(".myTimelineSwiper", {
//   loop: true,
//   speed: 1400,
//   parallax: true,
//   grabCursor: true,
//   slidesPerView: 1,
//   centeredSlides: true,
//   effect: "slide",
//   autoplay: {
//     delay: 4500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

//page effect
var swiper = new Swiper(".myTimelineSwiper", {
  loop: true,
  effect: "creative",
  grabCursor: true,
  speed: 1000,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
      rotate: [0, 100, 0],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
      rotate: [0, -100, 0],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".myTestimonials", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 40,
    slidesPerView: 1,
    speed: 900,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
//faq2
  document.querySelectorAll('.faq-item').forEach(item=>{
  item.addEventListener('click', ()=>{
    item.classList.toggle('active');
  });
});
// faq 3
document.querySelectorAll('.faq-card').forEach(card=>{
  card.addEventListener('click', ()=> card.classList.toggle('active'));
});

