

const operatorButtons= document.querySelectorAll('.oper-button');
const numButtons= document.querySelectorAll('.num-button');
const displayButtons= document.querySelectorAll('.disp-button');
const calcDisplay= document.querySelector('#calculator-display');
const clearButton= document.querySelector('#clear-button');
const equalButton= document.querySelector('#equal-button');
const divideButton= document.querySelector('#divide-button');
const multiplyButton= document.querySelector('#multiply-button');

const divSymbol=divideButton.textContent;
const multSymbol=multiplyButton.textContent;

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

//This function finds the solution to the expression passed to it (which is in the form of an array)

function getAnswer(arr){

    let symbol="";
    
    if(arr[1]===divSymbol){
        symbol='/';

    }else{
        if(arr[1]===multSymbol){
            symbol='*';

        }else{
            symbol=arr[1];

        }

        
   
    }

    if(arr.length===1) {
        return arr[0];
    }

    return operate(arr[0], symbol, arr[2]);
    
    //console.log(answer);



}

//This function collects the expression in the calculator for solving

function getExpressionInDisplay(){

    let displayValue= calcDisplay.value;
    let exprArray= displayValue.split(/([^0-9\.])/);
        
        
       
        console.log(displayValue);
        console.log(exprArray);

        const emptyIndex=exprArray.findIndex((item)=>{
            return item==='';
        });

        console.log(emptyIndex);

        if (emptyIndex>=0){
            exprArray=[
                ...exprArray.slice(0, emptyIndex),
                ...exprArray.slice(emptyIndex+1)
            ];
        }

        console.log(exprArray);
        return exprArray;


}

displayButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
       
        calcDisplay.value+=btn.textContent;
        let nextSymbol="";

        displayValArray=getExpressionInDisplay();

        

       if(displayValArray.length===4){
           nextSymbol=displayValArray[3];
            const displayAnswer=getAnswer(displayValArray);
            calcDisplay.value=displayAnswer+nextSymbol;
          
       
    }

   



    });

});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
    calcDisplay.value="";

});

equalButton.addEventListener('click', ()=>{
    calcDisplay.value=getAnswer(getExpressionInDisplay());
    
     


});



