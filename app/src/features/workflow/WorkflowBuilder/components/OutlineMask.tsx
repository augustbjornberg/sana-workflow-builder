import styled from 'styled-components'
import { tokens } from '@/styles/tokens'

// Outline style that is used to obscure parts of the center line in WorkflowBuilder/index.tsx
export const OutlineMask = styled.div`
	outline: ${tokens.spacing[2]} solid ${tokens.color.bg.card};
`