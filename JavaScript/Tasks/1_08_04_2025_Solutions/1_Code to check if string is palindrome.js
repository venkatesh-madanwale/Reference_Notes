// Code to check if string is palindrome

// let s = "venkateshhsetaknev"
let s = "madddamd"
for(let i=0,j=s.length-1;i<=j;i++,j--){
    if(s[i]!=s[j]){
        console.log("Not a palindrome")
        break
    }
    else{
        console.log("Palindrome")
        break
    }
}