

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

        if(Number.isFinite(parseFloat(arr[0]))){
        
            return +(Math.round(arr[0] + "e+2")  + "e-2");
        }else{

            throw 'Syntax Error!';

            //if the only item in the array is an operator, an syntax error will be displayed

        }
    }


    //if the first item or third item in the array is an operator, a syntax error message will be displayed

    if(!Number.isFinite(parseFloat(arr[0])) || !Number.isFinite(parseFloat(arr[2])) ){
        throw 'Syntax Error!';

    }


    const answer= operate(arr[0], symbol, arr[2]) ;
   

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


      return newArr;
     


    }

    function findSingleDecimal(arr){

       

        const ind= arr.findIndex(item=>(item==='.'));
        if (ind===-1){
            
            return arr;
        }
        
        
            const nArr=[
                 ...arr.slice(0, ind),
                 '0.0',
                 ...arr.slice(ind+1)
             ]
         
             
            
        return findSingleDecimal(nArr);

        
    }
  

   






//This function collects the expression in the calculator for solving

function getExpressionInDisplay(){


    let displayValue=`${exprDisplay.value}`;
   
   

    let exprArray=displayValue.split(symbRegex);
       
       

       
       

        let updExprArray=removeWhitespaces(exprArray);
        
        

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

           updExprArray=findSingleDecimal(updExprArray);
           
          

         const newUpdExprArray=findNegativeNumber(updExprArray);

         
        
       
        return newUpdExprArray;
}


//clears calculator display (expression and answer parts)
function clearCalculator(){
    exprDisplay.value="";
    answerDisplay.textContent="";

}


//puts numbers and symbols at the cursor (caret) location
function placeNumbersAndSymbolsAtCaret(btxt){
   

        exprDisplay.focus();
        const curPos= exprDisplay.selectionStart;
        const displText= exprDisplay.value;  
        const newText= displText.slice(0,curPos) + btxt +displText.slice(curPos); 
        exprDisplay.value=newText;
        exprDisplay.selectionStart=curPos+1;
        exprDisplay.selectionEnd=curPos+1; 


}

//collects the current expression in the display. When a full operation is entered, it collects 
//and displays the answer with the next operator 

function evaluateExpression(){
    let nextSymbol="";
    
    let displayValArray=getExpressionInDisplay();
    
    if(displayValArray.length===3){

        if (displayValArray[0]==='+'){
            displayValArray=[
                   '0',
                   ...displayValArray
               ];

                  
   
             
           }


    }


   
   
    
if(displayValArray.length===4){
    try{

        

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


// displays all numbers and symbols entered in the calculator display
// and also the result of each operation (a+b)
function showExpressionsAndResults(btext){

    if(hasOperationEnded===true){
        clearCalculator();
        hasOperationEnded=false;
    }

    placeNumbersAndSymbolsAtCaret(btext);
    evaluateExpression();   
       

   }

displayButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{

        showExpressionsAndResults(btn.textContent);

    });

});

function addDecimal(){
    if(hasOperationEnded===true){
        exprDisplay.value="";
        answerDisplay.textContent="";
        hasOperationEnded=false;
    }
   
    const displayArray=getExpressionInDisplay();

    const lastItemInArray=displayArray[displayArray.length-1];
    

    if(lastItemInArray%1 === 0 || !Number.isFinite(parseFloat(lastItemInArray))){
        placeNumbersAndSymbolsAtCaret(decimalButton.textContent);

    }
}

decimalButton.addEventListener('click', ()=>{
    addDecimal();
    

});

backspaceButton.addEventListener('click', ()=>{
    
    //Removes a single item to the left of the cursor (caret)

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
      

    
}
    

  


});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
  clearCalculator();

});


//to find and give the final solution of the current expression, thus ending the entire operation

function findSolution(){

    const finalExpression=getExpressionInDisplay();
    
    

   

    try{

      
   
            answerDisplay.textContent=getAnswer(finalExpression);

      
         
            
            hasOperationEnded=true;
       

        

    }catch(error){
        answerDisplay.textContent=error;
        hasOperationEnded=true;
    }
  
    
     


}

//When the button equalButton is clicked,  the calculator display
// will show the solution of the expression immediately 

equalButton.addEventListener('click', ()=>{

    findSolution();
  

});


//keyboard support: to ensure that the only keys displayed on the calculator 
//are numbers and arithmetic signs

document.addEventListener('keydown', function(event) {
    
   exprDisplay.focus();
  
  
    if(!( event.key==='Backspace' || event.key==='Delete' || event.key==='ArrowLeft' 
                                                              || event.key==='ArrowRight') ){

       event.preventDefault();
       
    } 

    //Making the digits and operator keys behvave like the buttons on the calculator

   if((/[0-9]/g.test(event.key) || /[\-+]/g.test(event.key) )){
        showExpressionsAndResults(event.key);
    }

    if (event.key==='.'){
        addDecimal();

    }

    if(event.key==='/'){
        showExpressionsAndResults(divideButton.textContent);   

        // when the slash on the keyboard is pressed, the division sign is displayed 
        
    }

    if(event.key==='*'){
        showExpressionsAndResults(multiplyButton.textContent);  

         // when the asterick on the keyboard is pressed, the multiplication sign is displayed 
        
    }

    if (event.key==='Enter'){
        findSolution();
    }
});





