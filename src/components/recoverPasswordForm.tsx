import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikProps, FieldProps, FormikHelpers } from 'formik';
import { Input, InputGroup } from '@chakra-ui/input';
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { errors } from '../helpers/strings';
import { api } from '../services/api';
interface FormInitialValues {
  password: string;
}

interface RecoverPasswordFormProps {
  token: string
}

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email(errors.login.invalidEmail)
    .required(errors.requiredField('e-mail')),
});
export function RecoverPasswordForm( { token }: RecoverPasswordFormProps) {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const formikInitialValues: FormInitialValues = {
    password: '',
  };

  async function handleSubmit(values: FormInitialValues, actions: FormikHelpers<FormInitialValues>) {
    console.log('oi')
   setLoading(true);

    try {
      const response = await api.post('/users/recover-password', {
        newPassword: values.password,
        token
      });

      console.log(response.data);

      toast({
        description: 'Senha recuperada com sucesso',
        title: 'Tudo certo!',
        status: 'success',
        position: "top-right",
        isClosable: true
      });
      actions.resetForm({
        values: {
          password: ""
        }
      })
      
    } catch (e) {
      toast({
        description:
          'Ocorreu um erro ao tentar recuperar sua senha verifique o seu endereço de email e tente novamente',
        title: 'Algo deu errado...',
        status: 'success',
        position: "top-right",
        isClosable: true
      });
    }

    setLoading(false);
  }
  return (
    <Flex
      w="100%"
      flexDir="column"
      padding="50px"
      alignItems="center"
      justifyContent="center"
    >
      <Formik
        initialValues={formikInitialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        validationSchema={yupSchema}
      >
        {(props: FormikProps<FormInitialValues>) => (
          <Flex as={Form} flexDir="column" w="100%">
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={Boolean(form.errors.password && form.touched.password)}
                >
                  <InputGroup flexDir="column" mt="24px">
                    <FormLabel size="lg" htmlFor="password">
                      Nova Senha
                    </FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Digite sua nova senha"
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
              Enviar
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
