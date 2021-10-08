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

    if(result===Infinity){
        return 'MATH Error: Number cannot be divided by zero';
    }else{
        if (isNaN(result)){
            return 'Inconclusive';
        }else{
            return result;
      }
  }
}

function operate(num1, operator, num2){

    switch(operator){
        case '+':
            return add(num1, num2);
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

console.log(subtract((add(9, (multiply((divide(18, 12)), 81)))), 7));
console.log(divide(9, 0));
console.log(add(5, 6));

console.log(operate(4, '+', 2));
console.log(operate(3, '/', 6));
console.log(operate(9, '*', 9));
console.log(operate(15, '/', 0));