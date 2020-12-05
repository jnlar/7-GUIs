const range = gid('time-range');
const gauge = gid('time-gauge');

gauge.max = range.value;
range.addEventListener('change', () => { gauge.max = range.value; });
setInterval(function() { gauge.value++; gid('elapsed').innerHTML = `<em>${gauge.value}s</em>`; }, 1000)
gid('time-reset').addEventListener('click', () => {gauge.value = 0})
