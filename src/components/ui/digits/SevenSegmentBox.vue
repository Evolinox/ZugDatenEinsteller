<script setup lang="ts">
import SevenSegmentDigit from './SevenSegmentDigit.vue'

defineProps({
    label: String,
    digits: {
        type: Array,
        default: () => [0]
    }
})
</script>

<template>
    <div class="display-box">
        <div class="label">{{ label }}</div>
        <div class="digit-row">
            <SevenSegmentDigit
                v-for="(digit, index) in digits"
                :key="index"
                :number="digit"
            />
        </div>
    </div>
</template>

<style scoped>
.display-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
}
.label {
    font-weight: bold;
    margin-bottom: 4px;
}
.digit-row {
    display: flex;
    flex-direction: row;
}
</style>