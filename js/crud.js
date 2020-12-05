var arr;

const util = {
	uuid: function () {
		/*jshint bitwise:false */
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

	word: function(name, lastname) {
		if (typeof(name) === 'string' && typeof(lastname) === 'string') { return true; }
		return false;
	},
}

const crud = {
	init: function() {
		// TODO: do more stuff here
		arr = util.store('crud');
	},

	selected: function() { 
		let tr = qsa('tr');

		for (let i = 0; i < tr.length; i++) {
			tr[i].addEventListener('click', () => {
				for (let i = 0; i < tr.length; i++) {
					if (tr[i].classList.contains('selected')) tr[i].classList.remove('selected');
				}

				tr[i].classList.add('selected');
				// TODO: access corresponding object to 'selected' in crud object 
				// in local storage, set name inputs to respective key pair values
			})
		}
	},

	create: (function() {
		gid('crud-create').addEventListener('click', () => {
			let firstName = gid('crud-firstname').value;
			let lastName = gid('crud-lastname').value;

			if (util.word(firstName, lastName) === true) {
				arr.push({
					id: util.uuid(),
					firstName: firstName,
					lastName: lastName
				})
			}

			util.store('crud', arr);

			let row = gid('crud-table').insertRow(0).insertCell(0);

			row.innerHTML = `${firstName}, ${lastName}`
			crud.selected();
		})
	})(),

	delete: (function() {
		gid('crud-delete').addEventListener('click', () => {
			if (gcn('selected')[0] === undefined) return;

			gcn('selected')[0].remove();
			// TODO: remove corresponing obj in crud local storage
		})
	})(),

	// TODO: 
	// 1. also update corresponding crud object in local storage
	update: (function() {
	// don't think we need to IIFE this
	})(),
}

crud.init();
