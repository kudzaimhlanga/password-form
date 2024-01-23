//RESOURCES
// https://bobbyhadz.com/blog/javascript-check-if-letter-in-string-is-uppercase-or-lowercase#check-if-letter-in-string-is-uppercase-or-lowercase-using-regexptest
// https://www.threads.net/@zanderwhitehurst/post/C2T8-y6Lrn8/?igshid=NjFhOGMzYTE3ZQ%3D%3D

(() => {
	const passwordShowBtn = document.querySelector('.pass-show');
	const form = document.querySelector('.form');
	const input = document.querySelector('.input');

	//UI
	const lengthMark = document.querySelector("[data-pass='length']");
	const lowercaseMark = document.querySelector("[data-pass='lower']");
	const uppercaseMark = document.querySelector("[data-pass='upper']");
	const numberMark = document.querySelector("[data-pass='number']");
	const specialMark = document.querySelector("[data-pass='special']");

    //progress UI
    const progressFill = document.querySelector(".progress-fill");
    const progressTrack = document.querySelector(".pass-stren-track");

	//toggle password visibility
	function togglePassword() {
		if (input.type === 'password') {
			input.type = 'text';
		} else {
			input.type = 'password';
		}
	}

	//validate input
    //TODO : PREVENT SPACES
	function validateInput(e) {
		const password = input.value.toString();
		let valid = true;
		let errors = [];

		if (password.length < 8) {
			valid = false;
			errors.push('length');
		}

		if (!checkLowerCase(password)) {
			valid = false;
			errors.push('lowercase');
		}

		if (!checkUpperCase(password)) {
			valid = false;
			errors.push('uppercase');
		}

		if (!checkNum(password)) {
			valid = false;
			errors.push('number');
		}

		if (!checkChar(password)) {
			valid = false;
			errors.push('character');
		}

		if (!valid) {
			// console.log(`Not valid because the password`, errors);
		} else {
			// console.log('Password is valid');
		}

		checkUI(errors);
	}

	//check if one letter is lowercase
	function checkLowerCase(string) {
		let hasLower = false;
		for (let i = 0; i < string.length; i++) {
			if (/^[a-z]+$/.test(string[i])) {
				hasLower = true;
			}
		}
		return hasLower;
	}

	//check if one letter is uppercase
	function checkUpperCase(string) {
		let hasUpper = false;
		for (let i = 0; i < string.length; i++) {
			if (/^[A-Z]+$/.test(string[i])) {
				hasUpper = true;
			}
		}
		return hasUpper;
	}

	//check if one letter is uppercase
	function checkNum(string) {
		let hasNum = false;
		for (let i = 0; i < string.length; i++) {
			if (/^[0-9]+$/.test(string[i])) {
				hasNum = true;
			}
		}
		return hasNum;
	}

	//check if for special character
	function checkChar(string) {
		let hasChar = false;
		for (let i = 0; i < string.length; i++) {
			if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(string[i])) {
				hasChar = true;
			}
		}
		return hasChar;
	}

	//update the UI has the password is being entered
	function checkUI(errors) {

        //check strength
		const progress = 100 - Math.round((errors.length / 5) * 100);
        progressFill.style.width = `${ progress}%`;
        
        console.log(progress)


        if(progress < 40){
            progressTrack.style.transform = "TranslateY(0%)";
        }

        if(progress === 40){
            progressTrack.style.transform = "TranslateY(-25%)";
        }

        if(progress === 80 || progress === 60){
            progressTrack.style.transform = "TranslateY(-50%)";
        }

        if(progress > 99){
            progressTrack.style.transform = "TranslateY(-75%)";
        }

		//check length
		if (errors.indexOf('length') >= 0) {
			lengthMark.classList.add('is-incomplete');
		} else {
			lengthMark.classList.remove('is-incomplete');
		}

		//check lowercase
		if (errors.indexOf('lowercase') >= 0) {
			lowercaseMark.classList.add('is-incomplete');
		} else {
			lowercaseMark.classList.remove('is-incomplete');
		}

		//check uppercase
		if (errors.indexOf('uppercase') >= 0) {
			uppercaseMark.classList.add('is-incomplete');
		} else {
			uppercaseMark.classList.remove('is-incomplete');
		}

		//check number
		if (errors.indexOf('number') >= 0) {
			numberMark.classList.add('is-incomplete');
		} else {
			numberMark.classList.remove('is-incomplete');
		}

		//check char
		if (errors.indexOf('character') >= 0) {
			specialMark.classList.add('is-incomplete');
		} else {
			specialMark.classList.remove('is-incomplete');
		}
	}

	function init() {
		form.addEventListener('submit', (e) => e.preventDefault());
		passwordShowBtn.addEventListener('click', togglePassword);
		input.addEventListener('input', validateInput);
	}

	init();
})();
