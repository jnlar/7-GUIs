const range = gid('time-range');
const gauge = gid('time-gauge');

gauge.max = range.value;
range.addEventListener('change', () => { gauge.max = range.value; });
gid('time-reset').addEventListener('click', () => {gauge.value = 0})
setInterval(function() { gauge.value += 0.1; gid('elapsed').innerHTML = `Elapsed: <em>${parseFloat(gauge.value).toFixed(1)}s</em>`; }, 100)
