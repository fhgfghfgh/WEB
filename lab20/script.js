let btn = document.querySelectorAll('.btnClick');
let input = document.getElementById('display');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        if(input.value == 0 && Number.isInteger(+this.innerText) )
            input.value = ""

        if(!Number.isInteger(+this.innerText) && !Number.isInteger(+input.value[input.value.length - 1]))
            input.value = input.value.slice(0, -1)

        input.value += this.innerText;
    });
}

function Clear() {
    document.getElementById('display').value = '0';
}

function Result() {
    var expression = document.getElementById('display').value;
    var result = eval(expression);
    document.getElementById('display').value = result;
}
