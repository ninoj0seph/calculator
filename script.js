var container = [];
$(document).ready(clickHandler);

function clickHandler() {
    $(".numberButtonsContainer").on('click', 'div', numberClicked);
    $(".operatorButtonContainer").on('click', 'div', operatorClicked)
}

function numberClicked(){
    var number = $(this).text()
    if(number === "="){
        equalSignClicked();
        return;
    } else if(isNaN(container[container.length-1])){
        container.push(number);
        $(".displayBox").append(container[container.length -1]);
    } else {
        container[container.length - 1] += (number);
        $(".displayBox").append(container[container.length -1 + " "]);
    }

    console.log(container);
}

function operatorClicked(){
    var opperator = $(this).text();
    if(!isNaN(container[container.length-1])){
        container.push(opperator);
    } else {
        container[container.length - 1] = opperator;
    }
    $(".displayBox").append(container[container.length -1]);
    console.log(container);
}

function equalSignClicked(){
    for(i = 0; i < container.length; i++){
        if(!isNaN(container[i])){
            container[i] = parseFloat(container[i]);
        }
    }
    operate.findOperator(container);
}

var operate = {
    findOperator : function (arrayInput) {
        for(i = 0; i < container.length; i++){
            if(arrayInput[i] === "+" || arrayInput[i] === "-" || arrayInput[i] === "X" || arrayInput[i] === "÷"){
                arrayInput[0] = this[arrayInput[i]](arrayInput[i-1],arrayInput[i+1]);
                arrayInput.splice(1,arrayInput.length);
                console.log(arrayInput);
                $('.displayBox').text(arrayInput[0]);
            }
        }
    },
    "+" : function (numberOne, numberTwo) {
        return numberOne + numberTwo;
    },
    "-" : function (numberOne, numberTwo) {
        return numberOne - numberTwo;
    },
    "X" : function (numberOne, numberTwo) {
        return numberOne * numberTwo;
    },
    "÷" : function (numberOne, numberTwo) {
        return numberOne / numberTwo;
    }
};