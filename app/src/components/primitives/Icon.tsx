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
	icon: IconName | SvgComponent
	size?: number | string
}

// Renders an SVG icon from name or component; warns if name is unknown
export const Icon: React.FC<IconProps> = ({
	icon,
	size = 16,
	...props
}) => {
	// Resolve either a named icon from the map or a custom SVG component
	const Svg = typeof icon === 'string' ? icons[icon] : icon as SvgComponent

	if (!Svg) {
		console.warn(`[Icon] Unknown icon: "${icon}"`)
		return null
	}

	return (
		<Svg
			width={size}
			height={size}
			fill="var(--icon-color, currentColor)"
			{...props}
		/>
	)
}
