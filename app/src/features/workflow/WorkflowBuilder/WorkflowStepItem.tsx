import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSortable } from '@dnd-kit/react/sortable'

import { Button, Icon, IconButton, icons } from '@/components/primitives'
import { Step } from './types'
import { colors, radii, typography } from '@/styles/tokens'

import styles from './WorkflowBuilder.module.css'

type Props = {
	step: Step
	index: number
	onChange: (step: Step) => void
	onDelete: () => void
}

export const WorkflowStepItem: React.FC<Props> = ({
	step,
	index,
	onChange,
	onDelete
}) => {
	const handleRef = useRef<HTMLButtonElement | null>(null)
	const { ref, isDragging } = useSortable({
		id: step.id,
		index,
		handle: handleRef
	})

	return (
		<Item ref={ref} data-dragging={isDragging || undefined}>
			<LeftSlot>
				<SideButton aria-label={`Delete step ${step.id}`} onClick={onDelete}>
					<Icon icon={icons.delete} size={12} />
				</SideButton>
			</LeftSlot>

			<OutlineWrapper className={styles.outlineMask}>
				<InputWrapper>
					<IndexLabel>{index + 1}</IndexLabel>

					<Input
						placeholder='What would you like to do?'
						type='text'
						name={`Step ${step.id}`}
						value={step.prompt}
						onChange={e => onChange({ ...step, prompt: e.target.value })}
						aria-label={`Prompt for step ${step.id}`}
					/>

					<IconButton name={icons.return} aria-label='' diameter='40px' iconSize={15} />
				</InputWrapper>
			</OutlineWrapper>

			<Actions>
				<Button aria-label='Select mode' variant='meta' leftIconProps={{ icon: icons.create, size: 12 }}>Create</Button>
				<Button aria-label='Select from apps' variant='meta' leftIconProps={{ icon: icons.plus, size: 10 }}>Sources</Button>
				<Button aria-label='Select input' variant='meta' leftIconProps={{ icon: icons.brackets, size: 12 }}>Input</Button>
			</Actions>

			<RightSlot>
				<SideButton ref={handleRef} aria-label={`Drag handle for step ${step.id}`}>
					<Icon icon={icons.drag} size={10} />
				</SideButton>
			</RightSlot>
		</Item>
	)
}

const InputWrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	height: var(--size-control-height-lg);
	background-color: ${colors.bgInput};
	border-radius: ${radii.round};
	padding: var(--spacing-2);
	padding-left: var(--spacing-4);
	gap: var(--spacing-3);
	position: relative;
	z-index: 1;
`

const Item = styled.li`
	--controls-opacity: 0;
	--item-shadow: none;
	--side-w: calc(var(--spacing) * 12);

	display: grid;
	grid-template-columns: var(--side-w) 1fr var(--side-w);
	grid-template-rows: auto auto;      /* row1=input, row2=actions */
	align-items: center;
	row-gap: var(--spacing-2);

	button {
		opacity: var(--controls-opacity);
		transition: opacity 0.3s ease;
	}

	${InputWrapper} {
		box-shadow: var(--item-shadow);
		transition: box-shadow 0.3s ease;
	}

	&:hover,
	&:has(:focus-visible),
	&[data-dragging='true'] {
		--controls-opacity: 1;
		--item-shadow:
			inset 0 0 4px #ffffff,
			0 var(--spacing-2) var(--spacing-3) rgba(0,0,0,0.05);
	}
`

const LeftSlot = styled.div`
	grid-column: 1;
	grid-row: 1;               /* lock to input row */
	justify-self: center;
	align-self: center;
	display: flex;
`

const RightSlot = styled(LeftSlot)`
	grid-column: 3;
`

const OutlineWrapper = styled.div`
	grid-column: 2;
	grid-row: 1;
	border-radius: ${radii.round};
`

const Actions = styled.div`
	grid-column: 2;
	grid-row: 2;

	display: flex;
	// gap: var(--spacing);

	overflow: hidden;
	max-height: 0;
	opacity: 0;
	pointer-events: none;
	transition:
		max-height 500ms ease,
		opacity 500ms ease 250ms;

	${Item}:hover & {
		max-height: var(--size-control-height);
		opacity: 1;
		pointer-events: auto;
	}
`

const SideButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-2);
`

const IndexLabel = styled.span`
	font-weight: ${typography.weights.medium};
	min-width: var(--spacing-6);
	text-align: center;
`

const Input = styled.input`
	flex: 1;
	border: none;
	outline: none;
	font-size: 1rem;
	background: transparent;
`