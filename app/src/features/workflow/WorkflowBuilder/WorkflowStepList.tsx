import React, { useRef } from 'react'
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

const StyledList = styled.ul`
	width: 100%;
`

export const WorkflowStepList: React.FC<Props> = ({
	items,
	onChange,
	onDelete,
	onReorder
}) => {
	const prev = useRef(items)

	const handleDragOver: DragDropEvents['dragover'] = event => {
		const { source, target } = event.operation
		if (!source || !target || source.id === target.id) return
		onReorder(String(source.id), String(target.id))
	}

	const handleDragEnd: DragDropEvents['dragend'] = event => {
		if (event.canceled) return
		prev.current = items
	}

	return (
		<DragDropProvider 
			// dnd-kit RestrictToVerticalAxis has mismatched types with DragDropProvider.modifiers
			modifiers={[RestrictToVerticalAxis as any]} // eslint-disable-line @typescript-eslint/no-explicit-any
			onDragOver={handleDragOver} 
			onDragEnd={handleDragEnd}
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
