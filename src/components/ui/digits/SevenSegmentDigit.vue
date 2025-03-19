<script setup>
import { computed } from 'vue'

const props = defineProps({
    number: {
        type: Number,
        required: true,
        validator: (val) => val >= 0 && val <= 9
    }
})

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
    <div class="display-background">
        <div class="digit">
            <div
                v-for="segment in segments"
                :key="segment.name"
                :class="['segment', segment.name, { active: segment.active }]"
            />
        </div>
    </div>
</template>

<style scoped>
.display-background {
    width: 50px;
    height: 70px;
    background-color: #1a0000; /* dunkles Rot */
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 6px #000;
}

.digit {
    width: 36px;
    height: 60px;
    position: relative;
}

.segment {
    position: absolute;
    background-color: #ffcc33;
    opacity: 0.08;
    transition: opacity 0.2s, background-color 0.2s;
    clip-path: polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%);
    border-radius: 2px;
}
.segment.active {
    opacity: 1;
    background-color: #ffcc33;
    box-shadow: 0 0 8px #ffcc33aa;
}

.segment.a,
.segment.d,
.segment.g {
    left: 10%;
    right: 10%;
    height: 12%;
}

.segment.b,
.segment.c,
.segment.e,
.segment.f {
    width: 16%;
}

.segment.a { top: 0; }
.segment.b { top: 12%; right: 0; height: 36%; }
.segment.c { bottom: 12%; right: 0; height: 36%; }
.segment.d { bottom: 0; }
.segment.e { bottom: 12%; left: 0; height: 36%; }
.segment.f { top: 12%; left: 0; height: 36%; }
.segment.g { top: 44%; }
</style>