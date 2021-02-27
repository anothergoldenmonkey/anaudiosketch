class Lane {
    _nBars;
    _barLength;
    _bar_width;
    _slot_width;

    constructor({nBars, barLength}) {
        this.nBars =nBars
        this.barLength = barLength;
        this.width = null;
        this.height = null;
        this.xCoord = null;
        this.yCoord = null;
    }

    get nBars() {
        return this._nBars;
    }

    set nBars(nBars) {
        if (nBars < 1 || nBars > MAX_N_BARS) {
            throw new Error(`Invalid number of bars: ${nbars}`);
        }
        this._nBars = nBars;
        this._calculate_slots_dimensions();
    }

    get barLength() {
        return this._barLength;
    }

    set barLength(barLength) {
        if (barLength < MIN_BAR_LENGTH || barLength > MAX_BAR_LENGTH) {
            throw new Error(`Invalid bar length: ${barLength}`);
        }
        this._barLength = barLength;
        this._calculate_slots_dimensions();
    }

    set coordinates({xCoord, yCoord}) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }

    set dimensions({width, height}) {
        this.width = width;
        this.height = height;
        this._calculate_slots_dimensions();
    }

    _calculate_slots_dimensions(){
        this._bar_width = (this.width - (this._nBars + 1) * BAR_MARGIN_WIDTH * 2) / this._nBars
        this._slot_width = (
            this._bar_width - (this._barLength + 1
        ) * BAR_MARGIN_WIDTH) / this._barLength;
    }

    render() {
        strokeWeight(BAR_LINE_WIDTH);
        strokeJoin(ROUND);
        fill(FRAME_COLOUR);
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