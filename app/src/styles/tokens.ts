export const sizes = {
	controlHeight: 'var(--size-control-height)',
}

export const spacing = {
	xs: 'var(--spacing)',
	sm: 'calc(var(--spacing) * 2)',
	md: 'calc(var(--spacing) * 4)',
	lg: 'calc(var(--spacing) * 6)',
}

export const radii = {
	sm: 'var(--radius-sm)',
	md: 'var(--radius-md)',
	lg: 'var(--radius-lg)',
	modal: 'var(--radius-modal)',
	round: 'var(--radius-round)',
}

export const typography = {
	fontFamily: 'var(--font-sans)',
	weights: {
		book: 'var(--font-weight-book)',
		regular: 'var(--font-weight-regular)',
		medium: 'var(--font-weight-medium)',
		button: 'var(--font-weight-button)',
	},
	sizes: {
		strong: 'var(--font-size-strong)',
	}
}

export const colors = {
	bgPage: 'var(--color-bg-page)',
	bgCard: 'var(--color-bg-card)',
	bgInput: 'var(--color-bg-input)',
	bgButton: 'var(--color-bg-button)',
	bgButtonHover: 'var(--color-bg-button-hover)',
	
	textPrimary: 'var(--color-text-primary)',
	textSecondary: 'var(--color-text-secondary)',
	textDisabled: 'var(--color-text-disabled)',

	icon: 'var(--color-icon)',
}

export const iconTones = {
	primary: colors.textPrimary,
	muted: colors.textSecondary,
	disabled: colors.textDisabled
} as const

export type IconTone = keyof typeof iconTones
