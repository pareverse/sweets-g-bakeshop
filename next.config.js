module.exports = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://sweets-g-bakeshop.vercel.app/:path*'
			}
		]
	}
}
