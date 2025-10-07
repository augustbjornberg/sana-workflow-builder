import React from 'react'
import { Dialog } from 'radix-ui'
import styles from './Modal.module.css'
import { IconButton, icons } from '@/components/primitives'

type ModalProps = {
	open: boolean
	onClose: () => void
	children: React.ReactNode
}

type SlotProps = { children: React.ReactNode }
type HeaderProps = SlotProps & { showClose?: boolean }

// Composite type 
type ModalComponent = React.FC<ModalProps> & {
	Header: React.FC<HeaderProps>
	Content: React.FC<SlotProps>
	Footer: React.FC<SlotProps>
}

const ModalBase: React.FC<ModalProps> = ({ open, onClose, children }) => (
	<Dialog.Root open={open} onOpenChange={(nextOpen: boolean) => !nextOpen && onClose()}>
		<Dialog.Portal>
			<Dialog.Overlay className={styles.overlay} />
			<Dialog.Content className={styles.content} >
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
)

// Cast to composite type, then attach slots 
export const Modal = ModalBase as ModalComponent

Modal.Header = ({ children, showClose = true }: HeaderProps) => (
	<header className={styles.header}>
		<div className={styles.headerContent}>
			<Dialog.Title asChild>
				{children}
			</Dialog.Title>
		</div>
		{showClose && (
			<Dialog.Close asChild>
				<IconButton name={icons.close} aria-label='Close modal' />
			</Dialog.Close>
		)}
	</header>
)

Modal.Content = ({ children }: SlotProps) => (
	<main className={styles.body}>{children}</main>
)

Modal.Footer = ({ children }: SlotProps) => (
	<footer className={styles.footer}>{children}</footer>
)

Modal.Header.displayName = 'Modal.Header'
Modal.Content.displayName = 'Modal.Content'
Modal.Footer.displayName = 'Modal.Footer'