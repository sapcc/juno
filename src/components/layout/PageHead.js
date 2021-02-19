import tw from 'twin.macro'

import Button from "../shared/Button"

const Head = tw.div`
  bg-black
  bg-opacity-50
`

const Container = tw.div`
  container
  mx-auto
  flex
  justify-between
  py-6
`

const PageHead = () => {

  return (
    <Head>
      <Container>
        <div>Head</div>
        <Button>
          Login
        </Button>
      </Container>
    </Head>
  )
}

export default PageHead