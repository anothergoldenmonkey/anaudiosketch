class Lane {
    _nBars;
    _barLength;
    _bar_width;
    _slot_width;

    constructor(
        {nBars, barLength, width, height, xCoord=0, yCoord=0, frameColour=color(128, 128, 128)},
    ) {
        if (nBars < 0 || nBars > MAX_N_BARS) {
            throw new Error(`Invalid number of bars: ${nbars}`);
        }
        this._nBars = nBars;
        this._barLength = barLength;
        this.width = width;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.frameColour = frameColour;
        this._bar_width = (this.width - (this._nBars + 1) * BAR_MARGIN_WIDTH * 2) / this._nBars
        this._slot_width = (this._bar_width - (this._barLength + 1) * BAR_MARGIN_WIDTH) / this._barLength;
    }

    get numBars() {
        return this._nBars;
    }

    render() {
        strokeWeight(BAR_LINE_WIDTH);
        strokeJoin(ROUND);
        fill(this.frameColour);
        this._render_bars();
    }

    _render_bars() {
        let double_bar_width = 2 * BAR_MARGIN_WIDTH;
        for (let bar = 0; bar < this._nBars; bar++) {
            let barCoord = (
                this.xCoord + double_bar_width + (this._bar_width + double_bar_width) * bar
            );
            for (let slot = 0; slot < this._barLength; slot++) {
                rect(
                    barCoord + BAR_MARGIN_WIDTH + (this._slot_width + BAR_MARGIN_WIDTH) * slot,
                    this.yCoord + BAR_MARGIN_HEIGTH / 2,
                    this._slot_width,
                    this.height - BAR_MARGIN_HEIGTH,
                    BAR_ROUNDNESS
                );
            }
        }
    }
}