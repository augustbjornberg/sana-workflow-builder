import React from 'react'
import styled from 'styled-components'
import { sizes } from '@/styles/tokens'
import { Icon, IconName } from './Icon'
import { baseButton, ButtonVariant, variantStyles } from './Button'

export { icons } from './Icon'

type IconButtonProps = {
	name: IconName
	'aria-label': string
	disabled?: boolean
	diameter?: string
	iconSize?: number
	variant?: ButtonVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: React.FC<IconButtonProps> = ({
	name,
	disabled = false,
	diameter = sizes.controlHeight,
	iconSize = 10,
	variant = 'default',
	...props
}) => {
	return (
		<StyledIconButton
			disabled={disabled}
			aria-disabled={disabled}
			$diameter={diameter}
			$variant={variant}
			{...props}
		>
			<Icon icon={name} size={iconSize} />
		</StyledIconButton>
	)
}

const StyledIconButton = styled.button<{
	$diameter: string
	$variant: ButtonVariant
}>`
	${baseButton};
	width: ${({ $diameter }) => $diameter};
	height: ${({ $diameter }) => $diameter};
	padding: 0;
	border-radius: 50%;

	${({ $variant }) => variantStyles[$variant]};
`
