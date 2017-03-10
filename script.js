//Console.logs are available and present for demonstration and review purposes only but will be deleted on final release.
var reset = new clearConstructor();
var click = new clickConstructor();
var display = new displayConstructor();
$(document).ready(clickHandler);

function clickHandler() {
    $(".numberButtonsContainer").on('click', 'div', function (){
        click.numberClicked($(this).text());
    });
    $(".operatorButtonContainer").on('click', 'div', function () {
        click.operatorClicked($(this).text());
    });
    $(".clearButtonsContainer").on('click', 'div', function () {
        reset.clear($(this).text());
    });
}

function clickConstructor() {
    this.container = [];
    this.decimal = false;
    this.numberClicked = function (number) {
        if(number === "="){
            this.equalSignClicked();
            return;
        } else if(number === "."){
            this.decimalClicked();
            return;
        } else if(!isNaN(this.container[this.container.length-1]) || this.container[this.container.length - 1] === "."){
            this.container[this.container.length - 1] += (number);
        } else {
            this.container.push(number);
        }
        display.values(this.container[this.container.length -1]);
        console.log(this.container);
    };

    this.operatorClicked = function (operator) {
        this.decimal = false;
        if(!isNaN(this.container[this.container.length-1])){
            this.container.push(operator);
        } else {
            this.container[this.container.length - 1] = operator;
        }
        console.log(this.container);
    };

    this.equalSignClicked = function () {
        if(this.lastSet === undefined && this.answer === undefined){
            this.lastSet = this.container.slice(0);
            console.log("=");
            console.log(this.lastSet);
            this.answer = operator.findAndOperate(this.container);
            display.values(this.answer);
        } else {
            console.log(this.lastSet);
            this.container = this.lastSet.slice(0);
            this.container[0] = this.answer;
            console.log(this.container);
            this.answer = operator.findAndOperate(this.container);
            display.values(this.answer);
        }


    };

    this.decimalClicked = function () {
        if(this.decimal === false){
            if(isNaN(this.container[this.container.length-1])){
                this.container.push(".");
                this.decimal = true;
            } else {
                this.container[this.container.length - 1] += (".");
                this.decimal = true;
            }
            console.log(this.container);
        }
    }
}

var operator = {
    findAndOperate : function (arrayInput) {
        this.calculate = function () {
            arrayInput[this.index] = this[arrayInput[this.index]](parseFloat(arrayInput[this.index-1]),parseFloat(arrayInput[this.index+1]));
            arrayInput.splice(this.index - 1,1);
            arrayInput.splice(this.index,1);
        };

        this.index = arrayInput.indexOf("X");
        while (this.index !== -1){
            this.calculate();
            this.index = arrayInput.indexOf("X");
        }

        this.index = arrayInput.indexOf("÷");
        while (this.index !== -1){
            this.calculate();
            this.index = arrayInput.indexOf("÷");
        }

        this.index = arrayInput.indexOf("+");
        while (this.index !== -1){
            this.calculate();
            this.index = arrayInput.indexOf("+");
        }

        this.index = arrayInput.indexOf("-");
        while (this.index !== -1){
            this.calculate();
            this.index = arrayInput.indexOf("-");
        }
        console.log(arrayInput[0]);

        return arrayInput.shift();
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
        return numberOne === 1 && numberTwo === 0 ? "Err0r!" : numberOne / numberTwo;
    }
};

function clearConstructor() {
    this.clear = function (type) {
            this[type]();
            console.log(click.container);
        };
    this.CE = function () {
        click.container = [];
        click.decimal = false;
        click.lastSet = undefined;
        click.answer = undefined;
        display.values("Cleared");
        setTimeout(function (){
            display.values("");
        },100);
    };
    this.C = function () {
        if(!isNaN(click.container[click.container.length - 1]) && click.container.length > 0 ) {
            click.decimal = false;
            click.container[click.container.length - 1] = "";
            display.values("");
        }
    };
}

function displayConstructor(){
    this.values = function (valueToDisplay) {
        $('.displayBox').text(valueToDisplay);
    };
}