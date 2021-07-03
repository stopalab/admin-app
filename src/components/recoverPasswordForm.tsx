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

interface ResetPasswordFormProps {
  token: string
}
interface FormInitialValues {
  password: string;
}

const yupSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 cartacteres")
    .required(errors.requiredField('senha')),
});
export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const formikInitialValues: FormInitialValues = {
    password: '',
  };
  async function handleSubmit(values: FormInitialValues, actions: FormikHelpers<FormInitialValues>) {
    console.log(token)
    setLoading(true);

    try {
      const response = await api.post('/users/recover-password', {
        token,
        newPassword: values.password,
      });

      console.log(response.data);

      toast({
        description: 'Senha resetada com sucesso.',
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
          'Ocorreu um erro ao tentar redefinir sua senha verifique e tente novamente',
        title: 'Algo deu errado...',
        status: 'error',
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
      paddingX="50px"
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
                  isInvalid={Boolean(form.errors.email && form.touched.email)}
                >
                  <InputGroup flexDir="column" mt="24px">
                    <FormLabel size="lg" htmlFor="email">
                      Nova senha
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
