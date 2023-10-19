const input = document.getElementById('input')
const button = document.querySelectorAll('.btn')
const customTip = document.getElementById('customTip');
const error = document.getElementById('error')
const people = document.getElementById('people')
const totalVal = document.querySelectorAll('.tipValue')
const reset = document.querySelector('.reset')
const calc = document.getElementById("calc")
let billVal = 0;
let peopleVal = 0;
let tipVal = 0;

input.addEventListener('input',validateBill);

function validateInput(){
    if(billVal>0&&peopleVal>0&&tipVal>0){
        calc.classList.add('active')
        return true
    }
    else{
        calc.classList.remove('active')
        return false
    }
}

function validateBill(){
    if(input.value.includes(',')){
        input.value.replace(',','.')
    }
    billVal = parseFloat(input.value);
    validateInput()
}

calc.addEventListener('click', calculate)
customTip.addEventListener('input',tipCustomVal);
people.addEventListener('input',setPeopleVal)
reset.addEventListener('click',handleReset);

button.forEach(btn => {
    btn.addEventListener('click',handleClick)
});



function handleClick(event){
    button.forEach(btn => {
        btn.classList.remove('active')
        if(event.target.innerHTML === btn.innerHTML){
            btn.classList.add('active');
            tipVal = parseFloat(btn.innerHTML)/100
        }
    })
    customTip.value=''
    validateInput()
}

function tipCustomVal(){
    tipVal = parseFloat(customTip.value/100)
    button.forEach(btn => {
        btn.classList.remove('active');
    })
    if(customTip.value !== 0){         
    }
    validateInput()
}

function setPeopleVal(){
    peopleVal = parseFloat(people.value)
    if(peopleVal <= 0 ) {
        error.innerHTML = 'number must be greater than zero'
        setTimeout(function(){
            error.innerHTML = ''
        },2000)
    }
    validateInput()
}

function calculate() {
    if(peopleVal >= 1 ) {
        let tip = billVal * tipVal / peopleVal;
        let totalAmount = billVal * (tipVal + 1) / peopleVal;

        totalVal[0].innerHTML = '$' + tip.toFixed(2);
        totalVal[1].innerHTML = '$' + totalAmount.toFixed(2);

        reset.classList.add("active")
    }
}

function handleReset(){
    input.value = 0.0;
    validateBill()

    button[2].click();
    people.value = 1;
    setPeopleVal()

    reset.classList.remove("active")
    validateInput()
}