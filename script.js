//Console.logs are available and present for demonstration and review purposes only but will be deleted on final release.

var reset = new clearConstructor();
var click = new clickConstructor();
var display = new displayConstructor();
$(document).ready(clickHandler);

function clickHandler() {
    $(".numberButtonsContainer").on('click', 'div', function (){
        click.numberClicked($(this).text());
    });
    $(".operatorButtonContainer").on('click', 'div', function (){
        click.operatorClicked($(this).text());
    });
    $(".clearButtonsContainer").on('click', 'div', function (){
        reset.clear($(this).text());
    });
}

function clickConstructor() {
    this.container = this.lastSet = [];
    this.decimal = false;
    this.emptyClick = 0;
    this.numberClicked = function (number) {
        if(number === "="){
            this.equalSignClicked();
            return;
        } else if(number === "."){
            this.decimalClicked();
            return;
        } else if(typeof(this.container[0]) === "number"){
            reset.CE();
            this.container.push(number);
        } else if(!isNaN(this.container[this.container.length - 1]) || this.decimal){
            this.container[this.container.length - 1] += (number);
        } else {
            this.container.push(number);
        }
        display.values(this.container[this.container.length -1]);
        console.log(this.container);
    };

    this.operatorClicked = function (operator) {
        this.decimal = false;
        if(!isNaN(this.container[this.container.length - 1])){
            this.container.push(operator);
        } else if(this.container.length >= 1){
            this.container[this.container.length - 1] = operator;
        }
        console.log(this.container);
    };
    ///LFZ START
    // declare function that will be called when equal sign has been clicked
        // set decimal to false
        /* check if number container array is empty run this code
             increment the empty counter click, call display values with the parameters: check if empty click counter is divisible by 4 then it would be string ready if not it would be empty string.*/
        /* check if number array container is divisible by 2 and container.length is more than 0
            create a variable to to get the last operator form the container array
            create a variable that copies the container array
            call calculate function and set its return value to first index of container array
            push to the container array the last operator variable and call the find and calculate function and set its parameter as the last set then include its result to the push
            call display value function with parameter: call function the find and calculate function with the parameter of the container array
           */
        /* check if second index of variable that holds the last set is not undefined and check if third index of variable that holds the last set is not undefined and container array length is no more than 3
            add the variable that holds the last set index 2 and 3 to container array
            copy the container array and set it to a variable that holds the last set
            call display values with the parameter: call the function find and calculate with the parameters as the array container*/
        /* default statement
            copy the container array to a variable that holds the last set
            call function display values with the parameter of: call find and calculate run operations function with the parameter of the array container*/
    ///LFZ END
    this.decimalClicked = function () {
        if(this.decimal === false){
            if(isNaN(this.container[this.container.length-1])){
                this.container.push(".");
                this.decimal = true;
            } else {
                this.container[this.container.length - 1] += (".");
                this.decimal = true;
            }
            display.values(this.container[this.container.length -1]);
            console.log(this.container);
        }
    }
}

var findAndCalculate = {
    operators : {
        "X" : function (numberOne, numberTwo) {
            return numberOne * numberTwo;
        },
        "÷" : function (numberOne, numberTwo) {
            return numberOne === 1 && numberTwo === 0 ? "Err0r!" : numberOne / numberTwo;
        },
        "+" : function (numberOne, numberTwo) {
            return numberOne + numberTwo;
        },
        "-" : function (numberOne, numberTwo) {
            return numberOne - numberTwo;
        }
    },
    runOperations : function (arrayInput) {
        for(var operatorType in this.operators){
            this.index = arrayInput.indexOf(operatorType);
            while (this.index !== -1) {
                arrayInput[this.index] = this.operators[operatorType](parseFloat(arrayInput[this.index-1]),parseFloat(arrayInput[this.index+1]));
                arrayInput.splice(this.index - 1,1);
                arrayInput.splice(this.index,1);
                this.index = arrayInput.indexOf(operatorType);
            }
        }
        console.log(arrayInput);
        return arrayInput[0];
    }
};

function clearConstructor() {
    this.clear = function (type) {
            this[type]();
            console.log(click.container);
        };
    ///LFZ START
    /* create a clear all function
        set the container to empty
        set the last set to empty
        set decimal to false
        set empty click to 0
        call function display values with parameters cleared
        */

    ///LFZ END
    this.C = function () {
        display.values("");
        click.emptyClick = 0;
        if(!isNaN(click.container[click.container.length - 1]) && click.container.length > 0) {
            click.decimal = false;
            click.container.pop();
        }
    };
}

function displayConstructor(){
    this.values = function (valueToDisplay) {
        $('.displayBox').text(valueToDisplay);
    };
}