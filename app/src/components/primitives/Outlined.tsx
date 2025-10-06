import styled from 'styled-components'

export const Outlined = styled.div`
	position: relative;
	border-radius: inherit; 

	&::before {
		content: '';
		position: absolute;
		top: -var(--spacing-2);
		right: -var(--spacing-2);
		bottom: -var(--spacing-2);
		left: -var(--spacing-2);
		border-radius: inherit;
		// border: var(--spacing-2) solid var(--color-bg-card);
		border: var(--spacing-2) solid red;
		pointer-events: none;
		z-index: 0;
	}
`