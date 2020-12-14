const range = gid('time-range');
const gauge = gid('time-gauge');
var time;

gauge.max = range.value;

range.addEventListener('change', () => { gauge.max = range.value });
gid('time-reset').addEventListener('click', () => { gauge.value = 0 });
gid('time-stop').addEventListener('click', () => { clearInterval(time) });
gid('time-start').addEventListener('click', () => { clearInterval(time);
	time = setInterval(function() { gauge.value += 0.1; gid('elapsed').innerHTML = `Elapsed: <em>${parseFloat(gauge.value).toFixed(1)}s</em>`; }, 100);
})
