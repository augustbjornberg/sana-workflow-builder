import React from 'react'
import styled from 'styled-components'

import { Modal, Button, icons, IconButton } from '@/components/primitives/'

import { WorkflowBuilder } from '../WorkflowBuilder'
import { useWorkflowSteps } from '../WorkflowBuilder/useWorkflowSteps'

import { typography } from '@/styles/tokens'
import { ScrollArea } from '@/components/primitives/ScrollArea'

type WorkflowModalProps = {
	open: boolean
	onClose: () => void
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ open, onClose }) => {

	const [name, setName] = React.useState('New workflow')

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

	// Scroll to 
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
						name={icons.bolt}
						aria-label=""
						iconSize={14}
					/>
					<TitleInput
						value={name}
						onChange={event => setName(event.target.value)}
						aria-label="Workflow name"
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
	font-weight: ${typography.weights.medium};
	background: transparent;
`