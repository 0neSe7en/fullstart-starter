import { useRouter } from 'next/router'
import Header from '../../../src/layouts/header'
import * as React from "react"

const Comment = () => {
  const router = useRouter()
  const { id, comment } = router.query

  return (
    <>
      <Header />
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
    </>
  )
}

export default Comment
