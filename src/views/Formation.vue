<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from '@/components/ui/combobox'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'

import { Check, Search } from 'lucide-vue-next'

import formations from '../assets/formations.json';
import vehicles from '../assets/vehicles.json';

import { ref, watch } from 'vue'

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
        <CardHeader>
            <CardDescription>
                Wähle aus verschiedenen vordefinierten Formationen aus.
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
            <div class="space-y-1">
                <Label for="formation-select">Suche nach Lokomotive oder Wagen...</Label>
                <Combobox id="formation-select" by="label">
                    <ComboboxAnchor>
                        <div class="relative w-[350px] items-center">
                            <ComboboxInput class="pl-9" :display-value="(val) => val?.short ?? ''" placeholder="Wähle Formation..." />
                            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                              <Search class="size-4 text-muted-foreground" />
                            </span>
                        </div>
                    </ComboboxAnchor>
                    <ComboboxList class="ml-36 w-[350px]">
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
            <div class="space-y-1 pt-2">
                <NumberField id="vmax" v-model="vmax" :default-value="12" :min="0">
                    <Label for="vmax">Höchstgeschwindigkeit lt. Fpl. (voller Zehner):</Label>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            </div>
        </CardContent>
    </Card>
</template>