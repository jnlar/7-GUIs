const trigAnchor = qsa('[id^=trig-]'), gui = qsa('[id^=gui-]')

for (let i = 0; i < gui.length; i++) {
	if (i === 0) { gui[i].style.display = 'block'; continue }
	gui[i].style.display = 'none'
}

for (let i = 0; i < trigAnchor.length; i++) {
	let selectedGui = gid('gui-' + parseInt(i));

	trigAnchor[i].addEventListener('click', () => {

		for (let i = 0; i < trigAnchor.length; i++) {
			if (gui[i].style.display == 'block') gui[i].style.display = 'none'
			if (trigAnchor[i].classList.contains('sl-nav-active')) trigAnchor[i].removeAttribute('class')
		}

		trigAnchor[i].setAttribute('class', 'sl-nav-active')

		if (selectedGui.style.display === 'none') selectedGui.style.display = 'block'
		else selectedGui.style.display = 'none'
	});
}
