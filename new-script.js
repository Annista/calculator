

const operatorButtons= document.querySelectorAll('.oper-button');
const numButtons= document.querySelectorAll('.num-button');
const displayButtons= document.querySelectorAll('.disp-button');
const calcDisplay= document.querySelector('#calculator-display');
const exprDisplay=document.querySelector('#expr-display');
const answerDisplay=document.querySelector('#answer-display');
const clearButton= document.querySelector('#clear-button');
const equalButton= document.querySelector('#equal-button');
const divideButton= document.querySelector('#divide-button');
const multiplyButton= document.querySelector('#multiply-button');
const decimalButton=document.querySelector('#decimal-button');
const backspaceButton=document.querySelector('#backspace-button');

const divSymbol=divideButton.textContent;
const multSymbol=multiplyButton.textContent;

const regexString= `([${divSymbol}${multSymbol}\/\*+\-])`;
const symbRegex=new RegExp(regexString, "g");

let hasOperationEnded;    //flag to tell the program that the current operation has ended, so it can start over

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
        
        if(result===Infinity || result===-Infinity){                                     //  the result would be Infinity if 
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
        
        return +(Math.round(arr[0] + "e+2")  + "e-2");
    }

    const answer= operate(arr[0], symbol, arr[2]) ;
   

    //return Math.round((answer + Number.EPSILON) * 100) / 100;
    return +(Math.round(answer + "e+2")  + "e-2");
   



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

  //tests whether or not the second number in the expression is a negative number
    function findNegativeNumber(arr){
        
        
      
      const itemTest=arr[2];
      const itemBefore=arr[1];
      const itemAfter=arr[3];
      let newArr=arr;

      
     

      if(itemTest==='-' && !Number.isFinite(parseFloat(itemBefore)) 
                                && Number.isFinite(parseFloat(itemAfter))){

        if(arr.length<=4){
            newArr=[
                ...arr.slice(0, 2),
                (0-arr[3]).toString()
            ];


        }else{
            newArr=[
                ...arr.slice(0, 2),
                (0-arr[3]).toString(),
                ...arr.slice(4)
            ];

        }
      }
      console.log(newArr);

      return newArr;
     


    }
  

   






//This function collects the expression in the calculator for solving

function getExpressionInDisplay(){


    let displayValue=`${exprDisplay.value}`;
   
   

    let exprArray=displayValue.split(symbRegex);
       
        //console.log(displayValue);
        console.log(exprArray);

       
       

        let updExprArray=removeWhitespaces(exprArray);
        console.log(updExprArray);

        if (updExprArray[0]==='+'){
            updExprArray=[
                   (0+parseFloat(updExprArray[1])).toString(),
                   ...updExprArray.slice(2)
               ];
            }
   

        

        if (updExprArray[0]==='-'){
            updExprArray=[
                   (0-updExprArray[1]).toString(),
                   ...updExprArray.slice(2)
               ];
   
             
           }
           console.log(updExprArray);

         const newUpdExprArray=findNegativeNumber(updExprArray);
         console.log(newUpdExprArray);
       
        return newUpdExprArray;
}

function clearCalculator(){
    exprDisplay.value="";
    answerDisplay.textContent="";

}

function placeNumbersAndSymbolsAtCaret(bn){

        exprDisplay.focus();
        const curPos= exprDisplay.selectionStart;
        console.log(curPos);
        const displText= exprDisplay.value;  
        const newText= displText.slice(0,curPos) + bn.textContent +displText.slice(curPos); 
        exprDisplay.value=newText;
        exprDisplay.selectionStart=curPos+1;
        exprDisplay.selectionEnd=curPos+1; 


}

function showExpressionsAndResults(btn){

    if(hasOperationEnded===true){
        clearCalculator();
        hasOperationEnded=false;
    }

    placeNumbersAndSymbolsAtCaret(btn);
        

       
       //exprDisplay.value+=btn.textContent;
      
        let nextSymbol="";


        console.log(exprDisplay.value);
        let displayValArray=getExpressionInDisplay();
        console.log(displayValArray);

        if(displayValArray.length===3){

            if (displayValArray[0]==='+'){
                displayValArray=[
                       '0',
                       ...displayValArray
                   ];

                      
       
                 
               }


        }


       console.log(displayValArray); 
        
  
    if(displayValArray.length===4){
        try{

            

           if(displayValArray[2]==='+' || displayValArray[2]==='-' || displayValArray[2]===divSymbol 
                        || displayValArray[2]===multSymbol){
                
                throw 'Syntax Error';
               
            }


            
    
            nextSymbol=displayValArray[3];
             const displayAnswer=getAnswer(displayValArray);
             answerDisplay.textContent=displayAnswer;
             exprDisplay.value=displayAnswer+nextSymbol;
           

        }catch(error){
            answerDisplay.textContent=error;
            hasOperationEnded=true;
        }
        
    
     }

       

   


   }

displayButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{

        showExpressionsAndResults(btn);

    });

});

decimalButton.addEventListener('click', ()=>{
    if(hasOperationEnded===true){
        exprDisplay.value="";
        answerDisplay.textContent="";
        hasOperationEnded=false;
    }
   
    const displayArray=getExpressionInDisplay();

    const lastItemInArray=displayArray[displayArray.length-1];
    console.log(lastItemInArray%1 === 0 );
    console.log(!Number.isFinite(parseFloat(lastItemInArray)));

    if(lastItemInArray%1 === 0 || !Number.isFinite(parseFloat(lastItemInArray))){
        //exprDisplay.value+=decimalButton.textContent;
        placeNumbersAndSymbolsAtCaret(decimalButton);

    }

});

backspaceButton.addEventListener('click', ()=>{

    let exprArrayInd=getExpressionInDisplay();

    if(exprArrayInd.length!==0){
        exprDisplay.focus();
        const curPos= exprDisplay.selectionStart;
        console.log(curPos);
        const displText= exprDisplay.value; 
        const newText= displText.slice(0,curPos-1)  +displText.slice(curPos); 
        exprDisplay.value=newText;
        exprDisplay.selectionStart=curPos-1;
        exprDisplay.selectionEnd=curPos-1; 
      

    /*const lastItemInDisplay=exprArrayInd[exprArrayInd.length-1];
    //console.log(lastItemInDisplay);
    console.log(lastItemInDisplay.split(""));
    const lastItemDisplayArray=lastItemInDisplay.split("");

    lastItemDisplayArray.splice(lastItemDisplayArray.length-1);
    const newlastItemInDisplay=lastItemDisplayArray.join("");
    //console.log(lastItemDisplayArray);

   
    exprArrayInd=[
        ...exprArrayInd.slice(0, exprArrayInd.length-1),
        newlastItemInDisplay
    ];


    exprDisplay.value=exprArrayInd.join("");*/
}
    

  


});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
  clearCalculator();

});

//When the button equalButton is clicked,  the calculator display
// will show the solution of the expression immediately 

equalButton.addEventListener('click', ()=>{

    const finalExpression=getExpressionInDisplay();
    console.log(finalExpression[finalExpression.length-1]);

   

    try{

        //if the first item in the expression is a  division or multiplication sign,
        //a syntax error message will be displayed

        if(finalExpression[0]===divSymbol 
                     || finalExpression[0]===multSymbol){

            throw 'Syntax Error';

         }

        

     //if the last item in the expression is a sign, a syntax error message will be displayed       
     if(finalExpression[finalExpression.length-1]==='+' || finalExpression[finalExpression.length-1]==='-'
                || finalExpression[finalExpression.length-1]===divSymbol 
                     || finalExpression[finalExpression.length-1]===multSymbol){

            throw 'Syntax Error';

         }
         console.log(getAnswer(finalExpression));
            answerDisplay.textContent=getAnswer(finalExpression);
            hasOperationEnded=true;
       

        

    }catch(error){
        answerDisplay.textContent=error;
        hasOperationEnded=true;
    }
  
    
     


});


//to ensure that the only keys displayed on the calculator are numbers and arithmetic signs
exprDisplay.addEventListener('keydown', function(event) {
   
  
    if(!(/[0-9]/g.test(event.key) || /[\-+.]/g.test(event.key) || event.key==='Backspace' 
                || event.key==='Delete' || event.key==='ArrowLeft' || event.key==='ArrowRight' ) ){

       event.preventDefault();
       
    } 

    if(event.key==='/'){
        exprDisplay.value+=divSymbol;    // when the slash on the keyboard is pressed, the division sign is displayed 
    }

    if(event.key==='*'){
        exprDisplay.value+=multSymbol;    // when the asterick on the keyboard is pressed, the multiplication sign is displayed 
    }
});





