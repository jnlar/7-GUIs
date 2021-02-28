const canvas = gid('canvas')
const state = []
const UNDO = 'UNDO'
const REDO = 'REDO'
const MAKE = 'MAKE'

const commands = {
	createCircleState: function(key, x, y, di) {
		return {
			key, x, y, di
		}
	},

	commands: {
		[UNDO]: this.undo,
		[REDO]: this.redo,
		[MAKE]: this.make
	},

	// TODO: draw circles before we 
	undo: function() {
		const prevState = state[state.length - 1];

		return {
			execute() {
				state[position].pop()
				gid(state[position].id).remove()
			},

			undo() {
				state = prevState
				circle.draw()
			}
		}
	},

	redo: function(counter) {
		const prevCount = counter.count;

		return {
			execute() {
				counter.count -= 1
			},

			undo() {
				counter.count = prevCount
			}
		}
	},

	make: function() {
		return {
			execute() {
				circle.draw()
			},

			undo() {
				this.undo.execute()
			}
		}
	},

	commandManager: function(target) {
		let history = [null],
				position = 0

		return {
			doCommand(commandType) {
				if (position < history.length - 1) {
					history = history.slice(0, position + 1)
				}

				if (commands[commandType]) {
					const concreteCommand = commands[commandType](target)
					history.push(concreteCommand)
					position += 1

					concreteCommand.execute()
				}
			},

			undo() {
				if (position > 0) {
					history[position].undo()
					position -= 1
				}
			},

			redo() {
				if (position < history.length - 1) {
					position += 1
					history[position].execute()
				}
			}
		}
	},
} 

const circle = {
	draw: function(e) {
		let pos = this.mousePos(canvas, e),
			posx = pos.x,
			posy = pos.y,
			newCircle = this.createCircleDiv(uuid())

		this.createCircle(newCircle, posx, posy)
	},

	mousePos: function(canvas, event) {
		let rect = canvas.getBoundingClientRect()

		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
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
}
