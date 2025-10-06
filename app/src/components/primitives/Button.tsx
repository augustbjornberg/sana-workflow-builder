import React from 'react'
import styled, { css } from 'styled-components'
import { sizes, radii, spacing, typography, colors } from '@/styles/tokens'

import { Icon, IconProps } from './Icon'

export type ButtonVariant = 'default' | 'meta'

type ButtonProps = {
	'aria-label': string
	variant?: ButtonVariant
	disabled?: boolean
	leftIconProps?: Partial<IconProps>
	rightIconProps?: Partial<IconProps>
	children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'default',
	disabled = false,
	leftIconProps,
	rightIconProps,
	...props
}) => (
	<StyledButton
		$variant={variant}
		disabled={disabled}
		aria-disabled={disabled}
		{...props}
	>
		{leftIconProps?.icon && <Icon {...leftIconProps as IconProps} />}
		<span>{children}</span>
		{rightIconProps?.icon && <Icon {...rightIconProps as IconProps} />}
	</StyledButton>
)

export const baseButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: ${radii.round};
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	transition:
		background-color var(--transition-base),
		color var(--transition-base),
		opacity var(--transition-base);

	&:disabled {
		color: ${colors.textDisabled};
		cursor: not-allowed;
		opacity: 0.8;
	}
`

export const variantStyles = {
	default: css`
		background-color: ${colors.bgButton};
		color: ${colors.textPrimary};

		&:hover:not(:disabled) {
			background-color: ${colors.bgButtonHover};
		}
	`,
	meta: css`
		background-color: transparent;
		color: ${colors.textPrimary};

		&:hover:not(:disabled) {
			background-color: ${colors.bgInput};
		}
	`
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
	${baseButton};
	font-weight: ${typography.weights.medium};
	font-size: 0.9rem;
	height: ${sizes.controlHeight};
	padding: 0 ${spacing.md};
	gap: ${spacing.sm};
	border-radius: ${radii.round};

	${({ $variant }) => variantStyles[$variant]};
`