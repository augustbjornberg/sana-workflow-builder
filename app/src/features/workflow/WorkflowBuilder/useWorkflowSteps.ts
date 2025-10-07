import { nanoid } from 'nanoid'
import { usePersistentState } from '@/hooks/usePersistentState'
import { Step } from './types'

// Create a new step with a given id and an empty prompt
export const createStep = (id: string): Step => ({
	id,
	prompt: ''
})

// Workflow state with persistence in localStorage
export const useWorkflowSteps = () => {
	// Persistent list of workflow steps
	const {
		value: steps,
		setValue: setSteps,
		isDirty,
		save,
		reset
	} = usePersistentState<Step[]>('workflow_steps', [createStep('1')])

	// Add a new step with a unique id
	const addStep = () => {
		setSteps(prev => [...prev, createStep(nanoid())])
	}

	// Update a step by id
	const updateStep = (updated: Step) => {
		setSteps(prev => prev.map(s => (s.id === updated.id ? updated : s)))
	}

	// Delete a step by id
	const deleteStep = (step: Step) => {
		setSteps(prev => prev.filter(s => s.id !== step.id))
	}

	// Move a step from sourceId to the index of targetId
	const reorderSteps = (sourceId: string, targetId: string) => {
		setSteps(current => {
			const from = current.findIndex(s => s.id === sourceId)
			const to = current.findIndex(s => s.id === targetId)
			if (from < 0 || to < 0 || from === to) return current

			const next = [...current]
			const [moved] = next.splice(from, 1)
			next.splice(to, 0, moved)
			return next
		})
	}

	return { steps, addStep, updateStep, deleteStep, reorderSteps, isDirty, save, reset }
}
