<script setup>
import { computed } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
    number: {
        type: Number,
        required: true,
        validator: (val) => val >= 0 && val <= 9
    }
})

// Welche Segmente für welche Zahl aktiv sind
const segmentMap = {
    0: ['a', 'b', 'c', 'd', 'e', 'f'],
    1: ['b', 'c'],
    2: ['a', 'b', 'g', 'e', 'd'],
    3: ['a', 'b', 'g', 'c', 'd'],
    4: ['f', 'g', 'b', 'c'],
    5: ['a', 'f', 'g', 'c', 'd'],
    6: ['a', 'f', 'e', 'd', 'c', 'g'],
    7: ['a', 'b', 'c'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g']
}

const segments = computed(() => {
    const activeSegments = segmentMap[props.number]
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(name => ({
        name,
        active: activeSegments.includes(name)
    }))
})
</script>

<template>
    <div class="digit">
        <div v-for="segment in segments"
             :key="segment.name"
             :class="['segment', segment.name, { active: segment.active }]">
        </div>
    </div>
</template>

<style scoped>
.digit {
    position: relative;
    width: 40px;
    height: 70px;
    background-color: #2E0D10;
}
.segment {
    position: absolute;
    background-color: #333;
    opacity: 0.1;
    transition: opacity 0.2s;
}
.segment.active {
    opacity: 1;
    background-color: #ECC614;
}

/* Segmentpositionen */
.segment.a { top: 0; left: 5px; right: 5px; height: 6px; }
.segment.b { top: 5px; right: 0; width: 6px; height: 30px; }
.segment.c { bottom: 5px; right: 0; width: 6px; height: 30px; }
.segment.d { bottom: 0; left: 5px; right: 5px; height: 6px; }
.segment.e { bottom: 5px; left: 0; width: 6px; height: 30px; }
.segment.f { top: 5px; left: 0; width: 6px; height: 30px; }
.segment.g { top: 32px; left: 5px; right: 5px; height: 6px; }
</style>
