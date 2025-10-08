// Renders a vertical list of steps aligned on a central line with controls to add, edit, delete and reorder steps. Uses useWorkflowSteps hook to manage the steps
import React from 'react'
import styled from 'styled-components'

import { Modal, Button, icons, IconButton } from '@/components/primitives/'

import { WorkflowBuilder } from '../WorkflowBuilder'
import { useWorkflowSteps } from '../WorkflowBuilder/hooks/useWorkflowSteps'

import { tokens } from '@/styles/tokens'
import { ScrollArea } from '@/components/primitives/ScrollArea'

type WorkflowModalProps = {
	open: boolean
	onClose: () => void
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ open, onClose }) => {

	const [name, setName] = React.useState('')

	const {
		steps,
		addStep,
		updateStep,
		deleteStep,
		reorderSteps,
		isDirty,
		save
	} = useWorkflowSteps()

	const contentRef = React.useRef<HTMLDivElement | null>(null)

	// When step count changes, scroll to the bottom to reveal the newest step
	React.useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTo({
				top: contentRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}, [steps.length]) 

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header>
				<Title>
					<IconButton 
						iconProps={{
							icon: icons.bolt,
							size: 14
						}}
						aria-label='Change your workflow icon'
					/>
					<TitleInput
						value={name}
						placeholder='New workflow'
						onChange={event => setName(event.target.value)}
						aria-label='Change your workflow name'
					/>
				</Title>
			</Modal.Header>

			<Modal.Content>
				<ScrollArea autoScroll>
					<WorkflowBuilder
						steps={steps}
						onAdd={addStep}
						onChange={updateStep}
						onDelete={deleteStep}
						onReorder={reorderSteps}
					/>
				</ScrollArea>
			</Modal.Content>

			<Modal.Footer>
				<Button
					// variant='cta'
					onClick={save}
					disabled={!isDirty}
					aria-label='Save workflow'
					rightIconProps={{ icon: icons.arrow, size: 12 }}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export const Title = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-3); 
`

export const TitleInput = styled.input`
	font-size: ${tokens.typography.size.strong};
	font-weight: ${tokens.typography.weight.medium};
	background: transparent;
`