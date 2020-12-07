const util = {
	clearInput: function() {
		gid('crud-firstname').value = '';
		gid('crud-lastname').value = '';
	}
}

const app = {
	selected: function() { 
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

	create: (function() {
		gid('crud-create').addEventListener('click', () => {
			let firstName = gid('crud-firstname').value;
			let lastName = gid('crud-lastname').value;
			let row = gid('crud-table').insertRow(0).insertCell(0);

			row.innerHTML = `${firstName}, ${lastName}`;
			app.selected();
		})
	})(),

	update: (function() {
		gid('crud-update').addEventListener('click', () => {
			gcn('selected')[0].innerText = `${gid('crud-firstname').value}, ${gid('crud-lastname').value}`
			console.log(gcn('selected'));
		})
	})(),

	delete: (function() {
		gid('crud-delete').addEventListener('click', () => {
			if (gcn('selected')[0] === undefined) return;
			gcn('selected')[0].remove();
			util.clearInput();
		})
	})(),
}
