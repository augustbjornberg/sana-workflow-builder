import React from 'react'
import styled, { css } from 'styled-components'

import { tokens } from '@/styles/tokens'

import { Icon, IconProps } from './Icon'

export type ButtonVariant = 'cta' | 'default' | 'subtle' | 'meta'

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
		{leftIconProps?.icon && (
			<Icon
				{...leftIconProps as IconProps}
				size={leftIconProps.size ?? 14}
			/>
		)}
		<span>{children}</span>
		{rightIconProps?.icon && (
			<Icon
				{...rightIconProps as IconProps}
				size={rightIconProps.size ?? 14}
			/>
		)}
	</StyledButton>
)

export const baseButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: ${tokens.radius.round};
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	transition:
		background-color var(--transition-base),
		color var(--transition-base),
		opacity var(--transition-base);

	&:disabled {
		color: ${tokens.color.text.disabled};
		--icon-color: ${tokens.color.text.disabled};
		cursor: not-allowed;
	}
`

export const variantStyles = {
	cta: css`
		background-color: ${tokens.color.text.default};
		color: ${tokens.color.bg.input};

		&:disabled {
			background-color: transparent;
			color: ${tokens.color.text.muted};
		}
	`,
	default: css`
		background-color: ${tokens.color.bg.control.default};

		&:hover:not(:disabled) {
			background-color: ${tokens.color.bg.control.hover};
		}
	`,
	meta: css`
		background-color: transparent;
		color: ${tokens.color.text.default};
		--icon-color: ${tokens.color.text.muted};

		&:hover:not(:disabled) {
			background-color: ${tokens.color.bg.input};
		}
	`,
	subtle: css`
		--icon-color: ${tokens.color.text.muted};

		&:hover:not(:disabled) {
			background-color: ${tokens.color.bg.control.hover};
		}

		background-color: ${tokens.color.bg.control.default};
	`
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
	${baseButton};
	font-weight: ${tokens.typography.weight.medium};
	font-size: 0.9rem;
	height: ${tokens.size.control.default};
	padding: 0 ${tokens.spacing.md};
	gap: ${tokens.spacing.sm};
	border-radius: ${tokens.radius.round};

	${({ $variant }) => variantStyles[$variant]};
`
