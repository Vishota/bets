<script lang="ts" setup>
    import HistoryComponent from './History.vue';
    import type { HistoryElement } from '../assets/history';
    import { ref } from 'vue';
    import BetMaker from '../assets/BetMaker';
    import Casino from '../assets/Casino';
    import FrequencyCounter from '../assets/FrequencyCounter';

    var elements = ref( new Array<HistoryElement> );

    var casino = ref(new Casino(100, 2, 1));
    var betMaker = ref(new BetMaker(1000));

    var runs = ref(false);
    var fail = ref(0), success = ref(0);
    var historyLimit = ref(10);
    var defaultBalance = ref(100);
    var frequencyCounter = ref( new FrequencyCounter(1000, 100) );

    function addElement(element : HistoryElement) {
        elements.value.unshift(element);
        while(elements.value.length > historyLimit.value)elements.value.pop();
    }
    function onRunClicked() {
        runs.value = !runs.value;
        if(!runs.value) {
            frequencyCounter.value.stop();
            return;
        }
        else frequencyCounter.value.start();
        makeBet();
    }
    async function makeBet() {
        if(!runs.value) return;
        frequencyCounter.value.eventHappened();
        let info : HistoryElement;
        try {
            betMaker.value.makeBet( casino.value as Casino );
            info = {
                text:
                'Balance: ' + casino.value.balance + '; ' +
                'Aim: ' + betMaker.value.aim + '; ' +
                'Casino win multiplier: ' + casino.value.multiplier + '; ' + 
                'Current player multiplier: ' + betMaker.value.multiplier,
                renderColor: '#ffe'
            }
        } catch (e) {
            info =  { text: 'Error: ' + e, renderColor: e == 'Aim has already been achieved' ? '#0f0' : '#f00' };
            casino.value.balance = defaultBalance.value;
            
            if(e === 'Not enoung money') fail.value++;
            else success.value++;
        }
        addElement(info);
        
        setTimeout( makeBet );
    }
    
    function onEraseClicked() {
        elements.value.length = 0;
    }
</script>
<template>
    <div class="grid">
        <p>Balance</p>
        <input :disabled="runs" placeholder="Initial balance" id="balance" v-model="casino.balance">
        <p>Multiplier</p>
        <input :disabled="runs" placeholder="Multiplier" id="multiplier" v-model="casino.multiplier">
        <p>Minimal bet</p>
        <input :disabled="runs" placeholder="Minimal bet" v-model="casino.minBet">
        <p>Aim</p>
        <input :disabled="runs" placeholder="Aim" v-model="betMaker.aim">
        <p>Default balance after win/lose</p>
        <input :disabled="runs" placeholder="Aim" v-model="defaultBalance">
    </div>
    <button @click="onRunClicked">Run/Stop</button>
    <br>
    <label>History limit:   </label>
    <input v-model="historyLimit">
    <button @click="onEraseClicked">Clear history</button>
    <p>Success: {{ success }}</p>
    <p>Fail: {{ fail }}</p>
    <p>Win rate: {{ success/(success+fail) }}</p>
    <p>Bets/second: {{ frequencyCounter.getLastPeriodsAverage(10) }}({{ frequencyCounter.getLastPeriodsAverage(1) }})</p>
    <button @click="success=fail=0">Reset statitics</button>
    <HistoryComponent :elements="elements" />
</template>
<style scoped>
    p {
        margin: 0;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(6,1fr);
        max-width: 100vw;
    }
    .grid p {
        grid-row-start: 1;
        grid-row-end: 2;
    }
    .grid * {
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
    }
</style>