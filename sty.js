const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols='!@$%^&*()_+=-*.'
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set strength circle color =grey
setIndicator("#ccc");
//Set pwd length
// password length UI var copy karnar
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateuppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generatelowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateSymbols(){
    return symbols.charAt(generateRandomNumber(0,symbols.length));
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function shufflepassword(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));
        let t=array[i];
        array[i]=array[j];
        array[j]=t;
    }

    let str=""
    array.forEach((el)=>(str+=el))
    return str;
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked)hasNum=true;
    if(symbolsCheck.checked)hasSym=true;

    if(hasLower&&hasNum&&hasSym){
        setIndicator("green");
    }else if(hasLower&&hasSym){
        setIndicator("yellow");
    }else{
        setIndicator("red");
    }
}

async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed"
    }//To make copy span visible
    copyMsg.classList.add("active");
   
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000)
}

//shuffel

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })
    console.log("Check zala");

    if(passwordLength<checkCount)
    { 
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
        checkbox.addEventListener('change',handleCheckBoxChange());
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{
        //none of the checkbox are selected
        handleCheckBoxChange();
        console.log("start0");
        // if(checkCount==0) return;
        if(passwordLength<checkCount){
            passwordLength=checkCount;
            handleSlider();
        }
        //New Password Generate
        console.log('Started1');
        password="";

        
        // let remained=password.length-checkCount;
        let funarr=[];
        if(uppercaseCheck.checked)
            funarr.push(generateuppercase);
        if(lowercaseCheck.checked)
            funarr.push(generatelowercase);
        if(symbolsCheck.checked)
            funarr.push(generateSymbols);
        if(numbersCheck.checked)
            funarr.push(generateRandomNumber);
        console.log(funarr);
        for(let i=0;i<funarr.length;i++){
            let p=(funarr[i]());
            password+=p;
        }
        console.log('Cumpulsory addition done');
        console.log(funarr);
        for(let i=0;i<passwordLength-funarr.length;)
        {
            let r=generateRandomNumber(0,funarr.length-1);
            if(r<funarr.length)
            {let p=(funarr[r]());
            password+=p;
            i++}
        }     

        console.log('Final PWD created');

        //Shuffel PAssword
        //ARRAY tayar karun pass karaycha function la shuffel
        password=shufflepassword(Array.from(password));

        passwordDisplay.value=password;
        //UI addition done
        //calculate strength
        calcStrength();


})