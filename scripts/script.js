//(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)- detecting a phone browser
var allItemsContainer = document.getElementsByClassName('container')[0];

let headerContainer = document.querySelector('.header');
let arrowDownIconSibling = document.querySelector('.header div');
var arrowDownIcon = document.querySelector('.header__scroll-icon');

let navTray = document.querySelector('#main__navigation');
let navTrayNav = document.querySelector('#main__navigation nav');
let navTrayUl = document.querySelector('#main__navigation ul');
let iconsContainer = document.querySelector('[data-section-links]');
let navIcons = document.querySelectorAll('#main__navigation li');

let section1 = document.getElementsByClassName('section-one')[0];
let section3 = document.getElementsByClassName('section-three')[0];

const emailForm = document['forms']["portfolio-contact"];
const emailBox = section3.querySelector('.email-box');
const emailBoxInputs = emailBox.querySelectorAll('input');
const emailBoxTextArea = emailBox.querySelector('#msg');
const recaptchaItem = emailBox.querySelector('div[data-netlify-recaptcha]');
const submitMailBtn = emailBox.getElementsByClassName('submit')[0];

let smallScreenNavigation = allItemsContainer.querySelector('.tiny-navigation');
const smallScreenNavIcons = smallScreenNavigation.querySelectorAll('.tiny-navigation li');

const myselfImage = document.querySelector('.my-image img');

//setting viewport height for compatibility purposes of non-vh browsers
let viewPortHeight = window.innerHeight;
allItemsContainer.style.setProperty('--viewHeight', viewPortHeight + 'px');

//setting the bottom value of the downward floating arrow animation
let headerHeight = getComputedStyle(headerContainer).height.replace('px', '');
let arrowDownIconSiblingHeight = getComputedStyle(arrowDownIconSibling).height.replace('px', '');
let arrowDownIconSpace;
align();


//upon clicking arrowdown icon
arrowDownIcon.onclick = () => {
    section1.scrollIntoView({behavior: "smooth", block: "start"});
}

//setting hover effect on the display menu icons
navIcons.forEach((navIcon, index) => {
    if(index == 0) {
        navIcons[index].addEventListener('click', () => {
            headerContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            // location.href = '#';
            // location.href = '#home';
        });
    }
    if(index == 1) {;
        navIcons[index].addEventListener('click', () => {
            section1.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 2) {
        navIcons[index].addEventListener('click', () => {
            section3.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
});
let width;
iconsContainer.addEventListener('mouseover', () => {
    width = (window.innerWidth * 0.3);
    navTray.style.width = width + 'px';//; clamp has compat issues
    getComputedStyle(navTray).width;
    navTrayNav.style.width = '100%';
    navTrayUl.style.width = '100%';
    iconsContainer.style.width = '100%';
});
iconsContainer.addEventListener('mouseleave', () => {
    navTray.style.width = '5rem';
    getComputedStyle(navTray).width;
    navTrayNav.style.width = '100%';
    navTrayUl.style.width = '100%';
    iconsContainer.style.width = '100%';
});

//giving action to the small screen icons
for(const[index, icon] of smallScreenNavIcons.entries()){
    if(index == 0) {
        smallScreenNavIcons[index].addEventListener('click', () => {
            headerContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 1) {
        smallScreenNavIcons[index].addEventListener('click', () => {
            section1.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 2) {
        smallScreenNavIcons[index].addEventListener('click', () => {
            section3.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
}

//setting navigation pane to stick when necessary
const options = {
    root: allItemsContainer,
    threshold: 0,
    rootMargin: "0px"
}
let target = headerContainer;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting == true) {
            arrowDownIcon.classList.add('animate');
            return navTray.classList.remove('stick');
        }
        arrowDownIcon.classList.remove('animate');
        navTray.classList.add('stick');
    });
}, options);

//small screen observer
const smallScreenObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting == true) {
            arrowDownIcon.classList.add('tiny-effect');
            return smallScreenNavigation.classList.remove('dock-bottom');
        }
        arrowDownIcon.classList.add('tiny-effect');
        smallScreenNavigation.classList.add('dock-bottom');
    });
}, options);

//checking whether screen is below 650px or above
onload = () => {
    if(window.innerWidth > 650) {
        atLargeScreen();
    } else {
        atSmallScreen();
        mailBoxPlaceHolders475Sceen();
    }
}
//also check when resizing
onresize = () => {
    viewPortHeight = window.innerHeight;
    allItemsContainer.style.setProperty('--viewHeight', viewPortHeight + 'px');

    headerHeight = getComputedStyle(headerContainer).height.replace('px', '');
    arrowDownIconSiblingHeight = getComputedStyle(arrowDownIconSibling).height.replace('px', '');
    align();

    if(window.innerWidth > 650) {
        atLargeScreen();
        mailBoxPlaceHolders475Sceen();
    }else {
        mailBoxPlaceHolders475Sceen();
        atSmallScreen();
    }
}

//lazy load about section
let options2 = {
    root: allItemsContainer,
    threshold: [0.15, 0.30, 0.33]
}
let target2 = section1;
let ratio;
let slideItem1 = section1.querySelector('.main__content-about');
let slideItem2 = section1.querySelector('.background');
let slideItem3 = section1.querySelector('.my-image');
let observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        ratio = entry.intersectionRatio;
        if(ratio >= 0.15) {
            slideItem1.classList.add('slide-in');
        }
        if(ratio >= 0.30) {
            slideItem2.classList.add('slide-in');
        }
        if(ratio >= 0.33) {
            slideItem3.classList.add('slide-in');
            stopObserver2();
        }
    });
}, options2);
observer2.observe(target2);

//checking to find if recaptcha was clicked
let recaptchaClick = 0;
recaptchaItem.onclick = () => {
    ++recaptchaClick;
}
emailForm.addEventListener('submit', (event) => {
    if(!recaptchaClick) {
        recaptchaItem.classList.add('unchecked');
        alert('Please do action for the highlighted!');
        return event.preventDefault();
    }
    recaptchaItem.classList.remove('unchecked');
    emailForm.submit();
});


//function definitions
function atSmallScreen () {
    arrowDownIcon.classList.remove('animate');
    arrowDownIcon.classList.add('tiny-effect');
    navTray.classList.remove('stick');
    navTray.classList.add('hide');
    observer.unobserve(target);
    smallScreenObserver.observe(target);
    
    myselfImage.classList.remove('blur-image');
}
function atLargeScreen () {
    arrowDownIcon.classList.remove('tiny-effect');
    arrowDownIcon.classList.add('animate');
    navTray.classList.remove('hide');
    smallScreenNavigation.classList.remove('dock-bottom');
    smallScreenObserver.unobserve(target);
    observer.observe(target);
    
    myselfImage.classList.add('blur-image');
}

function mailBoxPlaceHolders475Sceen() {
    //putting mailBox placeholders on inputs at smaller screens(475px)
    if(window.innerWidth < 475) {
            //setting placeholder on small screen
        for(const[i, input] of emailBoxInputs.entries()){
            let placeholder = input.dataset.name;
            if(i == 0) {
                input.setAttribute('placeholder', placeholder);
            } else if(i == 1) {
                input.setAttribute('placeholder', placeholder);
            }
        }
        let messagePlaceHolder = emailBoxTextArea.dataset.name;
        emailBoxTextArea.setAttribute('placeHolder', messagePlaceHolder);
    } else {
        for(const[i, input] of emailBoxInputs.entries()){
            input.setAttribute('placeholder', '');
        }
        emailBoxTextArea.setAttribute('placeHolder', '');
    }
}
function align() {
    arrowDownIconSpace = +headerHeight - +arrowDownIconSiblingHeight;
    arrowDownIcon.style.setProperty('--siblings-height', (0.1 * arrowDownIconSpace) + 'px');
}
function stopObserver2 () {
    observer2.unobserve(target2);
}