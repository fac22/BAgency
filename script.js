/* eslint-disable strict */

'use strict';

const btnFindOutMore = document.querySelector('.btn--find-out-more');
const sectionAbout = document.querySelector('#chapter-about');
const navbar = document.querySelector('.navbar');

// Button FIND OUT MORE
btnFindOutMore.addEventListener('click', () => {
  sectionAbout.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Navbar fade animation
const handleHover = (e) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav__link');
    const logo = link.closest('.navbar').querySelector('.nav__logo');

    siblings.forEach((el) => {
      const element = el;
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
navbar.addEventListener('mouseover', handleHover.bind(0.5));
navbar.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const stickyNavigation = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};

const header = document.querySelector('.header');
const navHeight = navbar.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Toggle Dark Mode
const body = document.documentElement;
const darkSwitch = document.querySelector('#dark-mode-switch');
const darkButton = document.querySelector('#dark-mode-checkbox');
const darkLabel = document.querySelector('#dark-mode-label');

function switchOutlineOn(e) {
  darkSwitch.style.outline = '1px dotted red';
}

function switchOutlineOff(e) {
  darkSwitch.style.outline = '0';
}

function switchDark(e) {
  if (e.target.checked) {
    body.classList.add('dark');
    darkLabel.textContent = 'To Light Mode';
  } else {
    body.classList.remove('dark');
    darkLabel.textContent = 'To Dark Mode';
  }
}

darkButton.addEventListener('focus', switchOutlineOn);
darkButton.addEventListener('focusout', switchOutlineOff);
darkButton.addEventListener('change', switchDark);
