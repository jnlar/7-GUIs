const canvas = gid('canvas')
const state = []

const circle = {
	init: function() {
		this.bindEvents()
		this.changeDiameter()
	},

	bindEvents: function() {
		canvas.addEventListener('click', this.draw.bind(this))
		gid('circle-undo').addEventListener('click', this.undo.bind(this))
	},

	draw: function(e) {
		let pos = this.mousePos(canvas, e),
			posx = pos.x
			posy = pos.y

		let newCircle = document.createElement('div')
		newCircle.setAttribute('id', util.uuid())
		canvas.append(newCircle)

		newCircle.style.borderRadius = '100%'
		newCircle.style.width = '30px'
		newCircle.style.height = '30px'
		newCircle.style.border = '1px solid #0366d6'
		newCircle.style.transform = 'translate(-50%, -50%)'
		newCircle.style.position = 'absolute'
		newCircle.style.left = `${posx}px`
		newCircle.style.top = `${posy}px`

		state.push({key: newCircle.id, x: posx, y: posy})
		console.log(state)
	},

	undo: function() {
		// will break when we implement redo and resize obviously, need immutable states
		canvas.lastChild.remove()
		state.pop()
	},

	redo: function() {
	},

	changeDiameter: function() {
	},

	mousePos: function(canvas, event) {
		let rect = canvas.getBoundingClientRect()

		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	},
}

circle.init();
