(function counterIncrement() { gid('counter-increment').addEventListener("click", () => { gid('counter-input').value++; }); })();
(function counterReset() { gid('counter-reset').addEventListener("click", () => { gid('counter-input').value = 0; }); })();
