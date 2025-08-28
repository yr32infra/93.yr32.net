const bowl = document.getElementById("bowl");
const mic = document.getElementById("mic");
const kitchen = document.getElementById("kitchen");
const user = document.getElementById("user");

bowl.addEventListener("dragstart", e => {
	e.dataTransfer.setData("application/x-bowl", "from-stock");
	e.dataTransfer.setDragImage(bowl, 0, 0);
	e.stopPropagation();
}, false);

mic.addEventListener("dragstart", e => {
	e.dataTransfer.setData("application/x-mic", "from-stock");
	e.dataTransfer.setDragImage(mic, 0, 0);
	e.stopPropagation();
}, false);

kitchen.addEventListener("dragenter", e => {
	e.preventDefault();
}, false);

kitchen.addEventListener("dragover", e => {
	e.preventDefault();
}, false);

kitchen.addEventListener("dragstart", e => {
	const mic = kitchen.classList.contains("has-mic");
	const bowl = kitchen.classList.contains("has-bowl");

	let objectType;

	if (mic && bowl) {
		objectType = "application/x-micbowl";
	} else if (mic) {
		objectType = "application/x-mic";
	} else if (bowl) {
		objectType = "application/x-bowl";
	} else {
		objectType = "application/x-nothing";
	}

	e.dataTransfer.setData(objectType, "from-kitchen");
	e.dataTransfer.setDragImage(kitchen, 0, 0);
	e.stopPropagation();
}, false);

kitchen.addEventListener("drop", e => {
	if (e.dataTransfer.getData("application/x-mic")) {
		kitchen.classList.add("has-mic");
	}

	if (e.dataTransfer.getData("application/x-bowl")) {
		kitchen.classList.add("has-bowl");
	}
}, false);

user.addEventListener("dragover", e => {
	e.preventDefault();
}, false);

user.addEventListener("dragenter", e => {
	e.preventDefault();
}, false);

const updateScore = diff => {
	_score += diff;
	_score = Math.max(_score, 0);

	[...document.getElementsByClassName("score-indicator")].forEach(e => {
		e.textContent = _score;
	});
};

const resetScore = () => {
	_score = 0;
	updateScore(0);
};

const clearBowl = () => {
	kitchen.classList.remove("has-mic");
	kitchen.classList.remove("has-bowl");
};

user.addEventListener("drop", e => {
	const source =
		e.dataTransfer.getData("application/x-mic") ||
		e.dataTransfer.getData("application/x-bowl") ||
		e.dataTransfer.getData("application/x-micbowl");

	if (!source) return;

	if (source == "from-kitchen") clearBowl();

	if (e.dataTransfer.getData("application/x-mic")) {
		console.log("Mic received!");
		updateScore(-5);
		return;
	}

	if (e.dataTransfer.getData("application/x-bowl")) {
		console.log("Bowl received!");
		updateScore(-5);
		return;
	}

	if (e.dataTransfer.getData("application/x-micbowl")) {
		console.log("MicBowl received!");
		updateScore(10);
		return;
	}
}, false);

const TIME_LIMIT_MS = 30 * 1000;

let _interval_timer_id = 0;
let _end_at = 0;
let _score = 0;

const format_dot_2f = v => {
	const last = (Math.round(v * 10) + "").slice(-1) || "0";
	return `${Math.round(v)}.${last}`;
};

const update = () => {
	const remaining_time_ms = _end_at - (new Date()).getTime();
	const remaining_time_s_s = format_dot_2f(remaining_time_ms / 1000);

	document.getElementById("remaining-time").textContent =
		`あと ${remaining_time_s_s} 秒`;

	if (remaining_time_ms <= 0) {
		clearInterval(_interval_timer_id);
		document.getElementById("in-game").style.display = "none";
		document.getElementById("result").style.display = "block";
	}
};

document.getElementById("start-button").addEventListener("click", e => {
	resetScore();
	clearBowl();
	_end_at = (new Date()).getTime() + TIME_LIMIT_MS;
	update();
	_interval_timer_id = setInterval(update, 100);
	document.getElementById("title").style.display = "none";
	document.getElementById("in-game").style.display = "block";
}, false);

document.getElementById("title-button").addEventListener("click", e => {
	document.getElementById("result").style.display = "none";
	document.getElementById("title").style.display = "block";
}, false);

document.getElementById("tweet-button").addEventListener("click", e => {
	window.open(
		"https://x.com/intent/tweet?text=" +
			encodeURIComponent(
				`ぐーさんの！牛丼マイクタイムアタック！\nスコアは${_score}点！\n` +
				"#牛丼マイク弁当友の会 #牛丼マイクタイムアタック\n" +
				"https://93.yr32.net/"
			),
		"_blank"
	);
}, false);
