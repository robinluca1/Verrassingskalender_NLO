<template>
  <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal" :class="`${prize_type}`">
      <button class="modal-close" @click="$emit('close')">✕</button>

      <div v-if="prize_type === 'jackpot'" class="jackpot">
        <h2 class="modal-title">Jackpot!</h2>
        <p class="modal-bedrag">€ {{ prize.toLocaleString('nl-NL') }}</p>
        <p class="modal-sub">Gefeliciteerd! U heeft de jackpot gewonnen.</p>
      </div>

      <div v-else-if="prize_type === 'consolation_prize'" class="consolation_prize">
        <h2 class="modal-title">Troostprijs</h2>
        <p class="modal-bedrag">€ {{ prize.toLocaleString('nl-NL') }}</p>
        <p class="modal-sub">Gefeliciteerd! U heeft een troostprijs gewonnen.</p>
      </div>

      <div v-else class="niets">
        <h2 class="modal-title">Helaas...</h2>
        <p class="modal-sub">U heeft geen prijs gewonnen. Probeer een ander vakje!</p>
      </div>

      <button class="modal-btn" @click="$emit('close')">Doorgaan</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  prize_type: {
    type: String
  },
  prize: {type: Number},
})

defineEmits(['close'])

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

.modal {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 48px 40px 36px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.25s ease;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.15s;
}

.modal-close:hover {
  color: var(--text);
}

.modal-title {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 10px;
  color: var(--text);
}

.modal.jackpot .modal-title {
  color: var(--gold-light);
}

.modal.consolation_prize .modal-title {
  color: var(--green);
}

.modal-bedrag {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
}

.modal.jackpot .modal-bedrag {
  color: var(--gold);
}

.modal.consolation_prize .modal-bedrag {
  color: var(--green);
}

.modal-sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 28px;
}

.modal-btn {
  background: var(--border);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 28px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.modal-btn:hover {
  background: #2e2e3a;
  border-color: var(--muted);
}
</style>
