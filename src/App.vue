<script setup lang="ts">
// Vue Imports
import { onMounted, computed, ref, watch } from "vue";
import { useColorMode } from '@vueuse/core';

// Shadcn/Vue Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

// Eigene Views/Komponenten
import Formation from "@/views/Formation.vue";
import Custom from "@/views/Custom.vue";
import SevenSegmentBox from "@/components/ui/digits/SevenSegmentBox.vue";

// Import der Vehicle JSON Datei
import vehicles from './assets/vehicles.json';

// ZDE Variablen
const formation = ref([])
const vmax = ref(120)    // Höchstgeschwindigkeit laut Fahrplan, standard = 120 km/h
const bra = ref(9)      // Standardmäßig auf 9, wird später mal richtig implementiert
const brh = ref([0, 0]) // Bremshundertstel, werden auf Basis der Formation berechnet
const zl = ref([0, 0])  // Zuglänge, wird auch auf Basis der Formation berechnet

// Dynamische aufteilung der Vmax in zwei Werte
// Vmax = 160 km/h => vmaxHunderter = 1, vmaxZehner = 6
const vmaxStr = computed(() => vmax.value.toString().padStart(2, '0'))
const vmaxHunderter = computed(() => parseInt(vmaxStr.value[0]))
const vmaxZehner = computed(() => parseInt(vmaxStr.value[1]))

// Vue.js onMounted Call
// Im Moment nur dafür da, denn Darkmode zu aktivieren
onMounted(() => {
    const colorMode = useColorMode();
    colorMode.value = 'dark';
})

// Wird ausgeführt, sobald sich die Formation verändert
// Berechnet im Moment nur die Zuglänge
watch(formation, (newFormation) => {
    console.log('formation got updated: ', newFormation);
    console.log('number of vehicles: ', newFormation.vehicles.length);
    // Calculate new Trainlength
    let totallengthMm = 0
    for (const loco of newFormation.vehicles) {
        for (const vehicle of vehicles.vehicles) {
            if (vehicle.code === loco[0]) {
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

    // Bremshundertstel berechnen
    let totalBrakeWeight = 0
    let totalTrainWeight = 0
    for (const loco of newFormation.vehicles) {
        for (const vehicle of vehicles.vehicles) {
            if (vehicle.code === loco[0]) {
                const brakeWeightValues = Object.values(vehicle.brakeWeights);
                totalTrainWeight += vehicle.weight;
                totalBrakeWeight += brakeWeightValues[loco[1]];
            }
        }
    }
    console.log(totalBrakeWeight)
    console.log(totalTrainWeight)
    const bremshuntertstel = (totalBrakeWeight / totalTrainWeight) * 100;
    console.log(bremshuntertstel)
    const brhRounded = Math.floor(bremshuntertstel / 10) * 10;
    brh.value = brhRounded.toString().padStart(2, '0').slice(0, 2).split('').map(Number);
})

// Wird ausgeführt, sobald sich die Vmax verändert
// Dient lediglich dem logging
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
.output-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
}
.display-panel {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
</style>