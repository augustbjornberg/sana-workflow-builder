export const tokens = {
	color: {
		bg: {
			page: 'var(--color-bg-page)', 
			card: 'var(--color-bg-card)', 
			input: 'var(--color-bg-input)', 
			control: {
				default: 'var(--color-bg-button)', 
				hover: 'var(--color-bg-button-hover)', 
			},
		},
		text: {
			primary: 'var(--color-text-primary)', 
			secondary: 'var(--color-text-secondary)', 
			disabled: 'var(--color-text-disabled)', 
		},
		icon: {
			default: 'var(--color-icon)', 
		},
	},
	iconTone: {
		primary: 'var(--color-text-primary)',
		muted: 'var(--color-text-secondary)', 
		disabled: 'var(--color-text-disabled)', 
	},
	spacing: {
		'1': 'var(--spacing)',   
		'2': 'var(--spacing-2)', 
		'3': 'var(--spacing-3)', 
		'4': 'var(--spacing-4)', 
		'6': 'var(--spacing-6)', 
		xs: 'var(--spacing)',
		sm: 'var(--spacing-2)',
		md: 'var(--spacing-3)',
		lg: 'var(--spacing-4)',
		xl: 'var(--spacing-6)',
	},
	radius: {    
		modal: 'var(--radius-modal)',
		round: 'var(--radius-round)', 
	},
	size: {
		control: {
			default: 'var(--size-control-height)', 
			lg: 'var(--size-control-height-lg)', 
		},
	},
	typography: {
		font: {
			sans: 'var(--font-sans)', 
		},
		weight: {
			book: 'var(--font-weight-book)',       // 300
			regular: 'var(--font-weight-regular)', // 400
			medium: 'var(--font-weight-medium)',   // 500
			button: 'var(--font-weight-button)',   // 500
		},
		size: {
			strong: 'var(--font-size-strong)', 
		},
	},
	transition: {
		base: 'var(--transition-base)', 
	},
} as const

export type ColorCategory = keyof typeof tokens.color
export type SpacingKey = keyof typeof tokens.spacing
export type RadiusKey = keyof typeof tokens.radius
export type SizeCategory = keyof typeof tokens.size
export type FontWeightKey = keyof typeof tokens.typography.weight
export type IconTone = keyof typeof tokens.iconTone
