export default class Casino {
    public constructor(private _balance : number, private _multiplier : number, private _minBet : number) {}

    public makeBet(bet : number) {
        if(this._balance - bet < 0) throw 'Not enoung money';
        this._balance -= bet;

        let win = 1. / this._multiplier > Math.random();

        if(win) this._balance += bet * this._multiplier;

        return win;
    }

    public get balance() { return this._balance }
    public get multiplier() { return this._multiplier }
    public get minBet() { return this._minBet }
    public set balance(value : number) { 
        if(value < 0) throw 'Attempt to set negative balance';
        this._balance = value; 
    }
    public set multiplier(value : number) {
        if(value < 1) throw 'Attempt to set multiplier less then 1';
        this._multiplier = value; 
    }
    public set minBet(value : number) {
        if(value < 0) throw 'Attempt to set negative minimal bet';
        this._minBet = value; 
    }
}