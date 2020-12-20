function gid(id) { return document.getElementById(id) };
function gcn(className) { return document.getElementsByClassName(className) };
function qsa(selector) { return document.querySelectorAll(selector) };
function gtn(tagName) { return document.getElementsByTagName(tagName) };

function uuid() {
	let i, random;
	let uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	}

	return uuid;
}
