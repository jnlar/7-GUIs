const canvas = gid('canvas')
const cContext = canvas.getContext('2d')
const state = []

const circle = {
	init: function() {
		this.bindEvents()
	},

	bindEvents: function() {
		canvas.addEventListener('click', this.clickDraw.bind(this))
		gid('circle-undo').addEventListener('click', this.cUndo.bind(this))
		//gid('circle-redo').addEventListener('click', this.cRedo.bind(this))
	},

	draw: function(x, y) {
		cContext.strokeStyle = '#0366d6'
		cContext.beginPath()
		cContext.arc(x, y, 30, 0, 2 * Math.PI)
		cContext.stroke()
	},

	clickDraw: function(e) {
		let pos = this.mousePos(canvas, e)
			posx = pos.x,
			posy = pos.y

		this.draw(posx, posy)
		state.push({x: posx, y: posy})
	},

	cUndo: function() {
		this.clear()
		state.pop()

		if (state.length === 0) return;

		for (i in state) {this.draw(state[i].x, state[i].y)}
	},

	cRedo: function() {
	},

	mousePos: function(canvas, event) {
		let rect = canvas.getBoundingClientRect()

		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	},

	clear: function() {
		cContext.clearRect(0, 0, canvas.width, canvas.height)
	},
}

circle.init();
