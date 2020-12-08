const cel = gid('cel-input');
const far = gid('far-input');

function ib(metric, expr) { 
	if (isNaN(cel.value)) { far.value = ''; return }
	if (isNaN(far.value)) { cel.value = ''; return }

	metric.value = parseFloat(expr).toFixed(2) 
};

(function celChange() { cel.addEventListener("keyup", () => { ib(far, (cel.value * 9/5) + 32) }) })();
(function farChange() { far.addEventListener("keyup", () => { ib(cel, (far.value - 32) * 5/9) }) })();

window.onload = () => { cel.value = ''; far.value = '' }
