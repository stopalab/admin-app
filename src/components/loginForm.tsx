import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
} from '@chakra-ui/react'
import { Formik, Form, Field, FormikProps, FieldProps } from 'formik'
import { Input, InputGroup } from '@chakra-ui/input'
import { useContext, useState } from 'react'
import * as yup from 'yup'
import { errors } from '../helpers/strings'

import { AuthContext } from '../context/authContext'
interface FormInitialValues {
  password: string
  email: string
}

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .required(errors.requiredField('email'))
    .email(errors.login.invalidEmail),

  password: yup.string().required(errors.requiredField('senha')),
})
export function LoginForm() {
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)
  const formikInitialValues: FormInitialValues = {
    password: '',
    email: '',
  }
  async function handleSubmitLogin(values: FormInitialValues) {
    setLoading(true)
    await signIn({
      password: values.password,
      email: values.email,
    })

    setLoading(false)
  }
  return (
    <Flex
      w="100%"
      flexDir="column"
      paddingX="50px"
      alignItems="center"
      justifyContent="center"
    >
      <Formik
        initialValues={formikInitialValues}
        onSubmit={(values, _actions) => {
          handleSubmitLogin(values)
        }}
        validationSchema={yupSchema}
      >
        {(_props: FormikProps<FormInitialValues>) => (
          <Flex as={Form} flexDir="column" w="100%">
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(form.errors.email && form.touched.email)}
                >
                  <InputGroup flexDir="column" mt="24px">
                    <FormLabel size="lg" htmlFor="email">
                      E-mail
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Digite seu e-email"
                      size="lg"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </InputGroup>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(
                    form.errors.password && form.touched.password
                  )}
                >
                  <InputGroup flexDir="column" mt="24px">
                    <FormLabel size="lg" htmlFor="password">
                      Senha
                    </FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Digite sua senha"
                      size="lg"
                      type="password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </InputGroup>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              size="lg"
              mt="24px"
              colorScheme="blue"
              isLoading={loading}
            >
              Entrar
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}
