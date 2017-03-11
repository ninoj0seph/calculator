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
    this.emptyClick = -1;
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
        // } else if(isNaN(this.container[this.container.length-1]) && this.container > 0) {
        //     this.container[this.container.length - 1] = operator;
        } else if(this.container > 0){
            this.container[this.container.length - 1] = operator;
        }
        console.log(this.container);
    };

    this.equalSignClicked = function () {
        if(this.container.length < 1){
            display.values(++this.emptyClick % 4 === 0 ? "r3ady" : "");
            return;
        } else if(this.container.length % 2 === 0 && this.container.length > 0) {
            this.lastOperator = this.container.pop();
            this.lastSet = this.container.slice(0);
            console.log(this.lastSet);
            this.container[0] = operator.findAndOperate(this.container);
            this.container.push(this.lastOperator, operator.findAndOperate(this.lastSet));
            display.values(operator.findAndOperate(this.container));
         } else if(this.lastSet !== undefined){
             this.container.push(this.lastSet[1],this.lastSet[2]);
             console.log(this.container);
             display.values(operator.findAndOperate(this.container));
         // } else if(this.container.length === 1){
         //     return;
         } else {
             this.lastSet = this.container.slice(0);
             display.values(operator.findAndOperate(this.container));
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
        console.log(arrayInput);
        return arrayInput[0];
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
        click.lastOperator = undefined;
        click.lastSet = undefined;
        display.values("Cleared");
        setTimeout(function (){
            display.values("");
        },100);
    };
    this.C = function () {
        display.values("");
        if(!isNaN(click.container[click.container.length - 1]) && click.container.length > 0 ) {
            click.decimal = false;
            click.container[click.container.length - 1] = "";
        }
    };
}

function displayConstructor(){
    this.values = function (valueToDisplay) {
        $('.displayBox').text(valueToDisplay);
    };
}