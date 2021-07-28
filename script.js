/* eslint-disable strict */

'use strict';

const btnFindOutMore = document.querySelector('.btn--find-out-more');
const sectionAbout = document.querySelector('#chapter-about');
const navbar = document.querySelector('.navbar');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--open-modal');

// eslint-disable-next-line no-unused-vars
const sendForm = () => {
  const formElements = Array.from(document.forms['work-form'].elements).filter(
    (element) => element.hasAttribute('data-valid')
  );

  formElements.forEach((element) => {
    if (element.getAttribute('data-valid') === 'false') {
      document.getElementById(`${element.id}-error`).classList.remove('hidden');
    } else {
      document.getElementById(`${element.id}-error`).classList.add('hidden');
    }
  });

  if (
    !formElements.filter(
      (element) => element.getAttribute('data-valid') === 'false'
    ).length
  ) {
    document.forms['work-form'].classList.add('removed');
    document.getElementById('work-form-results').innerHTML = formElements
      .filter((element) => element.hasAttribute('name'))
      .reduce(
        (html, element) =>
          `${html} ${element.getAttribute('name')}: ${element.value} <br />`,
        ''
      );
    document.getElementById('work-form-results').classList.remove('hidden');
  }
};

document.getElementById('work-form-name').addEventListener('input', (e) => {
  if (!e.target.value.length) {
    e.target.style.borderColor = 'red';
    e.target.setAttribute('data-valid', false);
  } else {
    e.target.style.borderColor = 'green';
    e.target.setAttribute('data-valid', true);
    document.getElementById(`${e.target.id}-error`).classList.add('hidden');
  }
});

document.getElementById('work-form-email').addEventListener('input', (e) => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      e.target.value
    )
  ) {
    e.target.style.borderColor = 'red';
    e.target.setAttribute('data-valid', false);
  } else {
    e.target.style.borderColor = 'green';
    e.target.setAttribute('data-valid', true);
    document.getElementById(`${e.target.id}-error`).classList.add('hidden');
  }
});

document.getElementById('work-form-message').addEventListener('input', (e) => {
  if (e.target.value.length >= 149 || !e.target.value.length) {
    e.target.style.borderColor = 'red';
    e.target.setAttribute('data-valid', false);
  } else {
    e.target.style.borderColor = 'green';
    e.target.setAttribute('data-valid', true);
    document.getElementById(`${e.target.id}-error`).classList.add('hidden');
  }
});

document.getElementById('work-form-robot').addEventListener('input', (e) => {
  if (e.target.value !== "I'm not a robot") {
    e.target.style.borderColor = 'red';
    e.target.setAttribute('data-valid', false);
  } else {
    e.target.style.borderColor = 'green';
    e.target.setAttribute('data-valid', true);
    document.getElementById(`${e.target.id}-error`).classList.add('hidden');
  }
});

document.getElementById('work-form-send').addEventListener('click', sendForm);

// Modal window
const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

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

// Toggle Dark Mode
const body = document.documentElement;
const darkSwitch = document.querySelector('#dark-mode-switch');
const darkButton = document.querySelector('#dark-mode-checkbox');
const darkLabel = document.querySelector('#dark-mode-label');

function switchOutlineOn() {
  darkSwitch.style.outline = '1px dotted red';
}

function switchOutlineOff() {
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
