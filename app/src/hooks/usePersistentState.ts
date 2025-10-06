import { useState, useEffect, useCallback } from 'react'

export function usePersistentState<T>(key: string, initial: T) {
	const [value, setValue] = useState<T>(initial)
	const [savedValue, setSavedValue] = useState<T>(initial)
	const [isReady, setIsReady] = useState(false)

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const raw = localStorage.getItem(key)
			if (raw) {
				const parsed = JSON.parse(raw)
				setValue(parsed)
				setSavedValue(parsed)
			} else {
				localStorage.setItem(key, JSON.stringify(initial))
			}
		} catch (err) {
			console.error(`usePersistentState: Failed to load from localStorage for key "${key}"`, err)
		} finally {
			setIsReady(true)
		}
	}, [key])

	// Derived flag: has the user modified the value?
	const isDirty = isReady && JSON.stringify(value) !== JSON.stringify(savedValue)

	// Save current value to localStorage
	const save = useCallback(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value))
			setSavedValue(value)
		} catch (err) {
			console.error(`usePersistentState: Failed to save to localStorage for key "${key}"`, err)
		}
	}, [key, value])

	// Reset current value to last saved value
	const reset = useCallback(() => {
		setValue(savedValue)
	}, [savedValue])

	return { value, setValue, isDirty, save, reset }
}
