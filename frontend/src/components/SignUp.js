import React, { useRef, useEffect } from 'react';
import {
  Container, Row, Col, Card, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { signUpValidate } from '../schemas/validation';
import { signUp } from '../api/controllers';
import { useAuth } from '../hooks';

const SignUp = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpValidate,
    onSubmit: async (values, actions) => {
      const { username, password } = values;
      try {
        const { data } = await signUp({ username, password });
        auth.signIn(data);
        navigate('/');
      } catch (error) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (error.response?.status === 409) {
          inputRef.current.select();
          actions.setErrors({ registered: 'errors.exists' });
          return;
        }
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div />
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel className="mb-3" controlId="username" label={t('signUp.username')}>
                  <Form.Control
                    name="username"
                    required
                    ref={inputRef}
                    placeholder={t('errors.lengthChannelName')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={(formik.errors.username && formik.touched.username)
                      || formik.errors.registered}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>{t(formik.errors.username)}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label={t('signUp.password')}>
                  <Form.Control
                    name="password"
                    required
                    placeholder={t('errors.lengthPassword')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password)
                      || formik.errors.registered}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel className="mb-4" controlId="confirmPassword" label={t('signUp.confirmPassword')}>
                  <Form.Control
                    name="confirmPassword"
                    required
                    placeholder={t('errors.confirmed')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || formik.errors.registered}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>
                    {t(formik.errors.confirmPassword) || t(formik.errors.registered)}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" className="w-100" variant="outline-primary" disabled={formik.isSubmitting}>{t('signUp.register')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
