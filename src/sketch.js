// p5.disableFriendlyErrors = true;

let mCanvas;
let timGrid;
let mySignal;
let volumeSlider, volumeText;
let playButton;

function setup() {
	getAudioContext().suspend();
	setupVolumeElements();
	setupPlayButton();
	setupSignal();

	mCanvas = createCanvas(
		windowWidth - WIDTH_OFFSET,
		windowHeight - HEIGHT_OFFSET,
	);
	mCanvas.parent('myCanvas');
	background(color(230, 230, 255))
	timeGrid = new TimeGrid({
		nLanes: 4, width: mCanvas.width - 8, height: (mCanvas.height / 2) - 8,
		xCoord: 4, yCoord: 4, frameColour: color(128, 96, 128, 128),
	});
}

function draw() {
	timeGrid.render();
}

function windowResized() {
}

function setupVolumeElements() {
	volumeSlider = createSlider(0, 100, 50, .5);
	volumeText = createP(`Volume: ${volumeSlider.value().toFixed(1)}`);

	volumeText.parent('myVolume');
	volumeSlider.parent('myVolume');

	volumeSlider.input(()=>{
		let curVol = volumeSlider.value();
		if (curVol === 0 ) {
			mySignal.amp(0, 0.05);
		} else {
			dbVol = map(curVol, 0.5, 100, volumeRangeDb[0], volumeRangeDb[1]);
			mySignal.amp(pow(10, dbVol/20), 0.05);
		}
		volumeText.html(`Volume: ${curVol.toFixed(1)}`);
	})
}

function setupPlayButton() {
	playButton = createButton('play');
	playButton.parent('myPlay')

	playButton.mouseReleased(() => {
		if(mySignal.started) {
			playButton.html('play');
			mySignal.stop(0.25);
		} else {
			if(getAudioContext().state !== 'running') userStartAudio();
			playButton.html('pause');
			mySignal.start();
		}
	})
}


function setupSignal() {
	mySignal = new p5.Oscillator('square');
}

function recalculateCanvasSize() {
	// TODO: Calculate margin + nLanes * laneHeigh
	resizeCanvas()
}