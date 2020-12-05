(function counterIncrement() {
	gid('counter-increment').addEventListener("click", () => { gid('counter-input').value++; });
})();

(function counterReset() {
	console.log(this);
	gid('counter-reset').addEventListener("click", () => { gid('counter-input').value = 0; });
})();
