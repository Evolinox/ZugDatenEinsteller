<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from '@/components/ui/combobox'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'

import { Check, Search } from 'lucide-vue-next'

import formations from '../assets/formations.json';

import { ref, watch } from 'vue'

const props = defineProps<{
    formation: Array<{ locoId: string; brakeIndex: number }>
    vmax: number
}>()

const emit = defineEmits<{
    (e: 'update:formation', value: Array<{ locoId: string; brakeIndex: number }>): void
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
                <Label for="formation-select">Suche nach Lokomotiven oder Wagen...</Label>
                <Combobox id="formation-select" by="label" v-model="formation">
                    <ComboboxAnchor>
                        <div class="relative w-[350px] items-center">
                            <ComboboxInput class="pl-9" :display-value="(val) => val?.short ?? ''" placeholder="Wähle Formation..." />
                            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                              <Search class="size-4 text-muted-foreground" />
                            </span>
                        </div>
                    </ComboboxAnchor>
                    <ComboboxList class="ml-32 w-[350px]">
                        <ComboboxEmpty>
                            Keine Formation gefunden.
                        </ComboboxEmpty>
                        <ComboboxGroup>
                            <ComboboxItem v-for="f in formations.formationen" :key="f.id" :value="f">
                                {{ f.short }}
                                <ComboboxItemIndicator>
                                    <Check :class="cn('ml-auto h-4 w-4')" />
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>
                    </ComboboxList>
                </Combobox>
            </div>
        </CardContent>
    </Card>
</template>