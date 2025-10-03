import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement> & {
	size?: number | string
	color?: string
	as: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export function Icon({ as: Svg, size = 16, color = '#000000', ...props }: IconProps) {
	return <Svg width={size} height={size} fill={color} {...props} />
}
