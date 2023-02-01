import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { AspectRatio, Avatar, chakra, Flex, Icon, Image, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import Card from './_card'

const Ratings = () => {
	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/users'))
	const { data: reviews, isFetched: isReviewsFetched } = useQuery(['reviews'], () => api.all('/reviews'))

	return (
		<chakra.section pt={100} id="blogs">
			<Flex direction="column" gap={12}>
				<Flex align="center" direction="column" textAlign="center">
					<Text fontSize={32} fontWeight="bold" color="accent-1">
						Ratings & Reviews
					</Text>
				</Flex>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
					{isUsersFetched && isReviewsFetched
						? reviews.map((review) => (
								<Card key={review._id}>
									<Flex direction="column" gap={3}>
										<Flex align="center" gap={3}>
											{users
												.filter((user) => user._id === review.user.id)
												.map((user) => (
													<Flex flex={1} align="center" gap={3} key={user._id}>
														<Avatar name={user.name} src={user.image} />

														<Text fontSize="sm" fontWeight="medium" color="accent-1" noOfLines={1}>
															{user.name}
														</Text>
													</Flex>
												))}

											<Flex align="center" gap={1}>
												<Text fontSize="sm" fontWeight="medium" color="accent-1">
													{review.ratings}
												</Text>

												<Icon as={FiStar} boxSize={4} color="brand.default" fill="brand.default" />
											</Flex>
										</Flex>

										<Text fontSize="sm" color="accent-1" noOfLines={3}>
											{review.reviews}
										</Text>

										{review.image && (
											<AspectRatio ratio={1}>
												<Image borderRadius={12} alt={review._id} src={review.image} />
											</AspectRatio>
										)}
									</Flex>
								</Card>
						  ))
						: [...Array(9)].map((data, index) => (
								<AspectRatio ratio={1} key={index}>
									<Skeleton borderRadius={12} />
								</AspectRatio>
						  ))}
				</SimpleGrid>
			</Flex>
		</chakra.section>
	)
}

export default Ratings
