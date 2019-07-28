import React, { useState } from 'react'
import { Button, FormGroup } from "@blueprintjs/core"
import { InputGroup } from "@blueprintjs/core/lib/cjs"
import CenteralForm from "../src/layouts/CenteralForm"
import styled from 'styled-components'
import { inject } from "mobx-react"
import { IStore } from "../src/models/store"

const Wrap = styled.div`
padding: 40px 20px;
margin-top: 20px;
background-color: #eee;
`

const Login: React.FunctionComponent<{store: IStore}> = ({ store }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, isLoading] = useState(false)
	const [isError, setError] = useState(false)

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		isLoading(true)
		try {
			await store.login(email, password)
		} catch (err) {
			console.error(err)
			setError(true)
		} finally {
			isLoading(false)
		}
	}

	return (
		<CenteralForm title='Login'>
			<Wrap>
				<FormGroup
					label="Email"
					labelFor="email"
				>
					<InputGroup id="email" type="email" onChange={e => setEmail(e.target.value)} />
				</FormGroup>
				<FormGroup
					intent={isError ? 'danger' : 'none'}
					helperText={isError ? 'Wrong Password or Email' : undefined}
					label="Password"
					labelFor="password"
				>
					<InputGroup id="password" type="password" onChange={e => setPassword(e.target.value)}/>
				</FormGroup>
				<Button loading={loading} onClick={handleSubmit}>Login</Button>
			</Wrap>
		</CenteralForm>
	)
}

export default inject('store')(Login)
