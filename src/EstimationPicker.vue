<script setup lang="ts">
import {estimations, formatHours} from "@/estimations.ts";

const model = defineModel<number>();
const {min, max} = defineProps<{
  min?: number;
  max?: number;
}>();

</script>

<template>
  <div class="flex flex-col gap-4 max-h-full max-w-full overflow-x-hidden overflow-y-auto">
    <button type="button" v-for="estimation of estimations" :key="estimation"
            class="block w-full text-center bg-neutral-100 p-4 border-2 border-neutral-300 rounded-md hover:bg-neutral-100 active:bg-neutral-200 aria-selected:bg-blue-200! aria-selected:border-blue-400! data-[fallback=true]:bg-transparent data-[fallback=true]:text-neutral-400 data-[fallback=true]:border-transparent"
            @click="model = (estimation !== model) ? estimation : undefined"
            :aria-selected="estimation === model"
            :data-fallback="(min && estimation < min) || (max && estimation > max)">
      {{ formatHours(estimation) }}
    </button>
    <div class="flex w-full max-w-full items-baseline gap-2">
      <input type="number" v-model="model" class="min-w-0 p-4 text-center border-2 border-neutral-300 rounded-md bg-white flex-1" />
      <span>h</span>
    </div>
  </div>
</template>
