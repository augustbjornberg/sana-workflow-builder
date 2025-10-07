'use client'

import {useState} from 'react'
import styled from 'styled-components'

import { WorkflowModal } from '@/features/workflow/WorkflowModal'

export default function Home() {

	const [open, setOpen] = useState(true)

	return (
		<Page>
			<main>
				<WorkflowModal open={open} onClose={() => setOpen(false)} />
			</main> 
		</Page>
	)
}

export const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`