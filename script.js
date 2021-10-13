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
const displayButtons= document.querySelectorAll('.disp-button');
const calcDisplay= document.querySelector('#calculator-display');
const clearButton= document.querySelector('#clear-button');
const equalButton= document.querySelector('#equal-button');
const divideButton= document.querySelector('#divide-button');
const multiplyButton= document.querySelector('#multiply-button');

const divSymbol=divideButton.textContent;
const multSymbol=multiplyButton.textContent;
let finalAnswer=0;



//   For the following function:
//   When any of the calculator buttons (numbers and arithmeric operations) 
//   are clicked, it will be shown on the display where the cursor is located

function displayNumAndOper(bn){


    
    calcDisplay.focus();
    const curPos= calcDisplay.selectionStart;
   /*if((document.activeElement!==calcDisplay) && (typeof finalAnswer!== 'undefined')){
        calcDisplay.value=" ";
    }*/
    const displText= calcDisplay.value;  
    const newText= displText.slice(0,curPos) + bn.textContent +displText.slice(curPos); 
    calcDisplay.value=newText;
    calcDisplay.selectionStart=curPos+1;
    calcDisplay.selectionEnd=curPos+1;  

    console.log(typeof finalAnswer);
    console.log(document.activeElement!==calcDisplay);
    
   
    
}



displayButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
       
        displayNumAndOper(btn);


    });

});


//To clear the display of the calculator

clearButton.addEventListener('click', ()=>{
    calcDisplay.value="";

});

//to ensure that the only keys displayed on the calculator are numbers and arithmetic signs
calcDisplay.addEventListener('keydown', function(event) {
  
    if(!(/[0-9]/g.test(event.key) || /[\-+]/g.test(event.key) || event.key==='Backspace' 
                || event.key==='Delete' || event.key==='ArrowLeft' || event.key==='ArrowRight' ) ){

       event.preventDefault();
       
    } 

    if(event.key==='/'){
        displayNumAndOper(divideButton);    // when the slash on the keyboard is pressed, the division sign is displayed 
    }

    if(event.key==='*'){
        displayNumAndOper(multiplyButton);   // when the asterick on the keyboard is pressed, the multiplication sign is displayed 
    }

    if(event.key==='Enter'){
        getAnswer();                        // when the enter key on the keyboard is pressed, 
                                            // the answer of the expression is found and displayed
    }                       




    console.log(event.key);
   
  });


function calcDivideMultiply(arr){ //preferred function
    let symbol='';

    const index= arr.findIndex(item=> (item===divSymbol || item===multSymbol) );

    if (index===-1) { return arr; }
    
    const dispSymbol= arr.find(item=> (item===divSymbol || item===multSymbol));

    (dispSymbol===divSymbol) ?  symbol= '/' : symbol= '*';  // Substitutes the division symbol displayed
                                                            // with the slash '/' and the multplication
                                                            // symbol with the asterick '*', since those 
                                                            // symbols are used by the operate function  
    
    
    
    const result=operate(arr[index-1], symbol, arr[index+1]);  

    const newArray=[
                    ...arr.slice(0, index-1),
                    result,
                    ...arr.slice([index+2])
                ];
    return calcDivideMultiply(newArray);
    
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
     return calcAddSubtract(newArray);


}

function getAnswer(){
    const displayValue= calcDisplay.value;
    const displayValArray= displayValue.split(/(\D)/);
    
    
    try{
    const arrayAfterDivMult= calcDivideMultiply(displayValArray);
    //console.log(arrayNext);
    //console.log(calcAddSubtract(arrayAfterDivMult));
    finalAnswer=calcAddSubtract(arrayAfterDivMult);
    calcDisplay.value+=`   ${finalAnswer}`;
    
   
    

    }catch(error){
        calcDisplay.value="";
        calcDisplay.value=error;
        //console.log(error);


    } 

    console.log( finalAnswer);
    console.log(document.activeElement!==calcDisplay);
   
}


equalButton.addEventListener('click', ()=>{
    getAnswer();
     


});



