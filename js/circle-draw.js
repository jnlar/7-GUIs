const canvas = gid('canvas')
const state = []
var historyPosition = 0
var x;

const circle = {
	init: function() {
		this.bindEvents()
		this.canRedo()
		this.canUndo()
	},

	bindEvents: function() {
		canvas.addEventListener('click', this.draw.bind(this))
		gid('circle-undo').addEventListener('click', this.undo.bind(this))
		gid('circle-redo').addEventListener('click', this.redo.bind(this))
	},

	circleState: function(key, x, y, di) {
		return {key, x, y, di}
	},

	createCircle: function(circle, x, y) {
			circle.style.borderRadius = '100%'
			circle.style.width = '30px'
			circle.style.height = '30px'
			circle.style.border = '1px solid #999'
			circle.style.transform = 'translate(-50%, -50%)'
			circle.style.position = 'absolute'
			circle.style.left = `${x}px`
			circle.style.top = `${y}px`
	},

	createCircleDiv: function(id) {
		let newCircle = document.createElement('div')

		newCircle.setAttribute('id', id)
		newCircle.setAttribute('class', 'circles')
		canvas.append(newCircle)

		return newCircle
	},

	draw: function(e) {
		let pos = this.mousePos(canvas, e),
			posx = pos.x,
			posy = pos.y,
			newCircle = this.createCircleDiv(uuid())

		this.createCircle(newCircle, posx, posy)
		state.push(this.circleState(newCircle.id, posx, posy, newCircle.style.width))

		historyPosition += 1
		x = 0

		this.canRedo()
		this.canUndo()
		this.circleMouseEvents()
		console.log(`we are at position ${historyPosition} in the state`)
	},

	canRedo: function() {
		if (x > 0) {
			gid('circle-redo').disabled = false
		} else {
			gid('circle-redo').disabled = true
		}
	},

	canUndo: function() {
		if (state.length, historyPosition === 0) {
			gid('circle-undo').disabled = true
		} else {
			gid('circle-undo').disabled = false
		}
	},

	undo: function() {
		canvas.lastChild.remove()
		historyPosition -= 1
		x += 1

		console.log('we are at position', historyPosition, 'in the state', state[historyPosition])
		this.canRedo()
		this.canUndo()
	},

	redo: function() {
		let redoCircle = this.createCircleDiv(state[historyPosition].key)

		this.createCircle(
			redoCircle,
			state[historyPosition].x,
			state[historyPosition].y,
			state[historyPosition].di)

		console.log('we are at position', historyPosition, 'in the state', state[historyPosition])
		historyPosition += 1
		x -= 1

		this.canUndo()
	},

	circleMouseEvents: function() {
		qsa('.circles').forEach(el => {
			el.addEventListener('mouseover', () => {
				el.style.backgroundColor = "#eee"
			})
		})

		qsa('.circles').forEach(el => {
			el.addEventListener('mouseout', () => {
				el.style.backgroundColor = "#fff"
			})
		})
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
