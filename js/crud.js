const util = {
	clearInput: function() {
		gid('crud-firstname').value = ''; gid('crud-lastname').value = ''; gid('crud-filter').value = '';
	},

	filter: function() {
		// Credit - w3schools: https://www.w3schools.com/howto/howto_js_filter_lists.asp
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
	}
}

const app = {
	init: function() {
		this.crudCreate();
		this.crudUpdate();
		this.crudDelete();
		this.crudFilter();
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
			let firstName = gid('crud-firstname').value;
			let lastName = gid('crud-lastname').value;
			let row = gid('crud-table').insertRow(0).insertCell(0);

			row.innerHTML = `${firstName}, ${lastName}`;
			app.crudSelected();
		})
	},

	crudUpdate: function() {
		gid('crud-update').addEventListener('click', () => {
			gcn('selected')[0].innerText = `${gid('crud-firstname').value}, ${gid('crud-lastname').value}`
			console.log(gcn('selected'));
		})
	},

	crudDelete: function() {
		gid('crud-delete').addEventListener('click', () => {
			if (gcn('selected')[0] === undefined) return;
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
