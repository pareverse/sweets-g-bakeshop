module.exports = {
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://sweets-g-bakeshop.vercel.app'
					}
				]
			}
		]
	}
}
