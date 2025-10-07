import React from 'react'
import styled from 'styled-components'

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	autoScroll?: boolean
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
	({ children, autoScroll = false, ...props }, ref) => {
		const innerRef = React.useRef<HTMLDivElement>(null)

		React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

        // Auto-scroll to bottom when content changes
		React.useEffect(() => {
			if (autoScroll && innerRef.current) {
				innerRef.current.scrollTo({
					top: innerRef.current.scrollHeight,
					behavior: 'smooth'
				})
			}
		}, [children, autoScroll])

		return (
			<Container ref={innerRef} {...props}>
				{children}
			</Container>
		)
	}
)

ScrollArea.displayName = 'ScrollArea'

const Container = styled.div`
	flex: 1;
	overflow-y: auto;
	scroll-behavior: smooth;
	background-color: transparent;
	padding: 0;
	box-sizing: border-box;

	&::-webkit-scrollbar {
		width: 8px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-text-secondary);
		border-radius: var(--radius-round);
	}
`