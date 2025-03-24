<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { ref, watch } from 'vue'

import { Formation } from "@/components/types/formation.types.ts";

const props = defineProps<{
    formation: Formation[]
    vmax: number
}>()

const emit = defineEmits<{
    (e: 'update:formation', value: Formation[]): void
    (e: 'update:vmax', value: number): void
}>()

const formation = ref(props.formation)
const vmax = ref(props.vmax)

watch(formation, (newVal) => {
    emit('update:formation', newVal)
})
watch(vmax, (newVal) => {
    emit('update:vmax', newVal)
})
</script>

<template>
    <Card class="w-[350px]">
        <CardContent class="space-y-2">
            <div class="space-y-1 pt-4">
                <NumberField id="vmax" v-model="vmax" :default-value="120" :min="10" :max="300" :step="10">
                    <Label for="vmax">Höchstgeschwindigkeit lt. Fpl.:</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            </div>
            <div class="space-y-1 pt-4">
                <Label for="formation-select">Füge Loks oder Wagen hinzu:</Label>
                <ScrollArea class="border rounded-md w-[350px] h-[100px] whitespace-nowrap">
                    <div class="flex p-4 space-x-4 w-max">
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </CardContent>
    </Card>
</template>