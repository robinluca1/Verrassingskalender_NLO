import {ref} from 'vue'

const grid_rows = 100
const grid_cols = 100
const jackpot_count = 1
const jackpot_amount = 25000
const consolation_prize_count = 100
const consolation_prize_amount = 100


const total = grid_rows * grid_cols
const Storage_prizes = 'prizes'
const Storage_opened = 'opened'

function generatePrizes() {
    const prizes = []
    for (let i = 0; i < total; i++) {
        prizes[i] = 0
    }

    const available = []
    for (let i = 0; i < total; i++) {
        available[i] = i
    }

    function ChooseSquare() {
        const index = Math.floor(Math.random() * available.length)
        const square = available[index]
        available[index] = available[available.length - 1]
        available.pop()
        return square
    }

    // Berekenen welke vakjes prijzen krijgen
    for (let i = 0; i < jackpot_count; i++) {
        prizes[ChooseSquare()] = jackpot_amount
    }

    for (let i = 0; i < consolation_prize_count; i++) {
        prizes[ChooseSquare()] = consolation_prize_amount
    }

    return prizes
}

const prizes = ref([])
const opened = ref(new Set())
const initialized = ref(false)

export function useCalendar() {
    // State behouden
    if (!initialized.value) {
        const stored = localStorage.getItem(Storage_prizes)
        if (stored) {
            prizes.value = JSON.parse(stored)
        } else {
            prizes.value = generatePrizes()
            localStorage.setItem(Storage_prizes, JSON.stringify(prizes.value))
        }

        const storedOpened = localStorage.getItem(Storage_opened)
        if (storedOpened) {
            opened.value = new Set(JSON.parse(storedOpened))
        }

        initialized.value = true
    }


    function openSquare(index) {
        if (opened.value.has(index)) return null
        opened.value = new Set(opened.value)
        opened.value.add(index)
        localStorage.setItem(Storage_opened, JSON.stringify([...opened.value]))

        return prizes.value[index] ?? 0
    }

    function isOpen(index) {
        return opened.value.has(index)
    }

    function getPrize(index) {
        return prizes.value[index]
    }

    function resetGame() {
        localStorage.removeItem(Storage_prizes)
        localStorage.removeItem(Storage_opened)
        prizes.value = generatePrizes()
        localStorage.setItem(Storage_prizes, JSON.stringify(prizes.value))
        opened.value = new Set()
        initialized.value = true
    }

    return {
        prizes,
        opened,
        OpenSquare: openSquare,
        isOpen,
        getPrize,
        resetGame,
        Total: total,
        Grid_rows: grid_rows,
        Grid_cols: grid_cols,
        jackpot_amount: jackpot_amount,
        consolation_prize_amount: consolation_prize_amount,
    }
}
