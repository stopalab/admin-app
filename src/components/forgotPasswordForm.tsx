import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FormikHelpers,
} from 'formik'
import { Input, InputGroup } from '@chakra-ui/input'
import { useState } from 'react'
import * as yup from 'yup'
import { errors } from '../helpers/strings'
import { api } from '../services/api'
interface FormInitialValues {
  email: string
}

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email(errors.login.invalidEmail)
    .required(errors.requiredField('e-mail')),
})
export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const formikInitialValues: FormInitialValues = {
    email: '',
  }
  async function handleSubmit(
    values: FormInitialValues,
    actions: FormikHelpers<FormInitialValues>
  ) {
    setLoading(true)

    try {
      const response = await api.post('/users/forgot-password', {
        email: values.email,
      })

      console.log(response.data)

      toast({
        description: 'Enviamos um link para recuperação para seu e-mail',
        title: 'Tudo certo!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
      actions.resetForm({
        values: {
          email: '',
        },
      })
    } catch (e) {
      toast({
        description:
          'Ocorreu um erro ao tentar recuperar sua senha verifique o seu endereço de email e tente novamente',
        title: 'Algo deu errado...',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    }

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
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
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
                      placeholder="Digite seu e-mail"
                      size="lg"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
              Enviar
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}
