import React from 'react'
import { DragDropProvider, DragDropEvents } from '@dnd-kit/react'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import styled from 'styled-components'

import { WorkflowStepItem } from './WorkflowStepItem'
import { Step } from './types'

type Props = {
	items: Step[]
	onChange: (step: Step) => void
	onDelete: (step: Step) => void
	onReorder: (sourceId: string, targetId: string) => void
}

export const WorkflowStepList: React.FC<Props> = ({
	items,
	onChange,
	onDelete,
	onReorder
}) => {
	// Reorder steps while dragging, triggered when a dragged item moves over another
	// Skips when there's no valid source/target or when dragging over itself
	const handleDragOver: DragDropEvents['dragover'] = event => {
		const { source, target } = event.operation
		if (!source || !target || source.id === target.id) return
		onReorder(String(source.id), String(target.id))
	}

	return (
		<DragDropProvider 
			// dnd-kit RestrictToVerticalAxis has mismatched types with DragDropProvider modifiers
			modifiers={[RestrictToVerticalAxis as any]} // eslint-disable-line @typescript-eslint/no-explicit-any
			onDragOver={handleDragOver} 
		>
			<StyledList>
				{items.map((step, i) => (
					<WorkflowStepItem
						key={step.id}
						step={step}
						index={i}
						onChange={onChange}
						onDelete={() => onDelete(step)}
					/>
				))}
			</StyledList>
		</DragDropProvider>
	)
}

const StyledList = styled.ul`
	display: flex;
	align-self: stretch;
	flex-direction: column;
	gap: var(--size-control-height-lg);
`