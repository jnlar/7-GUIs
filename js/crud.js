const util = {
	filter: function() {
		let input, filter, td, a, txtValue
		input = gid('crud-filter')
		filter = input.value.toUpperCase()
		td = gtn('td')

		for (let i = 0; i < td.length; i++) {
			a = td[i]
			txtValue = a.textContent || a.innerText

			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				td[i].style.display = ""
			} else {
				td[i].style.display = "none"
			}
		}
	},

	store: function (namespace, data) {
		if (arguments.length > 1) {
			return localStorage.setItem(namespace, JSON.stringify(data))
		} else {
			let store = localStorage.getItem(namespace)
			return (store && JSON.parse(store)) || []
		}
	},
}

const app = {
	init: function() {
		this.renderLocalStorage()
		this.bindEvents()
	},

	renderLocalStorage: function() {
		Object.keys(localStorage).forEach(key => {
			let row = gid('crud-table').insertRow(0).insertCell(0),
					nKey = util.store(key)

			row.setAttribute('id', key)
			row.innerHTML = `${nKey.first_name}, ${nKey.last_name}`
		})

		this.crudSelected();
	},

	bindEvents: function() {
		gid('crud-create').addEventListener('click', this.crudCreate.bind(this));
		gid('crud-update').addEventListener('click', this.crudUpdate.bind(this));
		gid('crud-delete').addEventListener('click', this.crudDelete.bind(this));
		gid('crud-filter').addEventListener('keyup', util.filter.bind(this))
	},

	noSelect: function() { if (gcn('selected').length === 0) return true },

	clearInput: function() {
		gid('crud-firstname').value = ''
		gid('crud-lastname').value = ''
		gid('crud-filter').value = ''
	},

	crudCreate: function() {
		let firstName = gid('crud-firstname').value,
				lastName = gid('crud-lastname').value,
				genKey = uuid()

		if (firstName, lastName === '') return

		let row = gid('crud-table').insertRow(0).insertCell(0)
		row.innerHTML = `${firstName}, ${lastName}`
		row.setAttribute('id', genKey)

		util.store(genKey, { first_name: firstName, last_name: lastName })

		this.crudSelected()
		this.clearInput()
		util.filter()
		console.log(genKey, 'added to localStorage')
	},

	crudSelected: function() { 
		qsa('tr').forEach(tr => {
			tr.addEventListener('click', () => {
				qsa('tr').forEach(tr => {
					if (tr.classList.contains('selected')) tr.removeAttribute('class')
				})

				tr.classList.add('selected');
				let trText = tr.innerText
				gid('crud-firstname').value = trText.substr(0, trText.indexOf(','))
				gid('crud-lastname').value = trText.substr(trText.indexOf(', ') + 2)
			})
		}) 
	},

	crudUpdate: function() {
		if (this.noSelect()) return;

		let key = gcn('selected')[0].children[0].id,
				firstName = gid('crud-firstname').value,
				lastName = gid('crud-lastname').value

		if (firstName, lastName === '') return

		util.store(key, { first_name: firstName, last_name: lastName })
		gcn('selected')[0].children[0].innerHTML = `${firstName}, ${lastName}`
		console.log('updated', key, 'in localStorage')

		this.crudSelected()
		this.clearInput()
		util.filter()
	},

	crudDelete: function() {
		if (this.noSelect()) return

		let key = gcn('selected')[0].children[0].id

		localStorage.removeItem(key)
		console.log(key, "removed from localStorage")

		gcn('selected')[0].remove()
		this.clearInput()
		util.filter()
	},
}

app.init()
window.onload = app.clearInput
