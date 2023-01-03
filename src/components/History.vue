<script lang="ts" setup>
    import { ref } from 'vue';
    import type { HistoryElement } from '../assets/history';

    var props = defineProps(['elements']);
    var elements = ( props.elements !== undefined ? ref( props.elements ) : new Array<HistoryElement>) as HistoryElement[];
</script>
<template>
    <div class="history">
        <div v-for="element in elements" :style="'background-color:' + element.renderColor">{{ element.text }}</div>
    </div>
</template>
<style scoped>
    .history {
        border: 1px solid #000;
        width: 100%;
        height: 300px;
        overflow-y: auto;
    }
</style>