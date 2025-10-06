import React from 'react'
import styled from 'styled-components'

import { Modal, Button, icons } from '@/components/primitives/'

import { WorkflowBuilder } from '../WorkflowBuilder'
import { useWorkflowSteps } from '../WorkflowBuilder/useWorkflowSteps'

import { typography } from '@/styles/tokens'

type WorkflowModalProps = {
	open: boolean
	onClose: () => void
}

export const NameInput = styled.input`
	font-weight: ${typography.weights.medium};
	background: transparent;
`

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ open, onClose }) => {

	const [name, setName] = React.useState('New Workflow')

	const {
		steps,
		addStep,
		updateStep,
		deleteStep,
		reorderSteps,
		isDirty,
		save
	} = useWorkflowSteps()

	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header>
				<NameInput
					value={name}
					onChange={event => setName(event.target.value)}
					aria-label="Workflow name"
				/>
			</Modal.Header>

			<Modal.Content>
				<WorkflowBuilder
					steps={steps}
					onAdd={addStep}
					onChange={updateStep}
					onDelete={deleteStep}
					onReorder={reorderSteps}
				/>
			</Modal.Content>

			<Modal.Footer>
				<Button
					onClick={save}
					disabled={!isDirty}
					aria-label='Save workflow'
					icon={icons.arrow}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
