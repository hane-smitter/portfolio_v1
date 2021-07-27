//(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)- detecting a phone browser
var allItemsContainer = document.getElementsByClassName('container')[0];

var headerContainer = document.querySelector('.header');
let arrowDownIconSibling = document.querySelector('.header div');
var arrowDownIcon = document.querySelector('.header__scroll-icon');

let navTray = document.querySelector('#main__navigation');
let navTrayNav = document.querySelector('#main__navigation nav');
let navTrayUl = document.querySelector('#main__navigation ul');
let navTraySpanLogo = document.querySelector('#main__navigation span');
// let iconsContainer = document.querySelector('[data-section-links]');//div
let navIconsLiContainer = document.querySelectorAll('#main__navigation li');
let navIcons = document.querySelectorAll('#main__navigation li img');

let section1 = document.getElementsByClassName('section-one')[0];
let section2 = document.getElementsByClassName('section-two')[0];
let section3 = document.getElementsByClassName('section-three')[0];

let smallScreenNavigation = allItemsContainer.querySelector('.tiny-navigation');
const smallScreenNavIcons = smallScreenNavigation.querySelectorAll('.tiny-navigation li');

let viewPortHeight = window.innerHeight;
let viewPortWidth = window.innerWidth;

//setting the bottom value of the downward floating arrow animation
let headerHeight = getComputedStyle(headerContainer).height.replace('px', '');
let arrowDownIconSiblingHeight = getComputedStyle(arrowDownIconSibling).height.replace('px', '');
let arrowDownIconSpace;
align();


//upon clicking arrowdown icon
arrowDownIcon.onclick = () => {
    section1.scrollIntoView({behavior: "smooth", block: "start"});
}

//Adding click actions on the display menu icons
navIconsLiContainer.forEach((navIcon, index) => {
    if(index == 0) {
        navIcon.addEventListener('click', () => {
            headerContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            // location.href = '#';
            // location.href = '#home';
        });
    }
    if(index == 1) {
        navIcon.addEventListener('click', () => {
            section1.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 2) {
        navIcon.addEventListener('click', () => {
            section2.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 3) {
        navIcon.addEventListener('click', () => {
            section3.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
});

//Controlling the navigation tray size
//<NavTray width>
let navTrayWidth;
navTrayUl.addEventListener('mouseover', onMouseOverNavTray);
navTrayUl.addEventListener('mouseleave', onMouseLeaveNavTray);
ifRemoveHoverOnNavTray();
//</NavTray width>

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
            section2.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
    if(index == 3) {
        smallScreenNavIcons[index].addEventListener('click', () => {
            section3.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
    }
}

/* FUNCTION DEFINITIONS */
/* -------------------- */

//checking whether screen is below 650px or above 650px
onload = () => {
    navTrayWidth = (viewPortWidth * 0.3);
    if(matchMedia(`(min-width: 650px)`).matches) {
        atLargeScreen(); 
    } else {
        atSmallScreen();
    }
    navIconsLiContainer.forEach((liItem) => {
        liItem.style.width = navTrayWidth + "px";
    });
}

//js media query
matchMedia(`(min-width: 650px)`).addEventListener("change", determineScreenSizeActions);

function determineScreenSizeActions(event) {
    if(event.matches) {
        atLargeScreen();
    } else {
        atSmallScreen();
    }
}

//also check when resizing
onresize = () => {
    viewPortHeight = window.innerHeight;
    viewPortWidth = window.innerWidth;
    navTrayWidth = (viewPortWidth * 0.3);
    
    headerHeight = getComputedStyle(headerContainer).height.replace('px', '');
    arrowDownIconSiblingHeight = getComputedStyle(arrowDownIconSibling).height.replace('px', '');
    align();


    navIconsLiContainer.forEach((liItem) => {
        liItem.style.width = navTrayWidth + "px";
    });

    ifRemoveHoverOnNavTray();
}

//setting the width of navigation tray when hovered
let navTrayTextHeadTimeoutID;
function onMouseOverNavTray() {
    const navTrayTextHead = navTraySpanLogo.querySelector('span');
    navTray.style.width = navTrayWidth + 'px';
    requestAnimationFrame(function() {
        clearTimeout(navTrayTextHeadTimeoutID);
        navTrayTextHeadTimeoutID = setTimeout(function() {
            navTrayTextHead.classList.remove('hide');
        }, 500);
    });
    getComputedStyle(navTray).width;
    navTrayNav.style.width = '100%';
    navTrayUl.style.width = '100%';
    navTraySpanLogo.style.width = '100%';
    
}
function onMouseLeaveNavTray() {
    const navTrayTextHead = navTraySpanLogo.querySelector('span');
    navTray.style.width = '5rem';
    clearTimeout(navTrayTextHeadTimeoutID);
    navTrayTextHeadTimeoutID = setTimeout(function() {
        navTrayTextHead.classList.add('hide');
    }, 700);
    getComputedStyle(navTray).width;
    navTrayNav.style.width = '100%';
    navTrayUl.style.width = '100%';
    navTraySpanLogo.style.width = '100%';


}

//navTray checks
function ifRemoveHoverOnNavTray() {
    if(matchMedia(`(max-width: 768px)`).matches) {
        navTrayUl.removeEventListener('mouseover', onMouseOverNavTray);
        navTrayUl.removeEventListener('mouseleave', onMouseLeaveNavTray);
    } else {
        navTrayUl.addEventListener('mouseover', onMouseOverNavTray);
        navTrayUl.addEventListener('mouseleave', onMouseLeaveNavTray);
    }
    
}

//setting navigation pane to stick when necessary
const options = {
    root: allItemsContainer,
    threshold: 0.01
}
let target = headerContainer;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting == true) {
            navTray.classList.remove('stick');
            loop();
            document.querySelector('.p5Canvas').classList.remove('hide');
            return;
        }
        noLoop();
        document.querySelector('.p5Canvas').classList.add('hide');
        navTray.classList.add('stick');
    });
}, options);

//small screen observer
const smallScreenObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting == true) {
            arrowDownIcon.classList.add('tiny-effect');
            smallScreenNavigation.classList.remove('dock-bottom');
            loop();
            document.querySelector('.p5Canvas').classList.remove('hide');
            return;
        }
        noLoop();
        document.querySelector('.p5Canvas').classList.add('hide');
        arrowDownIcon.classList.add('tiny-effect');
        smallScreenNavigation.classList.add('dock-bottom');
    });
}, options);

//lazy load about section

let settings = {
    root: allItemsContainer,
    threshold: 0.30
}
let $class_aboutMe_item = section1.querySelector('.about-me');
let $class_goals_item = section1.querySelector('.goals');
let $emailForm = document.forms['portfolio-contact'];

let lazyloadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(entry.intersectionRatio >= 0.30) {
            if(entry.target.childElementCount > 1) {
                var children = entry.target.children;
                for ( let child of children) {
                    child.classList.add('slide-in');
                }
                observer.unobserve(entry.target);
                return
            }
            entry.target.firstElementChild.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
}, settings);
lazyloadObserver.observe($class_aboutMe_item);
lazyloadObserver.observe($class_goals_item);

let emailSectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(( entry ) => {
        if( entry.intersectionRatio >= 0.30 ) {
            entry.target.style.transform = 'scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, settings);
emailSectionObserver.observe($emailForm);

//function definitions
function atSmallScreen () {
    navTray.classList.remove('stick');
    navTray.classList.add('hide');
    observer.unobserve(target);
    smallScreenObserver.observe(target);
}
function atLargeScreen () {
    navTray.classList.remove('hide');
    smallScreenNavigation.classList.remove('dock-bottom');
    smallScreenObserver.unobserve(target);
    observer.observe(target);
}
function align() {
    arrowDownIconSpace = +headerHeight - +arrowDownIconSiblingHeight;
    arrowDownIcon.style.setProperty('--siblings-height', (0.1 * arrowDownIconSpace) + 'px');
}