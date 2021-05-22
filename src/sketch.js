// p5.disableFriendlyErrors = true;

let mCanvas;
let timGrid;
let mySignal;
let volumeSlider, volumeText;
let playButton;
let lanesSlider, barDropDown, laneText, barText;
let addLaneButton, removeLaneButton;

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
		laneLenghtConfig:Array(3).fill(4), numBars: 4,
		width: mCanvas.width - 8, height: (mCanvas.height / 2) - 8,
		xCoord: 4, yCoord: 4,
	});

	setupGridControlElements(timeGrid);
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

function setupGridControlElements(timeGrid) {
	barText = createP('Bar size');
	barText.parent('myGridCtl');

	barDropDown = createSelect();
	barDropDown.parent('myGridCtl');
	barDropDown.option(2);
	barDropDown.option(3);
	barDropDown.option(4);
	barDropDown.selected(4);
	barDropDown.changed(() => timeGrid.numBars = int(barDropDown.value()));

	laneText= createP('Lanes');
	laneText.parent('myGridCtl');

	lanesSlider = createSlider(2, 16, 4, 1);
	lanesSlider.parent('myGridCtl');

	addLaneButton = createButton(`Add lane: ${lanesSlider.value()} beats`);
	addLaneButton.parent('myGridCtl');

	lanesSlider.input(()=>{
		addLaneButton.html(`Add lane: ${lanesSlider.value()} beats`);
	});

	addLaneButton.mouseReleased(() => {
		timeGrid.addLanes({laneLenghtConfig: [int(lanesSlider.value())]})
	});

	// TODO: Select which lane to remove
	removeLaneButton = createButton('remove last lane');
	removeLaneButton.parent('myGridCtl');
	removeLaneButton.mouseReleased(() => timeGrid.removeLanes({}));
}