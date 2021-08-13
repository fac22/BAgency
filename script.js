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

//Team Form
//Team Form inputs
const teamAddName = document.querySelector('#team-form-name');
const teamAddEmail = document.querySelector('#team-form-email');
const teamAddTitle = document.querySelector('#team-form-title');
const teamAddDesc = document.querySelector('#team-form-desc');
const teamAddImg = document.querySelector('#team-form-img');
const teamAddPass = document.querySelector('#team-form-pass');
const teamAddSubmit = document.querySelector('#team-form-submit');
//Team Form password
const adminPasswordBAgency = '1234';
const teamAddPassLabelError = document.querySelector(
  '[for="team-form-pass"] .error'
);
//Team Form 149
const teamAddDescLabel = document.querySelector('[for="team-add-desc"]');
const teamAddDescLabelError = document.querySelector(
  '[for="team-form-desc"] .error'
);

function passwordChecker(field, correct, display) {
  const check = field.value === correct;
  if (!check) {
    display.textContent = ' Incorrect Password';
    return false;
  } else {
    display.textContent = '';
    return true;
  }
}

function textLengthChecker(field, max, display) {
  if (field.textLength > max) {
    field.setAttribute('aria-invalid', 'true');
    let test = /Exceeds/.test(display.textContent);
    if (!test) {
      display.textContent = ' Exceeds 149 characters';
      return false;
    }
  } else {
    field.setAttribute('aria-invalid', 'false');
    display.textContent = '';
    return true;
  }
}

function allReqValid() {
  //array = get all with required
  const teamAddReq = Array.from(
    document.querySelectorAll('#team-form [required]')
  );
  // console.log(teamAddReq);
  return teamAddReq.every((x) => x.checkValidity());
  // forEach(x.checkValidity())
}

function addTeamImgHelper(a) {
  let help =
    'https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
  return a.value === '' ? help : a.value;
}

function addTeamGatherInfo() {
  const addName = teamAddName.value;
  const addTitle = teamAddTitle.value;
  const addDesc = teamAddDesc.value;
  const addImg = addTeamImgHelper(teamAddImg);
  // const addImg = teamAddImg.value;
  return { addName, addTitle, addDesc, addImg };
}

function addTeamFillTemplate() {
  //define target, template, clone
  const target = document.querySelector('#chapter-team');
  const template = document.querySelector('#new-team-card');
  const tempClone = template.content.cloneNode(true);
  //take object, access each key
  const formInfo = addTeamGatherInfo();
  //assign key-->template tags
  tempClone.querySelector('h3').textContent = formInfo.addName;
  tempClone.querySelector('h4').textContent = formInfo.addTitle;
  tempClone.querySelector('p').textContent = formInfo.addDesc;
  // tempClone.querySelector('img').src =
  //   'https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
  tempClone.querySelector('img').src = formInfo.addImg;
  return target.appendChild(tempClone);
}

teamAddDesc.addEventListener('input', () => {
  textLengthChecker(teamAddDesc, 149, teamAddDescLabelError);
});

teamAddSubmit.addEventListener('click', () => {
  passwordChecker(
    teamAddPass,
    adminPasswordBAgency,
    teamAddPassLabelError
  );
  if (
    allReqValid() &&
    passwordChecker(
      teamAddPass,
      adminPasswordBAgency,
      teamAddPassLabelError
    ) &&
    textLengthChecker(teamAddDesc, 149, teamAddDescLabelError)
  ) {
    console.log('OK');
    return addTeamFillTemplate();
  } else {
    console.log('Mistake');
  }
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
