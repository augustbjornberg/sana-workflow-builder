import React from 'react'
import styled from 'styled-components'

import { Button, IconButton, icons } from '@/components/primitives'
import { Step } from './types'

import { WorkflowStepList } from './components/WorkflowStepList'
import { OutlineMask } from './components/OutlineMask'

type WorkflowBuilderProps = {
	steps: Step[]
	onAdd: () => void
	onChange: (step: Step) => void
	onDelete: (step: Step) => void
	onReorder: (sourceId: string, targetId: string) => void
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
	steps,
	onAdd,
	onChange,
	onDelete,
	onReorder
}) => {
	return (
		<Column>
			<OutlineMask>
				<Button 
					aria-label='Change workflow mode'
					variant='subtle'
					leftIconProps={{icon: icons.click, size: 13 }}
					rightIconProps={{icon: icons.arrowDown, size: 7 }}
				>
					Run manually
				</Button>
			</OutlineMask>
			<WorkflowStepList
				items={steps}
				onChange={onChange}
				onDelete={onDelete}
				onReorder={onReorder}
			/>
			<OutlineMask>
				<IconButton
					iconProps={{ icon: icons.plus, size: 10 }}
					aria-label='Add a new step to workflow'
					onClick={onAdd}
				/>
			</OutlineMask>
		</Column>
	)
}

const Column = styled.div`
	position: relative;
	display: flex;
	max-width: 740px;
	margin: 5.25rem auto;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: var(--size-control-height-lg);
	
	/* Vertical divider line that connects workflow steps */
	&::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		background-color: var(--color-bg-button);
		transform: translateX(-50%);
		z-index: -1;
	}
`
