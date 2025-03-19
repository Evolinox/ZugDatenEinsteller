<script setup lang="ts">
import { onMounted } from "vue";
import { useColorMode } from '@vueuse/core';

import formations from './assets/formations.json';
import vehicles from './assets/vehicles.json';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import Formation from "@/views/Formation.vue";
import Custom from "@/views/Custom.vue";

onMounted(() => {
    const colorMode = useColorMode();
    colorMode.value = 'dark';
})
</script>

<template>
    <Tabs default-value="formation" class="w-[400px]">
        <TabsList>
            <TabsTrigger value="formation">
                Vorgegebene Formationen
            </TabsTrigger>
            <TabsTrigger value="custom">
                Eigene Formation
            </TabsTrigger>
        </TabsList>
        <TabsContent value="formation">
            <Formation/>
        </TabsContent>
        <TabsContent value="custom">
            <Custom/>
        </TabsContent>
    </Tabs>
    <Separator label="ZDE Eingabe"/>
</template>