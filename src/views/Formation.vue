<script setup lang="ts">
import {cn} from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@/components/ui/combobox'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'

import {Check, ChevronsUpDown, Search} from 'lucide-vue-next'

import formations from '../assets/formations.json';

import {ref, watch} from 'vue'

const props = defineProps<{
    formation: Array<{ locoId: string; brakeIndex: number }>
    vmax: number
}>()

const emit = defineEmits<{
    (e: 'update:formation', value: Array<{ locoId: string; brakeIndex: number }>): void
    (e: 'update:vmax', value: number): void
}>()

const formation = ref(props.formation)
const selectedFormation = ref();
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
                        <NumberFieldDecrement/>
                        <NumberFieldInput/>
                        <NumberFieldIncrement/>
                    </NumberFieldContent>
                </NumberField>
            </div>
            <div class="space-y-1 pt-4">
                <Label for="formation-select">Suche nach Lokomotiven oder Wagen...</Label>
                <Combobox id="formation-select" v-model="formation" by="label">
                    <ComboboxAnchor class="w-[350px]" as-child>
                        <ComboboxTrigger as-child>
                            <Button variant="outline" class="flex justify-between items-center gap-2">
                                <span class="truncate">
                                    {{ formation?.short ?? 'Wähle Formation' }}
                                </span>
                                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </ComboboxTrigger>
                    </ComboboxAnchor>
                    <ComboboxList class="w-[350px]">
                        <div class="relative w-full max-w-sm items-center">
                            <ComboboxInput class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                                           placeholder="Wähle Formation..."/>
                            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                                <Search class="size-4 text-muted-foreground"/>
                            </span>
                        </div>
                        <ComboboxEmpty>
                            Keine Formation gefunden.
                        </ComboboxEmpty>
                        <ComboboxGroup>
                            <ComboboxItem v-for="f in formations.formationen" :key="f.id" :value="f">
                                {{ f.short }}
                                <ComboboxItemIndicator>
                                    <Check :class="cn('ml-auto h-4 w-4')"/>
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>
                    </ComboboxList>
                </Combobox>
            </div>
        </CardContent>
    </Card>
</template>