//TODO: 
// 1.command pattern implementation
// 2.better state handling, see: https://medium.com/fbbd/intro-to-writing-undo-redo-systems-in-javascript-af17148a852b

const canvas = gid('canvas')
const state = []
const history = []
var historyPosition = 0

const circle = {
	init: function() {
		this.bindEvents()
	},

	bindEvents: function() {
		canvas.addEventListener('click', this.draw.bind(this))
		gid('circle-undo').addEventListener('click', this.undo.bind(this))
		gid('circle-redo').addEventListener('click', this.redo.bind(this))
	},

	createCircle: function(circle, x, y) {
			circle.style.borderRadius = '100%'
			circle.style.width = '30px'
			circle.style.height = '30px'
			circle.style.border = '1px solid #0366d6'
			circle.style.transform = 'translate(-50%, -50%)'
			circle.style.position = 'absolute'
			circle.style.left = `${x}px`
			circle.style.top = `${y}px`
	},

	createCircleDiv: function(id) {
		let newCircle = document.createElement('div')

		newCircle.setAttribute('id', id)
		canvas.append(newCircle)

		return newCircle
	},

	circleState: function(key, x, y, di) {
		return {key, x, y, di}
	},

	draw: function(e) {
		let pos = this.mousePos(canvas, e),
			posx = pos.x,
			posy = pos.y,
			newCircle = this.createCircleDiv(uuid())

		this.createCircle(newCircle, posx, posy)
		state.push(this.circleState(newCircle.id, posx, posy, newCircle.style.width))

		console.log('state =', state, historyPosition)
		historyPosition += 1

		if (newCircle.id !== history[history.length - 2].key) {
			console.log(newCircle.id, history[history.length - 2].key)
		}
	},

	undo: function() {
		history.push(this.circleState(
			state[historyPosition - 1].key,
			state[historyPosition - 1].x,
			state[historyPosition - 1].y,
			state[historyPosition - 1].di
		))

		canvas.lastChild.remove()
		historyPosition -= 1
		console.log('history =', history, historyPosition)
	},

	redo: function() {
		let undoPos = historyPosition, redoCircle = this.createCircleDiv(state[undoPos].key)

		this.createCircle(redoCircle, state[undoPos].x, state[undoPos].y)

		historyPosition += 1
		console.log(`${historyPosition} is the history position`)
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
