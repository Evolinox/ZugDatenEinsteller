<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from '@/components/ui/combobox'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'

import { Check, Search } from 'lucide-vue-next'

import formations from '../assets/formations.json';
import vehicles from '../assets/vehicles.json';

import { ref, watch } from 'vue'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Externe Anbindung an Parent ermöglichen
const props = defineProps<{ modelValue: number }>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

// Lokaler Wert, initialisiert aus dem Parent
const vmax = ref(props.modelValue)

// Whenever vmax changes, emit it to parent
watch(vmax, (newVal) => {
    emit('update:modelValue', newVal)
})
</script>

<template>
    <Card class="w-[350px]">
        <CardContent class="space-y-2">
            <div class="space-y-1 pt-4">
                <NumberField id="vmax" v-model="vmax" :default-value="12" :min="0">
                    <Label for="vmax">Höchstgeschwindigkeit lt. Fpl. (voller Zehner):</Label>
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