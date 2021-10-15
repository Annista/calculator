

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

const regexString= `([${divSymbol}${multSymbol}\/\*+\-])`;
const symbRegex=new RegExp(regexString, "g");

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



//When the calculator display string ends in a symbol, a whitespace is put after it
//when it is split into an array. The function below was created to remove these whitespaces

function removeWhitespaces(arr){


    const emptyIndex=arr.findIndex((item)=>{
        return item==='';
    });

    if(emptyIndex===-1){
        return arr;
    }

    const newArr=[
            ... arr.slice(0, emptyIndex),
            ... arr.slice(emptyIndex+1)
        ];

    return removeWhitespaces(newArr);    

    }
  

   






//This function collects the expression in the calculator for solving

function getExpressionInDisplay(){

    let displayValue=`${calcDisplay.value}`;
   

    let exprArray=displayValue.split(symbRegex);
       
        //console.log(displayValue);
        //console.log(exprArray);
       

        const updExprArray=removeWhitespaces(exprArray);
        //console.log(updExprArray);

        


       
        return updExprArray;


}

displayButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        
       
        calcDisplay.value+=btn.textContent;
        let nextSymbol="";


        console.log(calcDisplay.value);
        const displayValArray=getExpressionInDisplay();
        console.log(displayValArray);

        
  
    if(displayValArray.length===4){
        try{

           if(displayValArray[2]==='+' || displayValArray[2]==='-' || displayValArray[2]===divSymbol 
                        || displayValArray[2]===multSymbol){
                
                throw 'Syntax Error';
               
            }

            
    
            nextSymbol=displayValArray[3];
             const displayAnswer=getAnswer(displayValArray);
             calcDisplay.value=displayAnswer+nextSymbol;
           

        }catch(error){
            calcDisplay.value=error;
        }
        
    
 }

       

   



    });

});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
    calcDisplay.value="";

});

equalButton.addEventListener('click', ()=>{

    const finalExpression=getExpressionInDisplay();
    console.log(finalExpression[finalExpression.length-1]);

   

    try{

        

            
     if(finalExpression[finalExpression.length-1]==='+' || finalExpression[finalExpression.length-1]==='-'
                || finalExpression[finalExpression.length-1]===divSymbol 
                     || finalExpression[finalExpression.length-1]===multSymbol){

            throw 'Syntax Error';

         }
            calcDisplay.value=getAnswer(finalExpression);

       

        

    }catch(error){
        calcDisplay.value=error;
    }
  
    
     


});



