//Each of the following four functions perform a basic arithmetic operation for the calculator

function add(...arr){
    return arr.reduce((prev, curr)=> prev+curr);

}

function subtract(...arr){
    return arr.reduce((prev, curr)=> prev-curr);
}

function multiply(...arr){
    return arr.reduce((prev, curr)=> prev*curr);

}

function divide(...arr){
    const result = arr.reduce((prev, curr)=> prev/curr);
        
        if(result===Infinity){                                     //  the result would be Infinity if 
            throw 'MATH Error: Number cannot be divided by zero';  // a number(execpt 0) is divided by 0
        }else{
            if (isNaN(result)){                         //  the result would be NaN 
                throw 'MATH Error: Inconclusive';      //  if 0 is divided by 0
            }
       }
       return result;

       
       
}

// This function determines which of the arithmetic operations should be performed on the expression 
// given to it. After, it will return the answer to the expression.

function operate(num1, operator, num2){

    switch(operator){
        case '+':
            return add(parseFloat(num1), parseFloat(num2));
            break;

        case '-':
            return subtract(num1, num2);
            break;
            
        case '*':
            return  multiply(num1, num2);
            break;
            
        case '/':
            return  divide(num1, num2);
            
            break;
            
        default:
            console.log("Invalid operator!");    
    }


}


const operatorButtons= document.querySelectorAll('.oper-button');
const numButtons= document.querySelectorAll('.num-button');
const calcDisplay= document.querySelector('#calculator-display');
const clearButton= document.querySelector('#clear-button');
const equalButton= document.querySelector('#equal-button');
const divideButton= document.querySelector('#divide-button');
const multiplyButton= document.querySelector('#multiply-button');

let displayValue="";
let displayValArray=[];
const divSymbol=divideButton.textContent;
const multSymbol=multiplyButton.textContent;


//   For the following two forEach methods:
//   When any of the calculator buttons (numbers and arithmeric operations) 
//   are clicked, it will be shown on the display

operatorButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        calcDisplay.value+=btn.textContent;    

    });                                     


});         

numButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        calcDisplay.value+=btn.textContent;

    });

});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
    calcDisplay.value="";

});


function calcDivideMultiply(arr){ //preferred function
    let symbol='';

    const index= arr.findIndex(item=> (item===divSymbol || item===multSymbol) );

    if (index===-1) { return arr; }
    
    const dispSymbol= arr.find(item=> (item===divSymbol || item===multSymbol));

    (dispSymbol===divSymbol) ?  symbol= '/' : symbol= '*';
    const result=operate(arr[index-1], symbol, arr[index+1]);

    const newArray=[
                    ...arr.slice(0, index-1),
                    result,
                    ...arr.slice([index+2])
                ];
    return anotherdivMultCalc(newArray);
    
}


function calcAddSubtract(arr){ //preferred function
    const index= arr.findIndex( item => (item==='-' || item==='+'));

    if(index===-1){
        return arr[0];
    }

    const symbol=arr.find( item=> (item==='-' || item==='+'));

    result=operate(arr[index-1], symbol, arr[index+1]);
    const newArray=[
        ...arr.slice(0, index-1),
        result,
        ...arr.slice([index+2])
     ];
     return anotherAddSubtCalc(newArray);


}


equalButton.addEventListener('click', ()=>{
    displayValue= calcDisplay.value;
    console.log(displayValue);
    displayValArray= displayValue.split(/(\D)/);
    console.log(displayValArray);
    /*console.log(divSymbol);
    console.log(multSymbol);*/


    try{
    const arrayNext= anotherdivMultCalc(displayValArray);
    //console.log(arrayNext);
    console.log(anotherAddSubtCalc(arrayNext));

    }catch(error){
        console.log(error);


    }  

});

