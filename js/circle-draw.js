// TODO:
// 1. disable redo button when historyPosition equals state.length - 1
// 2. change diameter on circle click event, clicking on a circle should display a popup box
// with a gauge you can drag to instantly change the diameter of selected circle

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

	postStatement: function() {
		this.canRedo()
		this.canUndo()
		this.circleMouseEvents()
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

		this.postStatement()
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
		if (state[historyPosition - 1].di !== canvas.lastChild.style.width) {
		}

		canvas.lastChild.remove()

		historyPosition -= 1
		x += 1

		console.log('we are at position', historyPosition, 'in the state', state[historyPosition])
		this.postStatement()
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
		this.circleMouseEvents()
	},

	circleMouseEvents: function() {
		qsa('.circles').forEach(el => {
			el.addEventListener('mouseover', () => {
				el.style.backgroundColor = "#eee"
			})
		})

		qsa('.circles').forEach(el => {
			el.addEventListener('mouseout', () => {
				el.style.backgroundColor = "rgba(0, 0, 0, 0)"
			})
		})

		qsa('.circles').forEach(el => {
			el.addEventListener('click', (e) => {
				if (!e) var e = window.event
				e.cancelBubble = true
				if (e.stopPropagation) e.stopPropagation();

				el.style.width = "50px"
				el.style.height = "50px"
			})
		})
	},

	diBox: function() {
		gid('di-box').style.display = 'block'

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
window.onload = () => { gid('di-box').style.display = 'none' }
