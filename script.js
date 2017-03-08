var container = [];
$(document).ready(clickHandler);

function clickHandler() {
    $(".numberButtonsContainer").on('click', 'div', numberClicked);
    $(".operatorButtonContainer").on('click', 'div', operatorClicked);
    $(".clearButtonsContainer").on('click', 'div', function () {
        reset.clear($(this).text());
    });
}

function numberClicked(){
    var number = $(this).text();
    if(number === "="){
        equalSignClicked();
        return;
    } else if(isNaN(container[container.length-1])){
        container.push(number);
        $(".displayBox").append(container[container.length -1]);
    } else {
        container[container.length - 1] += (number);
    }
    $(".displayBox").text(container[container.length -1]);
    console.log(container);
}

function operatorClicked(){
    var operator = $(this).text();
    if(!isNaN(container[container.length-1])){
        container.push(operator);
    } else {
        container[container.length - 1] = operator;
    }
    console.log(container);
}

function equalSignClicked(){
    for(i = 0; i < container.length; i++){
        if(!isNaN(container[i])){
            container[i] = parseFloat(container[i]);
        }
    }
    operator.findAndOperate(container);
}

var operator = {
    findAndOperate : function (arrayInput) {
        for(var x = 0; x < arrayInput.length; x++){
            // try using find
            if(arrayInput[x] === "+" || arrayInput[x] === "-" || arrayInput[x] === "X" || arrayInput[x] === "÷"){
                arrayInput[0] = this[arrayInput[x]](arrayInput[x-1],arrayInput[x+1]);
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

var reset = {
    "clear" : function (type) {
        this[type]();
        console.log(container);
    },

    "CE" : function () {
        container = [];
        $(".displayBox").text("Cleared");
    },
    "C" : function () {
        if(container.length > 0) {
            container[container.length - 1] = "";
            $(".displayBox").text("");
        }
    }
};