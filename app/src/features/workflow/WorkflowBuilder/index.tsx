import React from 'react'
import styled from 'styled-components'

import { Button, IconButton, icons } from '@/components/primitives'
import { WorkflowStepList } from './WorkflowStepList'
import { Step } from './types'

import styles from './WorkflowBuilder.module.css'

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
			<Button 
				aria-label='Add a new step'
				leftIconProps={{icon: icons.click, size: 13}}
				rightIconProps={{icon: icons.arrowDown, size: 7}}
				className={styles.outlineMask}
			>
				Run manually
			</Button>
			<WorkflowStepList
				items={steps}
				onChange={onChange}
				onDelete={onDelete}
				onReorder={onReorder}
			/>
			<IconButton
				name={icons.plus}
				aria-label='Add a new step'
				onClick={onAdd}
				className={styles.outlineMask}
				/>
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
	
	/* Center line */
	&::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		background-color: #e0e0e0;
		transform: translateX(-50%);
		z-index: -1;
	}
`
