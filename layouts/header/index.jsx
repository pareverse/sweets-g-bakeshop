import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiFacebook, FiInstagram, FiLogOut, FiMenu, FiMoon, FiShoppingCart, FiSun, FiThumbsUp } from 'react-icons/fi'
import { Google } from 'components/_logos'

const Header = ({ session, isAdmin, isCustomer, onSidebarOpen }) => {
	const router = useRouter()
	const { colorMode, toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={16} fill="currentColor" />, <FiSun size={16} fill="currentColor" />)
	const [isScrolling, setIsScrolling] = useState(false)
	const { data: cart, isFetched: isCartFetched } = useQuery(['cart'], () => api.get('/carts', session.user.id), { enabled: session ? true : false })

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setIsScrolling(window.pageYOffset > 0)
			})
		}
	}, [])

	return (
		<chakra.header bg="hsl(230, 20%, 10%)" position="sticky" top={0} shadow={isScrolling && 'sm'} transition=".4s" zIndex={{ base: 99, lg: 100 }} _dark={{ shadow: isScrolling && 'dark-xl' }}>
			<Flex align="center" gap={6} mx="auto" px={6} h="72px" w="full" maxW={isAdmin ? 1536 : 1280}>
				<Flex flex={{ base: 1, lg: 'none' }} justify="start" align="center">
					<NextLink href="/" passHref>
						<Image display={{ base: 'none', lg: 'block' }} h={10} w={10} alt="logo" src="/favicon.svg" />
					</NextLink>

					<IconButton display={{ base: 'flex', lg: 'none' }} variant="outline" icon={<FiMenu size={20} />} color="white" onClick={onSidebarOpen} />
				</Flex>

				<Flex display={{ base: 'flex', lg: 'none' }} flex={3} justify="center" align="center">
					<Image h={10} w={10} alt="logo" src="/favicon.svg" />
				</Flex>

				<Flex flex={1} justify="end" align="center">
					<Flex display={{ base: 'none', lg: 'flex' }} align="center" gap={8} mr={8}>
						{isAdmin && (
							<>
								<NextLink href="/admin/dashboard" passHref>
									<Link as="span" color={router.pathname === '/admin/dashboard' ? 'brand.default' : 'white'}>
										Dashboard
									</Link>
								</NextLink>

								<NextLink href="/admin/products" passHref>
									<Link as="span" color={router.pathname === '/admin/products' ? 'brand.default' : 'white'}>
										Products
									</Link>
								</NextLink>

								<NextLink href="/admin/orders" passHref>
									<Link as="span" color={router.pathname === '/admin/orders' ? 'brand.default' : 'white'}>
										Orders
									</Link>
								</NextLink>

								<NextLink href="/admin/reviews" passHref>
									<Link as="span" color={router.pathname === '/admin/reviews' ? 'brand.default' : 'white'}>
										Reviews
									</Link>
								</NextLink>

								<NextLink href="/admin/accounts" passHref>
									<Link as="span" color={router.pathname === '/admin/accounts' ? 'brand.default' : 'white'}>
										Accounts
									</Link>
								</NextLink>
							</>
						)}

						{isCustomer && (
							<>
								<NextLink href="/" passHref>
									<Link as="span" color={router.pathname === '/' ? 'brand.default' : 'white'}>
										Home
									</Link>
								</NextLink>

								<NextLink href="/cakes" passHref>
									<Link as="span" color={router.pathname.includes('cakes') ? 'brand.default' : 'white'}>
										Cakes
									</Link>
								</NextLink>

								<NextLink href="/reviews" passHref>
									<Link as="span" color={router.pathname === '/reviews' ? 'brand.default' : 'white'}>
										Reviews
									</Link>
								</NextLink>

								<Link href="/#contact" color={router.pathname === '/contact' ? 'brand.default' : 'white'}>
									Contact Us
								</Link>

								<NextLink href="/cart" passHref>
									<Link as="span" color={router.pathname === '/cart' ? 'brand.default' : 'white'}>
										<Flex gap={3} align="center">
											<Icon as={FiShoppingCart} boxSize={4} />

											<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={6} w={6}>
												<Text fontSize="xs" color="white">
													{isCartFetched ? cart.length : 0}
												</Text>
											</Flex>
										</Flex>
									</Link>
								</NextLink>
							</>
						)}
					</Flex>

					{session ? (
						<Menu>
							<MenuButton>
								<Avatar boxSize={10} name={session.user.name} src={session.user.image} />
							</MenuButton>

							<MenuList w={256}>
								<MenuItem onClick={() => router.push('/profile')}>
									<Flex align="center" gap={3}>
										<Avatar name={session.user.name} src={session.user.image} />

										<Text color="accent-1" noOfLines={1}>
											{session.user.name}
										</Text>
									</Flex>
								</MenuItem>

								<MenuDivider />

								<a target="_blank" rel="noreferrer" href="https://www.facebook.com/SweetsG.Bakeshop">
									<MenuItem icon={<FiFacebook size={16} />}>Facebook</MenuItem>
								</a>

								<a target="_blank" rel="noreferrer" href="https://www.instagram.com/sweetsg_bakeshop">
									<MenuItem icon={<FiInstagram size={16} />}>Instagram</MenuItem>
								</a>

								<MenuItem icon={<FiThumbsUp size={16} />}>Feedback</MenuItem>

								<MenuDivider />

								<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
									Sign out
								</MenuItem>

								<MenuDivider />

								<Text fontSize="xs" textAlign="center">
									Beta 1.0.0 Build {Date.now()}
								</Text>
							</MenuList>
						</Menu>
					) : (
						<>
							<Button display={{ base: 'none', lg: 'flex' }} bg="white" color="accent-1" leftIcon={<Google size={20} />} onClick={() => signIn('google')}>
								Sign in
							</Button>

							<IconButton display={{ base: 'flex', lg: 'none' }} variant="outline" icon={<Google size={20} />} onClick={() => signIn('google')} />
						</>
					)}
				</Flex>
			</Flex>
		</chakra.header>
	)
}

export default Header
