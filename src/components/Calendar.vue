<template>
  <div class="grid-wrapper">
    <div class="grid" :style="gridStyle">
      <Cell
          v-for="i in total"
          :index="i - 1"
          :is-open="isOpen(i - 1)"
          :prize="getPrize(i - 1)"
          @click="$emit('open', i - 1)"/>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import Cell from './Cell.vue'
import {useCalendar} from "../CalendarComposer.js";

defineProps({
  isOpen: {type: Function},
  getPrize: {type: Function}
})

defineEmits(['open'])

const {Total: total, Grid_cols} = useCalendar()

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Grid_cols}, minmax(0, 1fr))`,
}))
</script>


<style scoped>
.grid-wrapper {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.grid {
  display: grid;
  gap: 2px;
}
</style>