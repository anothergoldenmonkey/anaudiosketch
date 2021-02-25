class TimeGrid {
    _nLanes;
    _lanes;

    constructor(
        {nLanes, width, height, xCoord=0, yCoord=0, frameColour=color(128, 128, 128)},
    ) {
        if (nLanes < 0 || nLanes > MAX_N_LANES) {
            throw new Error(`Invalid number of lanes: ${nLanes}`);
        }
        this._nLanes = nLanes;
        this.width = width;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.frameColour = frameColour
        this._lanes = this._init_lanes();
    }

    get numLanes() {
        return this._nLanes;
    }

    _init_lanes() {
        let laneWidth = this.width - LANE_MARGIN_WIDTH * 2;
        let laneHeigth = (this.height - ((this._nLanes + 1) * LANE_MARGIN_HEIGTH)) / this._nLanes;
        return Array(this._nLanes).fill().map(
            (_, i) => new Lane({
                nBars: 3,
                barLength: 6,
                width: laneWidth,
                height: laneHeigth,
                xCoord: this.xCoord + LANE_MARGIN_WIDTH,
                yCoord: this.yCoord + LANE_MARGIN_HEIGTH + (laneHeigth + LANE_MARGIN_HEIGTH) * i,
                frameColour: this.frameColour
            })
        );
    }

    addLanes({numNewLanes=1, startIdx=-1}){
        if (numNewLanes < 0 && (this._nLanes + numNewLanes) > MAX_N_LANES) {
            console.log(`Got invalid number of lanes: ${numNewLanes}`)
            return;
        }
        this._nLanes += numNewLanes;
        if(startIdx < 0) {
            this._lanes = this._lanes.concat(
                Array(numNewLanes).fill(new Lane())
            );
        }
        else {
            for (const i of Array(numNewLanes).keys()) {
                this._lanes.splice(startIdx + i, 0, new Lane());
            }
        }
    }

    removeLanes({startIdx= 0, count= 1}) {
        if ( 0> startIdx > (MAX_N_LANES - 1)) {
            console.log(`invalid start index to remove lanes: ${startIdx}.`)
            return;
        }
        if (count < 1 || this._nLanes - count < 1) {
            console.log(`invalid number or lanes to remove: ${count}.`)
            return;
        }
    }

    render() {
        strokeWeight(FRAME_LINE_WIDTH);
        strokeJoin(ROUND);
        fill(this.frameColour);
        rect(this.xCoord, this.yCoord, this.width, this.height, FRAME_ROUNDNESS);
        this._lanes.forEach(lane => lane.render());
    }
}