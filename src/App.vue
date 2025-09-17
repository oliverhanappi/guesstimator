<script setup lang="ts">
import EstimationPicker from './EstimationPicker.vue';
import {computed, ref, watch} from "vue";
import {formatHours} from "@/estimations.ts";

const bestCase = ref<number>();
const mostLikely = ref<number>();
const worstCase = ref<number>();

const estimation = computed(() => {
  if (bestCase.value && mostLikely.value && worstCase.value) {
    const totalHours = Math.round((bestCase.value + 4 * mostLikely.value + worstCase.value) / 6);
    return formatHours(totalHours);
  }

  return "-";
})

watch(bestCase, () => {
  if (bestCase.value && mostLikely.value && mostLikely.value < bestCase.value) {
    mostLikely.value = bestCase.value;
  }
})

watch(mostLikely, () => {
  if (bestCase.value && mostLikely.value && mostLikely.value < bestCase.value) {
    bestCase.value = mostLikely.value;
  }

  if (worstCase.value && mostLikely.value && mostLikely.value > worstCase.value) {
    worstCase.value = mostLikely.value;
  }
});

watch(worstCase, () => {
  if (worstCase.value && mostLikely.value && mostLikely.value > worstCase.value) {
    mostLikely.value = worstCase.value;
  }
})

function reset() {
  bestCase.value = undefined;
  mostLikely.value = undefined;
  worstCase.value = undefined;
}

</script>

<template>
  <div class="fixed inset-4 grid grid-cols-3 grid-rows-[auto_auto_1fr_auto] gap-x-8">
    <div class="col-start-1 col-span-3 row-1 text-center">
      <p class="text-lg">Guesstimation</p>
      <p class="text-3xl font-bold">{{estimation}}</p>
    </div>
    <div class="row-2 col-1 text-center p-2">
      <p class="text-sm">Best case</p>
      <p class="text-xl font-bold">{{formatHours(bestCase) ?? "-"}}</p>
    </div>
    <div class="row-2 col-2 text-center p-2">
      <p class="text-sm">Most likely</p>
      <p class="text-xl font-bold">{{formatHours(mostLikely) ?? "-"}}</p>
    </div>
    <div class="row-2 col-3 text-center p-2">
      <p class="text-sm">Worst case</p>
      <p class="text-xl font-bold">{{formatHours(worstCase) ?? "-"}}</p>
    </div>
    <div class="row-3 col-1 overflow-hidden"><EstimationPicker v-model="bestCase" :max="mostLikely" /></div>
    <div class="row-3 col-2 overflow-hidden"><EstimationPicker v-model="mostLikely" :min="bestCase" :max="worstCase" /></div>
    <div class="row-3 col-3 overflow-hidden"><EstimationPicker v-model="worstCase" :min="mostLikely" /></div>
    <h1 class="col-start-1 col-span-3 row-4">
      <button type="button" @click="reset" class="block mt-4 w-3/4 mx-auto p-4 bg-white rounded-md border-2 border-neutral-300">Reset</button>
    </h1>
  </div>
</template>
