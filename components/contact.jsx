import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import { useToast } from '@chakra-ui/react'
import { AspectRatio, Button, chakra, Flex, FormControl, FormErrorMessage, Grid, GridItem, Input, Text, Textarea } from '@chakra-ui/react'
import Toast from './_toast'

const Contact = () => {
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm()

	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const addMutation = useMutation((data) => api.create('/contact', data), {
		onSuccess: () => {
			setIsLoading(false)
			reset()

			toast({
				position: 'top',
				duration: 1000,
				render: () => <Toast title="Success" description="Message sent successfully." />
			})
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		addMutation.mutate(data)
	}

	return (
		<chakra.section pt={100} id="contact">
			<AspectRatio ratio={16 / 9}>
				<chakra.iframe borderRadius={12} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234.54256935549026!2d120.97407849516358!3d14.464581377909093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cd14278b9d91%3A0x6a0edafb18a3edc!2sSweets%20G!5e1!3m2!1sen!2sph!4v1674841180822!5m2!1sen!2sph" />
			</AspectRatio>

			<Flex>
				{/* <Flex flex={1}>
					<Flex flex={1} direction="column" gap={6}>
						<Flex direction="column">
							<Text fontSize={32} fontWeight="bold" color="accent-1">
								Get In Touch
							</Text>

							<Text color="accent-1">We are here for you! How can we help?</Text>
						</Flex>

						<chakra.form h="full" onSubmit={handleSubmit(onSubmit)}>
							<Grid templateRows="auto auto 1fr auto" gap={6} h="full">
								<GridItem>
									<FormControl isInvalid={errors.name}>
										<Input placeholder="Enter your full name" size="lg" {...register('name', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</GridItem>

								<GridItem>
									<FormControl isInvalid={errors.email}>
										<Input type="email" placeholder="Enter your email address" size="lg" {...register('email', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</GridItem>

								<GridItem>
									<FormControl h="full" isInvalid={errors.message}>
										<Textarea placeholder="Enter your message" size="lg" h="full" {...register('message', { required: true })} />
										<FormErrorMessage>This field is required.</FormErrorMessage>
									</FormControl>
								</GridItem>

								<GridItem>
									<Button type="submit" size="lg" colorScheme="brand" w="full">
										Send Message
									</Button>
								</GridItem>
							</Grid>
						</chakra.form>
					</Flex>
				</Flex> */}
			</Flex>
		</chakra.section>
	)
}

export default Contact
