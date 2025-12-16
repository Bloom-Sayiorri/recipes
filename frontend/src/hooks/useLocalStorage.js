import { useEffect, useState } from "react"

function getLocalStorage(key) {
    const storedValue = localStorage.getItem(key) || ""
    try {
        return JSON.parse(storedValue)
    } catch { }
}

function setLocalStorage(key, value) {
    const valueToStore = JSON.stringify(value)
    localStorage.setItem(key, valueToStore)
}

function useLocalStorage(key, initialValue = null) {
    const [state, setState] = useState(getLocalStorage(key) || initialValue)

    useEffect((() => {
        setLocalStorage(key, state)
    }), [key, state])

    return [state, setState]
}

export {useLocalStorage}