import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSortable } from '@dnd-kit/react/sortable'

import { Button, Icon, IconButton, icons } from '@/components/primitives'
import { Step } from '../types'
import { tokens } from '@/styles/tokens'

import { OutlineMask } from './OutlineMask'

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
	const inputRef = useRef<HTMLInputElement | null>(null)

	const { ref, isDragging } = useSortable({
		id: step.id,
		index,
		handle: handleRef
	})

	const [isActive, setIsActive] = useState(false)

	const handleMouseEnter = () => setIsActive(true)
	const handleMouseLeave = () => {
		// only deactivate if input isn't focused
		if (document.activeElement !== inputRef.current) {
			setIsActive(false)
		}
	}

	const handleFocus = () => setIsActive(true)
	const handleBlur = () => setIsActive(false)

	useEffect(() => {
		if (index === 0) {
			inputRef.current?.focus()
		}
	}, [index])

	return (
		<Item
			ref={ref}
			$active={isActive || isDragging}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<LeftSlot>
				<SideButton aria-label={`Delete step ${step.id}`} onClick={onDelete}>
					<Icon icon={icons.delete} size={12} />
				</SideButton>
			</LeftSlot>

			<OutlineWrapper>
				<InputWrapper>
					<IndexLabel>{index + 1}</IndexLabel>

					<Input
						ref={inputRef}
						placeholder='What would you like to do?'
						type='text'
						name={`Step ${step.id}`}
						value={step.prompt}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={e => onChange({ ...step, prompt: e.target.value })}
						aria-label={`Prompt for step ${step.id}`}
					/>

					<IconButton
						variant='cta'
						disabled={!step.prompt.length}
						iconProps={{
							icon: icons.return,
							size: 15
						}}
						aria-label='Send message'
						diameter='40px'
					/>
				</InputWrapper>
			</OutlineWrapper>

			<Actions $active={isActive || isDragging}>
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
	background-color: ${tokens.color.bg.input};
	border-radius: ${tokens.radius.round};
	padding: var(--spacing-2);
	padding-left: var(--spacing-4);
	gap: var(--spacing-3);
	position: relative;
	z-index: 1;
	box-shadow: var(--item-shadow);
	transition: box-shadow 0.3s ease;
`

const Item = styled.li<{ $active: boolean }>`
	--controls-opacity: ${({ $active }) => ($active ? 1 : 0)};
	--item-shadow: ${({ $active }) =>
		$active
			? `inset 0 0 4px #ffffff, 0 var(--spacing-2) var(--spacing-3) rgba(0,0,0,0.05)`
			: 'none'};

	--side-w: calc(var(--spacing) * 12);

	display: grid;
	grid-template-columns: var(--side-w) 1fr var(--side-w);
	grid-template-rows: auto auto;
	align-items: center;
	row-gap: var(--spacing-2);

	button {
		opacity: var(--controls-opacity);
	}
`

const LeftSlot = styled.div`
	grid-column: 1;
	grid-row: 1;
	justify-self: center;
	align-self: center;
	display: flex;
`

const RightSlot = styled(LeftSlot)`
	grid-column: 3;
`

const OutlineWrapper = styled(OutlineMask)`
	grid-column: 2;
	grid-row: 1;
	border-radius: ${tokens.radius.round};
`

const Actions = styled.div<{ $active: boolean }>`
	grid-column: 2;
	grid-row: 2;
	display: flex;
	overflow: hidden;
	pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
	max-height: ${({ $active }) => ($active ? 'var(--size-control-height)' : '0')};
	opacity: ${({ $active }) => ($active ? 1 : 0)};
	transition:
		max-height 500ms ease,
		opacity 500ms ease 250ms;
`

const SideButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-2);
	color: ${tokens.color.text.muted};

	&:hover {
		color: ${tokens.color.text.default};
	}
`

const IndexLabel = styled.span`
	font-weight: ${tokens.typography.weight.medium};
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
