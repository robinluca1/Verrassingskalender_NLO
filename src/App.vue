<template>
  <div class="app">
    <header class="header">
      <div class="header-left">
        <h1 class="title">Verrassingskalender 2026</h1>
        <p class="tagline"> {{ Total }} vakjes · 1 hoofdprijs · 100 troostprijzen</p>
      </div>
      <button class="reset-btn" @click="resetGame()">Reset</button>
    </header>

    <Calendar
        :is-open="isOpen"
        :get-prize="getPrize"
        @open="handleOpen"
    />

    <Modal
        :visible="modalVisible"
        :prize_type="lastPrizeType"
        :prize="lastPrize"
        @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useCalendar} from './CalendarComposer.js'
import Calendar from './components/Calendar.vue'
import Modal from './components/Modal.vue'

const {isOpen, getPrize, OpenSquare, resetGame, Total, jackpot_amount, consolation_prize_amount} = useCalendar()
const modalVisible = ref(false)
const lastPrize = ref(0)
const lastPrizeType = ref('niets')

function getPrizeType(prize) {
  if (prize === jackpot_amount) return 'jackpot'
  if (prize === consolation_prize_amount) return 'consolation_prize'
  return 'niets'
}

function handleOpen(index) {
  const prize = OpenSquare(index)
  if (prize === null) return
  lastPrize.value = prize
  lastPrizeType.value = getPrizeType(prize)
  modalVisible.value = true
  console.log(lastPrize.value)
  console.log(lastPrizeType.value)
}

</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.header-left {
  flex: 1;
  min-width: 200px;
}

.title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text);
}

.tagline {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.reset-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  white-space: nowrap;
}

.reset-btn:hover {
  border-color: var(--muted);
  color: var(--text);
}
</style>
