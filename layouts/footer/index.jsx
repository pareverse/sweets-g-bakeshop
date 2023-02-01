import { chakra, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
	return (
		<chakra.footer pt={100}>
			<Flex bg="hsl(230, 20%, 10%)" justify="center" align="center" py={12}>
				<Text fontSize="sm" color="white">
					Copyright © 2023 All right reserved.
				</Text>
			</Flex>
		</chakra.footer>
	)
}

export default Footer
