import React from 'react'
import styled from 'styled-components'
import { sizes, radii, spacing, typography, colors } from '@/styles/tokens'

import { Icon, IconName } from './Icon'

type ButtonProps = {
	'aria-label': string
	icon?: IconName
	disabled?: boolean
	// iconSize?: number | string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button`
	height: ${sizes.controlHeight};
	padding: 0 ${spacing.md};
	border-radius: ${radii.round};
	font-weight: ${typography.weights.medium};
	background: ${colors.bgButton};
	color: #000000;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${spacing.sm};
	border: none;

	&:disabled {
		color: #aeaeae;
		cursor: not-allowed;
		background-color: #e4e4e4;
	}
`

export const Button: React.FC<ButtonProps> = ({
	children,
	icon,
	disabled = false,
	...props
}) => {
	return (
		<StyledButton disabled={disabled} aria-disabled={disabled} {...props}>
			{children}
			{icon && <Icon icon={icon} size={10} /> }
		</StyledButton>
	)
}
