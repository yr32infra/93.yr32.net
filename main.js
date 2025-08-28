const bowl = document.getElementById("bowl");

bowl.addEventListener("dragstart", function(e) {
	e.dataTransfer.setData("application/x-bowl", "bowl");
	e.dataTransfer.setDragImage(bowl, 0, 0);
	e.dataTransfer.dropEffect = "copy";
	e.stopPropagation();
}, false);

const mic = document.getElementById("mic");

mic.addEventListener("dragstart", function(e) {
	e.dataTransfer.setData("application/x-mic", "mic");
	e.dataTransfer.setDragImage(mic, 0, 0);
	e.dataTransfer.dropEffect = "move";
	e.stopPropagation();
}, false);

const kitchen = document.getElementById("kitchen");

kitchen.addEventListener("dragenter", function(e) {
	e.preventDefault();
}, false);

kitchen.addEventListener("dragover", function(e) {
	e.preventDefault();
}, false);

kitchen.addEventListener("dragstart", function(e) {
	e.dataTransfer.setData("application/x-micbowl", "micbowl");
	e.dataTransfer.setDragImage(kitchen, 0, 0);
	e.dataTransfer.dropEffect = "copy";
}, false);

kitchen.addEventListener("drop", function(e) {
	if (e.dataTransfer.getData("application/x-mic")) {
		console.log("Mic received!");
	}

	if (e.dataTransfer.getData("application/x-bowl")) {
		console.log("Bowl received!");
	}
}, false);

const user = document.getElementById("user");

user.addEventListener("dragover", function(e) {
	e.preventDefault();
}, false);

user.addEventListener("dragenter", function(e) {
	e.preventDefault();
}, false);

