import { ref } from 'vue'

const grid_rows = 100
const grid_cols = 100
const hoofdprijs_aantal = 1
const hoofdprijs_bedrag = 25000
const troostprijs_aantal = 100
const troostprijs_bedrag = 100


const totaal = grid_rows * grid_cols
const Storage_prizes = 'prizes'
const Storage_opened = 'opened'

function generatePrizes() {
    const prizes = []
    for (let i = 0; i < totaal; i++) {
        prizes[i] = 0
    }

    const beschikbaar = []
    for (let i = 0; i < totaal; i++) {
        beschikbaar[i] = i
    }

    function kiesVakje() {
        const index = Math.floor(Math.random() * beschikbaar.length)
        const vakje = beschikbaar[index]
        beschikbaar[index] = beschikbaar[beschikbaar.length - 1]
        beschikbaar.pop()
        return vakje
    }

    for (let i = 0; i < hoofdprijs_aantal; i++) {
        prizes[kiesVakje()] = hoofdprijs_bedrag
    }

    for (let i = 0; i < troostprijs_aantal; i++) {
        prizes[kiesVakje()] = troostprijs_bedrag
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


    function openVakje(index) {
        if (opened.value.has(index)) return null
        opened.value = new Set(opened.value)
        opened.value.add(index)
        localStorage.setItem(Storage_opened, JSON.stringify([...opened.value]))

        return prizes.value[index]
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
        openVakje,
        isOpen,
        getPrize,
        resetGame,
        Totaal: totaal,
        Grid_rows: grid_rows,
        Grid_cols: grid_cols,
        Hoofdprijs_bedrag: hoofdprijs_bedrag,
        Troostprijs_bedrag: troostprijs_bedrag,
    }
}
