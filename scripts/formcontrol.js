var $contactInputs = $emailForm.querySelectorAll('.inputBox input');
var $contactTextArea = $emailForm.querySelectorAll('.inputBox textarea');

//convert the selected form elements to array
$contactInputs = Array.from($contactInputs);
$contactTextArea = Array.from($contactTextArea);

for (let input of $contactInputs) {
    input.addEventListener('focus', e => {
        e.target.nextElementSibling.classList.add('float');
        e.currentTarget.parentElement.querySelector('.line').style.height = '100%';
    });
    input.addEventListener('blur', e => {
        if(e.currentTarget.value < 1) {
            e.target.nextElementSibling.classList.remove('float');
            e.currentTarget.parentElement.querySelector('.line').style.height = '2px';
        }
    });
}
for (let textArea of $contactTextArea) {
    textArea.addEventListener('focus', e => {
        e.target.nextElementSibling.classList.add('float');
        e.currentTarget.parentElement.querySelector('.line').style.height = '100%';
    });
    textArea.addEventListener('blur', e => {
        if(e.currentTarget.value < 1) {
            e.target.nextElementSibling.classList.remove('float');
            e.currentTarget.parentElement.querySelector('.line').style.height = '2px';
        }
    });
}
function onSubmit(token) {
    document.getElementById("demo-form").submit();
  }
function doRecaptcha() {
    var clientId = grecaptcha.render('g-badge', {
        'sitekey': '6Le8_fwZAAAAABw7ndcTMVGWHrAOh5hW9mGaDj8U',
        'badge': 'bottomright',
        'size': 'invisible'
    });
}