'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { WorkflowModal } from '@/features/workflow/WorkflowModal'
import { useToggleDarkMode } from '@/hooks/useToggleDarkMode'

export default function Page() {

	const [open, setOpen] = useState(true)
	const { enabled: darkMode } = useToggleDarkMode('F10')

	return (
		<StyledPage className={darkMode ? 'dark' : ''}>
			<main>
				<WorkflowModal open={open} onClose={() => setOpen(false)} />
			</main>
		</StyledPage>
	)
}

export const StyledPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`
