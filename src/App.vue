<script setup lang="ts">
import { onMounted } from "vue";
import { useColorMode } from '@vueuse/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import Formation from "@/views/Formation.vue";
import Custom from "@/views/Custom.vue";
import SevenSegmentBox from "@/components/ui/digits/SevenSegmentBox.vue";

onMounted(() => {
    const colorMode = useColorMode();
    colorMode.value = 'dark';
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
                <Formation class="h-[250px] w-full" />
            </TabsContent>
            <TabsContent value="custom">
                <Custom class="h-[250px] w-full" />
            </TabsContent>
        </Tabs>
    </div>
    <Separator label="Zugdaten"/>
    <div class="output-block">
        <div class="display-panel">
            <SevenSegmentBox label="BRA" :digits="[9]" />
            <SevenSegmentBox label="BRH" :digits="[1, 8]" />
            <SevenSegmentBox label="ZL" :digits="[2, 1]" />
            <SevenSegmentBox label="VMZ" :digits="[2, 0]" />
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
    padding: 20px;
}
</style>