<template>
  <button
      class="cell"
      :class="{
      'cell--open': isOpen,
      'cell--jackpot': isOpen && prize === jackpot_amount,
      'cell--consolation_prize': isOpen && prize === consolation_prize_amount,
      'cell--empty': isOpen && prize === 0,
    }"
      @click="$emit('click', index)"
  >
    <span v-if="!isOpen" class="cell-num">{{ index + 1 }}</span>
  </button>
</template>

<script setup>
import {useCalendar} from "../CalendarComposer.js";

const {jackpot_amount, consolation_prize_amount} = useCalendar()

defineProps({
  index: {type: Number, required: true},
  isOpen: {type: Boolean, default: false},
  prize: {type: Number, default: 0},
})

defineEmits(['click'])
</script>

<style scoped>
.cell {
  width: 100%;
  aspect-ratio: 1;
  background: var(--cell-closed);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  padding: 0;
  outline: none;
  position: relative;
  overflow: hidden;
}

.cell:hover:not(.cell--open) {
  border-color: var(--muted);
  z-index: 2;
}

.cell:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 1px;
}

.cell-num {
  font-size: clamp(4px, 0.8vw, 8px);
  font-weight: 500;
  line-height: 1;
}

.cell--open {
  cursor: default;
  animation: flipIn 0.3s ease both;
}

.cell--empty {
  background: var(--cell-open-empty);
  border-color: #1a1a1f;
}

.cell--consolation_prize {
  background: rgba(76, 175, 130, 0.12);
  border-color: rgba(76, 175, 130, 0.4);
}

.cell--jackpot {
  background: rgba(201, 168, 76, 0.15);
  border-color: var(--gold);
  box-shadow: 0 0 8px rgba(201, 168, 76, 0.3);
}
</style>
