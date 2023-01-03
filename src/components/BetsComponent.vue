<script lang="ts" setup>
    import HistoryComponent from './History.vue';
    import type { HistoryElement } from '../assets/history';
    import { ref, type Ref } from 'vue';
    import BetMaker from '../assets/BetMaker';
    import Casino from '../assets/Casino';

    var elements = ref( new Array<HistoryElement> );

    var casino = ref(new Casino(100, 2, 1));
    var betMaker = ref(new BetMaker(1000));

    var runs = ref(false);

    function addElement(element : HistoryElement) {
        elements.value.unshift(element);
        if(elements.value.length > 500)elements.value.pop();
    }
    function onRunClicked() {
        runs.value = !runs.value;
        if(!runs.value) return;
        makeBet();
    }
    async function makeBet() {
        if(!runs.value) return;
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
            info =  { text: 'Error: ' + e, renderColor: '#f00' };
            casino.value.balance = 100;
            //runs.value = false;
            addElement(info);
        }
        
        setTimeout( makeBet );
    }
    
    function onEraseClicked() {
        elements.value.length = 0;
    }
</script>
<template>
    <input :disabled="runs" placeholder="Initial balance" id="balance" v-model="casino.balance">
    <input :disabled="runs" placeholder="Multiplier" id="multiplier" v-model="casino.multiplier">
    <input :disabled="runs" placeholder="Minimal bet" v-model="casino.minBet">
    <input :disabled="runs" placeholder="Aim" v-model="betMaker.aim">
    <button @click="onRunClicked">Run/Stop</button>
    <button @click="onEraseClicked">Clear history</button>
    <HistoryComponent :elements="elements" />
</template>