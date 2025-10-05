import React from 'react'

import ArrowDown from '@/icons/arrow-down.svg'
import Arrow from '@/icons/arrow.svg'
import Bolt from '@/icons/bolt.svg'
import Brackets from '@/icons/brackets.svg'
import Click from '@/icons/click.svg'
import Close from '@/icons/close.svg'
import Create from '@/icons/create.svg'
import Delete from '@/icons/delete.svg'
import Drag from '@/icons/drag.svg'
import Plus from '@/icons/plus.svg'
import ReturnIcon from '@/icons/return.svg'

export const icons = {
	arrowDown: ArrowDown,
	arrow: Arrow,
	bolt: Bolt,
	brackets: Brackets,
	click: Click,
	close: Close,
	create: Create,
	delete: Delete,
	drag: Drag,
	plus: Plus,
	return: ReturnIcon,
} as const

export type IconName = keyof typeof icons 
type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
	icon: IconName | SvgComponent // Either a key from the icon map or a direct SVG component
	size?: number | string
	color?: string
}

// Icon component for bundled SVGs.
// Accepts either an icon key or a direct SVG component.
export const Icon: React.FC<IconProps> = ({
	icon,
	size = 16,
	color = 'currentColor',
	...props
}) => {
	const Svg = typeof icon === 'string' ? icons[icon] : (icon as SvgComponent)

	if (!Svg) {
		console.warn(
			`[Icon] Unknown icon: "${icon}". Available: ${Object.keys(icons).join(', ')}`
		)
		return null
	}

	return <Svg width={size} height={size} fill={color} {...props} />
}
