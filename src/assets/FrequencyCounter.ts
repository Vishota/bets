export default class FrequencyCounter {
    private _lastPeriodsCount : number[] = [] as number[];
    private _currentPeriodCount : number;
    private _started : boolean;

    constructor (private _interval: number, private historySize: number = 100) {;
        this._started = false;
        
        this._currentPeriodCount = 0;
        setInterval(()=>{if (this._started) this.recount()}, _interval);
    }
    public get lastPeriod () {return this._lastPeriodsCount[0] };
    public getLastPeriodsAverage (periodsCount : number) {
        if(periodsCount > this._lastPeriodsCount.length) {
            console.warn('Attempt to get average frequency for ' + periodsCount + ' periods while only ' + this._lastPeriodsCount.length + ' are available');
            periodsCount = this._lastPeriodsCount.length;
        }
        let count = 0;
        for(let i = 0; i < periodsCount; i++) {
            count += this._lastPeriodsCount[i];
        }

        return count / periodsCount;
    };
    public eventHappened() {
        this._currentPeriodCount++;
    }
    public start() {
        this._started = true;
    }
    public stop() {
        this._started = false;
    }
    private recount() {    
        this._lastPeriodsCount.unshift(this._currentPeriodCount);
        while (this._lastPeriodsCount.length > this.historySize) this._lastPeriodsCount.pop();
        this._currentPeriodCount = 0;
    }
}