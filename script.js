'use strict';

const btnFindOutMore = document.querySelector(".btn--find-out-more");
const sectionAbout = document.querySelector("#chapter-about");
const navbar = document.querySelector('.navbar');


// Button FIND OUT MORE
btnFindOutMore.addEventListener("click", function (e) {
    sectionAbout.scrollIntoView({ behavior: "smooth" });
  });


// Page navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });


// Navbar fade animation
const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".navbar").querySelectorAll(".nav__link");
      const logo = link.closest(".navbar").querySelector(".nav__logo");
  
      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  navbar.addEventListener("mouseover", handleHover.bind(0.5));
  navbar.addEventListener("mouseout", handleHover.bind(1));


// Sticky navigation
const stickyNavigation = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
};

const header = document.querySelector(".header");
const navHeight = navbar.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
