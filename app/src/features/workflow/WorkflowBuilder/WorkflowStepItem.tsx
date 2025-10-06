import React, { useRef } from 'react'
import styled from 'styled-components'

import { useSortable } from '@dnd-kit/react/sortable'

import { Icon, icons } from '@/components/primitives'
import { Step } from './types'
import { radii } from '@/styles/tokens'

import styles from './WorkflowBuilder.module.css'

type Props = {
	step: Step
	index: number
	onChange: (step: Step) => void
	onDelete: () => void
}

const Item = styled.li`
	display: flex;
	padding: 2rem 0;
	// alignItems: center;
	// gap: 8;
`

const Input = styled.input`
	flex: 1;
	height: 56px;
	padding: 0 1.5rem;
	border-radius: ${radii.round};
	border: none;
`

const SideSlot = styled.div<{ position: 'left' | 'right' }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(var(--spacing) * 12);
	flex-shrink: 0;
	position: relative;

	${({ position }) =>
		position === 'left'
			? `
		& ${SideButton} svg {
			margin-left: auto;
		}
	`
			: `
		& ${SideButton} svg {
			margin-right: auto;
		}
	`}
`

const SideButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-2);
`

export const WorkflowStepItem: React.FC<Props> = ({
	step,
	index,
	onChange,
	onDelete
}) => {
	const handleRef = useRef<HTMLButtonElement | null>(null)
	const { ref } = useSortable({ id: step.id, index, handle: handleRef })

	return (
		<Item ref={ref}>
			<SideSlot position="left">
				<SideButton aria-label={`Delete step ${step.id}`} onClick={onDelete}>
					<Icon icon={icons.delete} size={12} />
				</SideButton>
			</SideSlot>

			<Input
				type='text'
				name={`Step ${step.id}`}
				value={step.prompt}
				onChange={event => onChange({ ...step, prompt: event.target.value })}
				aria-label={`Prompt for step ${step.id}`}
				className={styles.outlineMask}
			/>

			<SideSlot position="right">
				<SideButton ref={handleRef} aria-label={`Drag handle for step ${step.id}`} >
					<Icon icon={icons.drag} size={10} />
				</SideButton>
			</SideSlot>
		</Item>
	)
}
