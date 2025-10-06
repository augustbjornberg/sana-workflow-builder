import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Sana Workflow Builder',
	description: 'Sana Workflow Builder, created by August Björnberg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	)
}