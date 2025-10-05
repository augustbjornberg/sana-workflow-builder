import React from 'react'
import styled from 'styled-components'
import { sizes, radii, colors } from '@/styles/tokens'

import { Icon, IconName } from './Icon'
export { icons } from './Icon'

type IconButtonProps = {
	name: IconName
	'aria-label': string
	disabled?: boolean
	// size?: number
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const StyledIconButton = styled.button`
	width: ${sizes.controlHeight};
	height: ${sizes.controlHeight};
	border-radius: ${radii.round};
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background: ${colors.buttonBackground};
	color: inherit;
	border: none;

	&:disabled {
		cursor: not-allowed;
		background-color: #e4e4e4 !important;
		color: #aeaeae;
	}
`

export const IconButton: React.FC<IconButtonProps> = ({
	name,
	disabled = false,
	// size,
	...props
}) => {
	return (
		<StyledIconButton disabled={disabled} aria-disabled={disabled} {...props}>
			<Icon icon={name} size={10} />
		</StyledIconButton>
	)
}
