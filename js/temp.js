const cel = gid('cel-input');
const far = gid('far-input');

function ib(metric, expr) { if (event.keyCode === 13) { metric.value = parseFloat(expr).toFixed(2) } };
(function celChange() { cel.addEventListener("keydown", () => { ib(far, (cel.value * 9/5) + 32) }) })();
(function farChange() { far.addEventListener("keydown", () => { ib(cel, (far.value - 32) * 5/9) }) })();

window.onload = () => { cel.value = ''; far.value = '' }
