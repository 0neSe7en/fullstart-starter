export function checkServer(): boolean {
	return typeof window === 'undefined'
}

export function redirectToLogin(Router, ctx) {
	if (checkServer()) {
		if (!ctx.req.originalUrl || !ctx.req.originalUrl.startsWith('/login')) {
			ctx.res.writeHead(302, { Location: '/login' })
		}
	} else {
		if (Router.url !== '/login') {
			Router.push('/login')
		}
	}
}
