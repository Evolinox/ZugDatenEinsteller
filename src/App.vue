<script setup lang="ts">
import { onMounted } from "vue";
import { useColorMode } from '@vueuse/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import Formation from "@/views/Formation.vue";
import Custom from "@/views/Custom.vue";
import SevenSegmentBox from "@/components/ui/digits/SevenSegmentBox.vue";

import { computed, ref, watch } from 'vue'

import vehicles from './assets/vehicles.json';

const formation = ref([])
const vmax = ref(12)
const bra = ref(0)
const brh = ref([0, 0])
const zl = ref([0, 0])

const vmaxStr = computed(() => vmax.value.toString().padStart(2, '0'))
const vmaxHunderter = computed(() => parseInt(vmaxStr.value[0]))
const vmaxZehner = computed(() => parseInt(vmaxStr.value[1]))

onMounted(() => {
    const colorMode = useColorMode();
    colorMode.value = 'dark';
})

watch(formation, (newFormation) => {
    console.log('formation got updated: ', newFormation);
    console.log('number of vehicles: ', newFormation.vehicles.length);
    // Calculate new Trainlength
    let totallengthMm = 0
    for (const loco of newFormation.vehicles) {
        for (const vehicle of vehicles.vehicles) {
            if (vehicle.code === loco) {
                totallengthMm += vehicle.length;
            }
        }
    }
    console.log(totallengthMm)
    // Länge auf vollen Zehner aufrunden
    const totallengthM = Math.ceil(totallengthMm / 1000 / 10) * 10

    zl.value = [
        Math.floor(totallengthM / 100),
        Math.floor((totallengthM % 100) / 10)
    ]
})
watch(vmax, (newVmax) => {
    console.log('vmax got updated: ', newVmax);
})
</script>

<template>
    <div class="input-block">
        <Tabs default-value="formation" class="w-[400px]">
            <TabsList class="w-full">
                <TabsTrigger value="formation">
                    Vorgegebene Formationen
                </TabsTrigger>
                <TabsTrigger value="custom">
                    Eigene Formation
                </TabsTrigger>
            </TabsList>
            <TabsContent value="formation">
                <Formation v-model:formation="formation" v-model:vmax="vmax" class="h-[250px] w-full" />
            </TabsContent>
            <TabsContent value="custom">
                <Custom v-model:formation="formation" v-model:vmax="vmax" class="h-[250px] w-full" />
            </TabsContent>
        </Tabs>
    </div>
    <Separator label="Zugdaten"/>
    <div class="output-block">
        <div class="display-panel">
            <SevenSegmentBox label="BRA" :digits="[bra]" />
            <SevenSegmentBox label="BRH" :digits="[brh[0], brh[1]]" />
            <SevenSegmentBox label="ZL" :digits="[zl[0], zl[1]]" />
            <SevenSegmentBox label="VMZ" :digits="[vmaxHunderter, vmaxZehner]" />
        </div>
    </div>
</template>

<style>
.input-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
}
.display-panel {
    display: flex;
    justify-content: space-evenly;
    padding-top: 10px;
}
</style>