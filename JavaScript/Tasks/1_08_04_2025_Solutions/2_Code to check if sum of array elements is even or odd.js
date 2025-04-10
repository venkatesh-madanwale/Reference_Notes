//Code to check if sum of array elements is even or odd

let arr = [1,2,3,4,4,5,5,6,6,2,7]
let sum = arr.reduce((x,y)=>x+y)
sum%2==0?console.log("Sum is even"):console.log("Sum is odd")