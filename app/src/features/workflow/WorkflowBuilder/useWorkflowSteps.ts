import { nanoid } from 'nanoid'
import { usePersistentState } from '@/hooks/usePersistentState'
import { Step } from './types'

/** Creates a new step with a given id and an empty prompt */
export const createStep = (id: string): Step => ({
	id,
	prompt: ''
})

/**
 * useWorkflowSteps
 * Centralized workflow state with persistence.
 * - Single source of truth for steps, dirty state, and save/reset
 * - Keeps all mutation helpers in one place to simplify consumers
 */
export const useWorkflowSteps = () => {
	// Persist steps in localStorage under a stable key.
	// Start with a deterministic default step so the UI has something to render.
	const {
		value: steps,
		setValue: setSteps,
		isDirty,
		save,
		reset
	} = usePersistentState<Step[]>('workflow_steps', [createStep('1')])

	/** Append a new step with a unique id */
	const addStep = () => {
		setSteps(prev => [...prev, createStep(nanoid())])
	}

	/** Replace a step by id with its updated version */
	const updateStep = (updated: Step) => {
		setSteps(prev => prev.map(s => (s.id === updated.id ? updated : s)))
	}

	/** Remove a step by id */
	const deleteStep = (step: Step) => {
		setSteps(prev => prev.filter(s => s.id !== step.id))
	}

	/**
	 * Reorder two steps by moving `sourceId` to the index of `targetId`
	 * Assumes ids exist; guard against no-ops to avoid re-renders
	 */
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
