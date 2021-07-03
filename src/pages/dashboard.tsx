import { GetServerSideProps } from 'next'
import { Flex } from '@chakra-ui/react'
import { parseCookies } from 'nookies'

export default function DasboardPage() {
  return (
    <Flex>
      <p>Dashboard</p>
    </Flex>
  )
}
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { stopalabAdminToken: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
