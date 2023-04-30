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
    let passwords = [];
    for (let i = 0; i < 4; i++) {
      passwords.push(generateRandomPassword(parseInt(rangeSlider.value)))
    }

    passOneDisp.innerText = passwords[0];
    passTwoDisp.innerText = passwords[1];
    passThreeDisp.innerText = passwords[2];
    passFourDisp.innerText = passwords[3];
  } else {
    alert ('Please check atleast one option to generate password.')
  }
})

rangeInputBox.addEventListener('change', () => {
  if (parseInt(rangeInputBox.value) > 25 || parseInt(rangeInputBox.value) < 1) {
    alert('Error: Value must be within 1-25.');
    setTimeout(() => {
      rangeSlider.value = 10;
      rangeInputBox.value = 10;
    }, 300);
    return;
  }
});

rangeSlider.addEventListener('input', () => {
  rangeInputBox.value = rangeSlider.value;
});

function generateRandomPassword(length) {
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
    // let randomCharType = characterTypes[Math.floor(Math.random() * characterTypes.length)];
    // let randomCharType = characterTypes[Math.floor(crypto.randomInt(characterTypes.length))];
    let randomCharType = characterTypes[Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * characterTypes.length)];

    // choose a random character from the chosen character type
    // let randomChar = randomCharType[Math.floor(Math.random() * randomCharType.length)];
    // let randomChar = randomCharType.charAt(crypto.randomInt(randomCharType.length));
    let randomChar = randomCharType.charAt(Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * randomCharType.length));

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
}

pwdDisplay.addEventListener('click', (e) => {
  e.preventDefault();

  // Check if the clicked element is a password slot (with class 'pwd')
  if (e.target.classList.contains("pwd")) {
    // Get the password value from the clicked element
    const password = e.target.innerText;

    // If the password value is empty or already hidden, do nothing
    if (password === '' || password === '•••') {
      return;
    }

    // Otherwise, copy the password to the clipboard
    copyClipBoard(password);
      
    // Create a tooltip element to show 'Copied!' message
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = 'Copied!';
    
    // Append the tooltip element to the clicked password slot
    const div = e.target;
    div.appendChild(tooltip);

    // Remove the tooltip after 0.5 seconds
    setTimeout(() => {
      div.removeChild(tooltip);
    }, 500);
  }
})
