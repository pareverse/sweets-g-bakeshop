import { useRouter } from 'next/router'
import { AspectRatio, Button, chakra, Flex, Image, Text } from '@chakra-ui/react'

const Hero = () => {
	const router = useRouter()

	return (
		<AspectRatio ratio={{ base: 16 / 9, lg: 16 / 6 }}>
			<Flex bg="hsl(230, 20%, 10%)" bgImage="url('/assets/canvas.svg')" bgPos="center" bgRepeat="no-repeat" bgSize="cover" gap={12}></Flex>
		</AspectRatio>
	)
}

export default Hero
