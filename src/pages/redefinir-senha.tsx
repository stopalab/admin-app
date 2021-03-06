import { Flex, Grid, Image, Link, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { ResetPasswordForm } from '../components/recoverPasswordForm'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function RecoverPasswordPage() {
  const { query } = useRouter()

  const { t: token } = query
  return (
    <Fragment>
      <Head>
        <title>StopaLab Admin - Redefinir Senha</title>
      </Head>
      <Grid
        as="main"
        height="100vh"
        width="100%"
        templateColumns="1fr 1fr 1fr "
        templateRows="1fr"
        templateAreas="
        'image image form'
      "
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          gridArea="form"
          h="100vh"
          alignItems="center"
          justifyContent="center"
          minW="360px"
          flexDir="column"
        >
          <Image src="images/stopalab.svg" w="200px" />
          <Flex mt="36px">
            <Text fontWeight="bold" fontSize="x-large">
              Redefinir senha
            </Text>
          </Flex>
          <ResetPasswordForm token={token ? token.toString() : ''} />
          <Flex>
            <Link
              as={NextLink}
              href="/login"
              textDecor="none"
              color="blue.500"
              fontWeight="bold"
              mt="24px"
            >
              <Text
                color="blue.500"
                fontWeight="bold"
                mt="24px"
                cursor="pointer"
              >
                Fazer login
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex
          h="100vh"
          gridArea="image"
          backgroundImage="url('images/loginBackground.png')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        ></Flex>
      </Grid>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { stopalabAdminToken: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
