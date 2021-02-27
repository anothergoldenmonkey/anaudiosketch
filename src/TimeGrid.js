class TimeGrid {
    _lanes;
    _numBars;
    _part;

    constructor({
        laneLenghtConfig=[4, 4], numBars=3,
        width, height, xCoord=0, yCoord=0},
    ) {
        if (laneLenghtConfig.length < 0 || laneLenghtConfig.length > MAX_N_LANES) {
            throw new Error(`Invalid number of lanes: ${laneLenghtConfig.length}`);
        }
        this.numLanes = laneLenghtConfig.length;
        this._numBars = numBars;
        this.width = width;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this._init_lanes(laneLenghtConfig);
        this._init_sound_part();
    }

    set numBars(nBars) {
        if (nBars < 1 || nBars > MAX_N_BARS) {
            throw new Error(`Invalid number of bars: ${nbars}`);
        }
        this._numBars = nBars;
        this._lanes.forEach(lane => lane.nBars = nBars);
    }

    _init_sound_part() {
        let minSteps = this._lanes.reduce(
            (numSteps, lane) => lcm2(lane.barLength, numSteps), 1
        );
        this._part = new p5.Part(minSteps, 1/minSteps);
    }

    _init_lanes(laneLenghtConfig) {
        this._lanes = Array(this.numLanes).fill().map(
            (_, i) => new Lane({nBars: this._numBars, barLength: laneLenghtConfig[i]})
        );
        this._calculate_lane_coordinates();
    }

    _calculate_lane_coordinates() {
        let laneWidth = this.width - LANE_MARGIN_WIDTH * 2;
        let laneHeigth = (
            (this.height - ((this.numLanes + 1) * LANE_MARGIN_HEIGTH)) / this.numLanes
        );

        this._lanes.forEach((lane, index) => {
            lane.coordinates = {
                xCoord: this.xCoord + LANE_MARGIN_WIDTH,
                yCoord: this.yCoord + LANE_MARGIN_HEIGTH +
                    (laneHeigth + LANE_MARGIN_HEIGTH) * index,
            };
            lane.dimensions = {width: laneWidth, height: laneHeigth};
        });
    }

    addLanes({laneLenghtConfig=[4], startIndex=-1}){
        const nNewLanes = laneLenghtConfig.length;
        if (nNewLanes < 0 || (this.numLanes + nNewLanes) > MAX_N_LANES) {
            console.log(`Got invalid number of lanes: ${nNewLanes}`)
            return;
        }
        console.log(laneLenghtConfig)
        if(startIndex < 0) {
            this._lanes = this._lanes.concat(
                Array(nNewLanes).fill().map(
                    (_, i) => new Lane({nBars: this._numBars, barLength: laneLenghtConfig[i]})
                )
            );
        }
        else {
            for (const i of Array(nNewLanes).keys()) {
                this._lanes.splice(
                    startIndex + i,
                    0,
                    new Lane({nBars: this._numBars, barLength: laneLenghtConfig[i]})
                );
            }
        }
        this.numLanes += nNewLanes;
        this._calculate_lane_coordinates();
    }

    removeLanes({startIndex=-1, count=1}) {
        if (startIndex > (MAX_N_LANES - 1)) {
            console.log(`invalid start index to remove lanes: ${startIndex}.`)
            return;
        }
        if (count < 1 || this.numLanes - count < 1) {
            console.log(`invalid number or lanes to remove: ${count}.`)
            return;
        }
        let start = startIndex >=0 ? startIndex : count * -1;
        this._lanes.splice(start, count);
        this.numLanes -= count;
        this._calculate_lane_coordinates();
    }

    render() {
        strokeWeight(FRAME_LINE_WIDTH);
        strokeJoin(ROUND);
        fill(FRAME_COLOUR);
        rect(this.xCoord, this.yCoord, this.width, this.height, FRAME_ROUNDNESS);
        this._lanes.forEach(lane => lane.render());
    }
}