import React from 'react'
import styled from 'styled-components'
import { Dialog } from 'radix-ui'
import { IconButton, icons } from '@/components/primitives'
import { tokens } from '@/styles/tokens'

type ModalProps = {
	open: boolean
	onClose: () => void
	children: React.ReactNode
}

type SlotProps = { children: React.ReactNode }
type HeaderProps = SlotProps & { showClose?: boolean }

type ModalComponent = React.FC<ModalProps> & {
	Header: React.FC<HeaderProps>
	Content: React.FC<SlotProps>
	Footer: React.FC<SlotProps>
}

const Overlay = styled(Dialog.Overlay)`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(2px);
	z-index: 999;
	// pointer-events: none;
	// display: none;
`

const Content = styled(Dialog.Content)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: ${tokens.color.bg.card};
	border-radius: ${tokens.radius.modal};
	width: 100%;
	max-width: 1022px;
	max-height: min(880px, 100vh - ${tokens.spacing[6]});
	display: flex;
	flex-direction: column;
	z-index: 1000;
`

const HeaderWrapper = styled.header`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${tokens.spacing[6]};
	z-index: 2;
`

const HeaderContent = styled.div`
	display: flex;
	align-items: center;
`

const Body = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	min-height: 0;
`

const FooterWrapper = styled.footer`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: flex-end;
	padding: ${tokens.spacing[6]};
	z-index: 2;
`

const ModalBase: React.FC<ModalProps> = ({ open, onClose, children }) => (
	// Close modal when Radix signals open=false
	<Dialog.Root open={open} onOpenChange={(nextOpen: boolean) => !nextOpen && onClose()}>
		<Dialog.Portal>
			<Overlay />
			<Content>{children}</Content>
		</Dialog.Portal>
	</Dialog.Root>
)

// Modal component built on Radix Dialog, with Header, Content, and Footer slots
export const Modal = ModalBase as ModalComponent

Modal.Header = ({ children, showClose = true }: HeaderProps) => (
	<HeaderWrapper>
		<HeaderContent>
			<Dialog.Title asChild>{children}</Dialog.Title>
		</HeaderContent>
		{showClose && (
			<Dialog.Close asChild>
				<IconButton iconProps={{ icon: icons.close }} aria-label='Close modal' />
			</Dialog.Close>
		)}
	</HeaderWrapper>
)

Modal.Content = ({ children }: SlotProps) => <Body>{children}</Body>

Modal.Footer = ({ children }: SlotProps) => <FooterWrapper>{children}</FooterWrapper>

Modal.Header.displayName = 'Modal.Header'
Modal.Content.displayName = 'Modal.Content'
Modal.Footer.displayName = 'Modal.Footer'
