import React from 'react'
import Header from "../components/Header"
import { Box, Flex } from "@rebass/grid"

export default function CenteralForm({children, title}) {
	return (
		<>
			<Header title={title} />
			<Flex alignItems='center' justifyContent='center'>
				<Box width={400}>
					{children}
				</Box>
			</Flex>
		</>
	)
}
