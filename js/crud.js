const util = {
	clearInput: function() {
		gid('crud-firstname').value = ''; gid('crud-lastname').value = ''; gid('crud-filter').value = '';
	},

	filter: function() {
		let input, filter, td, a, txtValue;
		input = gid('crud-filter');
		filter = input.value.toUpperCase();
		td = gtn('td');

		for (let i = 0; i < td.length; i++) {
			a = td[i];
			txtValue = a.textContent || a.innerText;

			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				td[i].style.display = "";
			} else {
				td[i].style.display = "none";
			}
		}
	},

	uuid: function() {
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
		}

		return uuid;
	},

	store: function (namespace, data) {
		if (arguments.length > 1) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}
	},

	// TODO: 
	// 1. we are typing the same thing over and over, do less of that...
	// 2. create bindEvents method, where eventlisteners are declared 
	// 3. rework crudSelected method

	getSelected: function() { /* return selected so we can repeat less */ },

	nameInput: function(/*id?*/) { /* return inputs.value here */ },

	rowTd: function() { /* shorthand insert td to corresponding row */ },
}

const app = {
	init: function() {
		this.renderLocalStorage();
		this.crudCreate();
		this.crudUpdate();
		this.crudDelete();
		this.crudFilter();
	},

	renderLocalStorage: function() {
		let keys = Object.keys(localStorage);

		for (let i = 0; i < localStorage.length; i++) {
			let row = gid('crud-table').insertRow(0).insertCell(0),
					nKey = localStorage.getItem(keys[i]);
					nKeyParse = JSON.parse(nKey);

			row.setAttribute('id', keys[i]);
			row.innerHTML = `${nKeyParse.first_name}, ${nKeyParse.last_name}`;
		}
		this.crudSelected();
	},

	crudSelected: function() { 
		let tr = qsa('tr');

		for (let i = 0; i < tr.length; i++) {
			tr[i].addEventListener('click', () => {
				for (let i = 0; i < tr.length; i++) {
					if (tr[i].classList.contains('selected')) tr[i].classList.remove('selected');
				}

				tr[i].classList.add('selected');
				gid('crud-firstname').value = tr[i].innerText.replace(/,.*/, '');
				gid('crud-lastname').value = tr[i].innerText.replace(/\b(\w+)\W*/, '');
			})
		}
	},

	crudCreate: function() {
		gid('crud-create').addEventListener('click', () => {
			let firstName = gid('crud-firstname').value,
					lastName = gid('crud-lastname').value,
					row = gid('crud-table').insertRow(0).insertCell(0),
					key = util.uuid();

			row.innerHTML = `${firstName}, ${lastName}`;
			row.setAttribute('id', key);
			util.store(key, { first_name: firstName, last_name: lastName });
			this.crudSelected();
			console.log(key, 'added to localStorage');
		})
	},

	crudUpdate: function() {
		gid('crud-update').addEventListener('click', () => {
			let key = gcn('selected')[0].children[0].id,
					firstName = gid('crud-firstname').value,
					lastName = gid('crud-lastname').value;

			localStorage.setItem(key, JSON.stringify({ first_name: firstName, last_name: lastName }));
			gcn('selected')[0].children[0].innerHTML = `${firstName}, ${lastName}`;
			console.log('updated', key, 'in localStorage');
			this.crudSelected();
		})
	},

	crudDelete: function() {
		gid('crud-delete').addEventListener('click', () => {
			let key = gcn('selected')[0].children[0].id

			if (gcn('selected')[0] === undefined) return;

			localStorage.removeItem(key);
			console.log(key, "removed from localStorage");

			gcn('selected')[0].remove();
			util.clearInput();
		})
	},

	crudFilter: function() {
		gid('crud-filter').addEventListener('keyup', () => { util.filter(); })
	},
}

app.init();
window.onload = util.clearInput;
