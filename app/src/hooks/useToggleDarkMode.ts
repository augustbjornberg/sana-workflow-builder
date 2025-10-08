import { useEffect, useState } from 'react'

export const useToggleDarkMode = (toggleKey = 'F10') => {
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
        // Toggle dark mode on specified key press
		const handler = (event: KeyboardEvent) =>
			event.key === toggleKey && setEnabled(prev => {
				document.documentElement.classList.toggle('dark', !prev)
				return !prev
			})

		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [toggleKey])

	useEffect(() => {
        // Ensure class is in sync when `enabled` changes externally
		document.documentElement.classList.toggle('dark', enabled)
	}, [enabled])

	return { enabled }
}