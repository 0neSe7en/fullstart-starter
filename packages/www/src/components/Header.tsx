import * as React from "react"
import Head from 'next/head'

export default ({title = 'My App'}) => (
	<Head>
		<title>{title}</title>
		<meta charSet='utf-8'/>
		<meta name='viewport' content='minimum-scale=1.0, initial-scale=1.0, width=device-width'/>
		<link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
		{/*<link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />*/}
		<link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />
	</Head>
)
