import React from 'react';
import DashboardButton from '../../components/button/DashboardButton';
import * as yup from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import TextInput from '../../components/forms/TextInput';
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/dist/server/api-utils';

const formSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Must be at least 3 characters')
    .required('Username is required')
    .matches(/^[a-zA-Z0-9@]+$/, 'Cannot contain special characters or spaces'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
    .matches(/^\S*$/, 'Cannot contain spaces'),
});

const Index = () => {

  const session = useSession();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const authResponse = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
      });
      console.log(authResponse);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center text-7xl font-heading my-4">
          <h1>
            expens<span className="text-primary">io</span>
          </h1>
        </div>
        <FormikProvider value={formik}>
          <Form className="bg-white shadow-lg rounded-lg px-12 pt-6 pb-8 mb-4">
            <h1 className="font-heading text-gray-800 text-3xl flex justify-center py-2 mb-4">
              Sign in {session.data?.user.name}
            </h1>
            <TextInput
              name="username"
              label="Username or e-mail"
              type="text"
              placeholder="bob99"
              autoComplete="username"
              error={formik.errors.username}
            />
            <div className="mb-6">
              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="a_verys3cur3p@ssw0rd"
                autoComplete="current-password"
                error={formik.errors.password}
              />
            </div>
            <div className="flex items-center justify-between">
              <DashboardButton primary type="submit" label="Sign in" />
              <a
                className="inline-block align-baseline font-normal text-sm text-primary hover:text-primary-darker"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Index;
