module.exports = {
	async headers() {
		return [
			{
				// set the Access-Control-Allow-Origin header to your domain name
				source: '/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://sweets-g-bakeshop.vercel.app'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Origin, X-Requested-With, Content-Type, Accept'
					},
					{
						key: 'Content-Security-Policy',
						value: 'frame-ancestors https://www.facebook.com'
					}
				]
			}
		]
	}
}
