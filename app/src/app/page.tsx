'use client'

import styles from "./page.module.css"
import { Modal } from "@/components/primitives"

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Modal>
					<h2 style={{ margin: 0, marginBottom: '16px' }}>Modal Title</h2>
					<p>This is a modal content area.</p>
				</Modal>
			</main> 
		</div>
	)
}
