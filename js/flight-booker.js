const fbSelect = gid("fb-inputs-select");
const fbDateReturn = gid("fb-dr");
const confirmFb = gid('confirm-fb');
const fbDl = gid('fb-dl');
const fbDr = gid('fb-dr');
const canBook = gid('book-success');

function inputsColor(n, color) { gcn('inputs-fb')[n].style.backgroundColor = color; }
function cBlock(value, html) { if (confirmFb.disabled === false && fbSelect.value === value) { canBook.innerHTML += html; } }
(function inputDefaults() { fbDl.value = ''; fbDr.value = ''; })();
(function guiDefaults() { 
	fbSelect.value = 'one-way';
	canBook.style.display = 'none';
	fbSelect.value === 'return' ? fbDateReturn.disabled = false : fbDateReturn.disabled = true;
	confirmFb.disabled = true;
})();

(function checkFlightReturn() {
	fbSelect.addEventListener("change", () => {
		canBook.style.display = 'none'; fbDl.value = ''; fbDr.value = '';
		inputsColor(0, '#fff'); inputsColor(1, '#fff');
		fbSelect.value === "one-way" ? fbDateReturn.disabled = true : fbDateReturn.disabled = false;
	});
})();

function dateInputValid(id, n) {
	id.addEventListener('keyup', () => {
		console.log('confirmFb.disabled is', confirmFb.disabled);
		let input = id.value;
				date = new Date(input),
				x = fbDl.value.replace(/-|\s|\./gi, ''),
				y = fbDr.value.replace(/-|\s|\./gi, '');

		if (date <= new Date() || isNaN(Date.parse(date))) {
			inputsColor(n, '#ff8080');
			confirmFb.disabled = true;
		} else {
			inputsColor(n, '#fff');
			confirmFb.disabled = false;
		} 

		if (parseInt(x) > parseInt(y) || fbDr.value === '') { console.log(fbDr.value); confirmFb.disabled = true };
		if (input === '') { inputsColor(n, '#fff') };
		if (fbSelect.value === 'one-way') { fbDr.value = fbDl.value };
	})
}

dateInputValid(fbDl, 0);
dateInputValid(fbDr, 1);

(function confirm() {
	confirmFb.addEventListener('click', () => {
		let faClose = '<i class="fa fa-times" style="font-size:13px"></i>'

		canBook.style.display = 'block';
		canBook.style.backgroundColor = '#f7f7f7';
		canBook.innerHTML = '';

		cBlock('one-way', `${faClose}<p> You have booked a ${fbSelect.value} flight on
		 ${fbDl.value}</p>`);
		cBlock('return', `${faClose}<p> You have booked a ${fbSelect.value} flight leaving on
			${fbDl.value} and returning on ${fbDr.value}</p>`);
		gcn('fa-times')[0].addEventListener('click', () => {canBook.style.display = 'none'})
	})
})();

