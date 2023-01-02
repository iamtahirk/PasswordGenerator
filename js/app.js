const rangeInputBox = document.getElementById('rangenuminput');
const rangeSlider = document.getElementById('rangeslider');

const pwdDisplay = document.getElementById('pwddisplay');

const passOneDisp = document.getElementById('passone');
const passTwoDisp = document.getElementById('passTwo');
const passThreeDisp = document.getElementById('passThree');
const passFourDisp = document.getElementById('passFour');

const lowerCaseCheck = document.getElementById('lcase');
const upperCaseCheck = document.getElementById('ucase');
const numberCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generatePwdBtn = document.getElementById('pwdgeneratebtn');


generatePwdBtn.addEventListener('click', (e)=> {
  e.preventDefault();

  if (lowerCaseCheck.checked || upperCaseCheck.checked || numberCheck.checked || symbolsCheck.checked) {
    let stringPWD = [];
    for (let i = 0; i < 4; i++) {
      stringPWD.push(generatePassword(parseInt(rangeSlider.value)))
    }

    // console.table(stringPWD, stringPWD[0].length, stringPWD[1].length, stringPWD[2].length, stringPWD[3].length);
    // console.log(stringPWD[0].length, stringPWD[1].length, stringPWD[2].length, stringPWD[3].length);

    passOneDisp.innerText = stringPWD[0];
    passTwoDisp.innerText = stringPWD[1];
    passThreeDisp.innerText = stringPWD[2];
    passFourDisp.innerText = stringPWD[3];
  } else {
    alert ('Please check atleast one option to generate password.')
  }
})

rangeInputBox.addEventListener('change', () => {
  if (parseInt(rangeInputBox.value) > 25 || parseInt(rangeInputBox.value) < 1) {
    alert('Error: Value must be within 1-25.');
    setTimeout(() => {
      rangeSlider.value = 8;
      rangeInputBox.value = 8;
    }, 300);
  }
  rangeSlider.value = rangeInputBox.value;
});

rangeSlider.addEventListener('input', () => {
  rangeInputBox.value = rangeSlider.value;
});


function generatePassword(length) {
  let characterTypes = [];
  let password = "";

  if (lowerCaseCheck.checked) {
    characterTypes.push("abcdefghijklmnopqrstuvwxyz");
  }
  if (upperCaseCheck.checked) {
    characterTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if (numberCheck.checked) {
    characterTypes.push("0123456789");
  }
  if (symbolsCheck.checked) {
    characterTypes.push("!@#$%^&*()-_+={}[]|:;<>,.?/~`");
  }

  for (let i = 0; i < length; i++) {
    // choose a random character type from the characterTypes array
    let randomCharType = characterTypes[Math.floor(Math.random() * characterTypes.length)];
    // choose a random character from the chosen character type
    let randomChar = randomCharType[Math.floor(Math.random() * randomCharType.length)];
    // add the random character to the password
    password += randomChar;
  }
  return password;
}


const copyClipBoard = (pass) => {
  const textarea = document.createElement('textarea');
	const password = pass;
	
	if(!password || password == '•••') { 
    // console.log('Error: Could not copy!!');
    return;
   }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

  // alert ('Password Copied.')
}


pwdDisplay.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log(e.target.getAttribute("class"));

  /*
  If condition is to avoid event delegation and not triggering the copied 
  message's Background color rendering on whole layout if clicked other than pswd slots.
  */
  if (e.target.getAttribute("class") == 'pwd') {
    if(!e.target.innerText || e.target.innerText == '•••') { 
      // console.log('Error: Could not copy!!');
      return;
    } else if (e.target && e.target.nodeName == "DIV") {
      copyClipBoard(e.target.innerText);
      
      const div = e.target;
      
      const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = 'Copied!';
  
        div.appendChild(tooltip);
  
        setTimeout(() => {
          div.removeChild(tooltip);
        }, 500);
    }
  }
})
