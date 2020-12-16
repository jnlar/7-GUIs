const postL = qsa("[id^=trig-]");
const post = qsa("[id^=col-2-]");

for (let i = 0; i < post.length; i++) {
	post[i].style.display = "none";
}

for (let i = 0; i < postL.length; i++) {
	let x = gid("col-2-" + parseInt(i));

	postL[i].addEventListener("click", () => {

		for (let i = 0; i < post.length; i++) {
			if (post[i].style.display == "block") { post[i].style.display = "none" }
		}

		if (x.style.display === '' || x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	});
}
