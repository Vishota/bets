import type Casino from './Casino'

export default class BetMaker {
    private _multiplier : number = 1;

    constructor(private _aim : number){}

    makeBet(casino : Casino) {
        if(casino.balance >= this._aim) throw 'Aim has already been achieved'
        var bet = casino.minBet * this._multiplier;
        if(bet > casino.balance) {
            this._multiplier = 1;
            bet = casino.minBet;
        }
        var win = casino.makeBet(bet);
        if(win) this._multiplier = 1;
        else this._multiplier *= casino.multiplier;
    }

    public get aim () { return this._aim; }
    public get multiplier () { return this._multiplier; }
    public set aim (aim : number) { 
        if(aim < 0) throw 'Attempt to set negative aim';
        this._aim = aim;
    }
}