let canvas, sig, playButton, isSigPlaying, volumeSlider, freqSlider;
let volumeText, freqText;
let fft, barW;


function setup() {
    frameRate(FRAME_RATE);
    canvas = createCanvas(WIDTH, HEIGHT);
	canvas.parent('myCanvas');

	sig = new p5.Oscillator('sine');
	isSigPlaying = false;

	fft = new p5.FFT(0.5, 512);
	barW = (WIDTH - 2) / 128;
	// Add DOM controller elements
	playButton = createButton('play', 5);
	playButton.mousePressed(togglePlay);

	volumeText = createDiv('Volume');
	volumeSlider = createSlider(0, 100, 80);

	freqText = createDiv('Freq');
	freqSlider = createSlider(1, 5000, 440);

	playButton.parent('myPlay');
	volumeText.parent('myVolume');
	volumeSlider.parent('myVolume');
	freqText.parent('myControllers');
	freqSlider.parent('myControllers');
}

function draw() {
	clear();
    // set background color
    background(...BACKGROUND_COLOR);
	updateDomElements();
	sig.amp(map(volumeSlider.value(), 0, 100 , 0, 1), 0.1);
	sig.freq(freqSlider.value(), 0.1);
	stroke(0);
	fill(0);
	rect(1, 2* HEIGHT / 3, WIDTH -4 , (HEIGHT / 3) -2);
	drawAnalysis();
	drawCoolText();
}

function togglePlay() {
	if(isSigPlaying) {
		playButton.html('play');
		isSigPlaying = false;
		sig.stop();
	} else {
		playButton.html('pause');
		isSigPlaying = true;
		sig.start();
	}
}

function updateDomElements() {
	volumeText.html(`Volume: ${volumeSlider.value()}%`);
	freqText.html(`Freq: ${freqSlider.value()}Hz`);
}

function drawAnalysis() {
	spectrum = fft.analyze();
	stroke(255);
	for (let i = 0; i < spectrum.length / 4; i++) {
		let band = spectrum[i];
		let barH = map(band, 0, 255, HEIGHT - 2, (2 * HEIGHT / 3) + 2);
		line(2+i*barW, HEIGHT - 2, i*barW, barH);
	}
}

function drawCoolText() {
	let txtStr = 'Something cool will be added here soon...';
	stroke(190, 64, 128);
	fill(128, 32, 128);
	textStyle(BOLD);
	textSize(24);
	textAlign(CENTER);
	text(txtStr, WIDTH / 2, 50)
}