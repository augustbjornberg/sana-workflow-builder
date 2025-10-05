'use client'

import {useState} from 'react'

import styles from './page.module.css'

import { WorkflowModal } from '@/features/workflow/WorkflowModal'

export default function Home() {

	const [open, setOpen] = useState(true)

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<WorkflowModal open={open} onClose={() => setOpen(false)} />
			</main> 
		</div>
	)
}
