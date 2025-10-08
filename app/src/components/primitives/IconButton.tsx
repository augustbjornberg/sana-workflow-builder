import React from 'react'
import styled from 'styled-components'
import { tokens } from '@/styles/tokens'
import { Icon, IconProps } from './Icon'
import { baseButton, ButtonVariant, variantStyles } from './Button'

export { icons } from './Icon'

type IconButtonProps = {
	iconProps: IconProps
	'aria-label': string
	diameter?: string
	variant?: ButtonVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: React.FC<IconButtonProps> = ({
	iconProps,
	disabled = false,
	diameter = tokens.size.control.default,
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
			<Icon
				{...iconProps}
				size={iconProps.size ?? 12}
			/>
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
	color: ${tokens.color.text.default};

	${({ $variant }) => variantStyles[$variant]};

	&:disabled {
		color: ${tokens.color.text.disabled};
		--icon-color: ${tokens.color.text.disabled};
		cursor: not-allowed;
	}
`
