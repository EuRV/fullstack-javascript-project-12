/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Form, FloatingLabel, Row, Col, Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index';
import routes from '../routes';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.signIn();
        navigate('/');
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="mb-3">
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center" />
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('logIn.title')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <FloatingLabel
                    className="mb-3"
                    controlId="username"
                    label={t('logIn.username')}
                  >
                    <Form.Control
                      name="username"
                      required
                      placeholder={t('logIn.username')}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-4"
                    controlId="password"
                    label={t('logIn.password')}
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      placeholder={t('logIn.password')}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('errors.invalidLoginPassword')}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                    {t('logIn.loginButton')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('logIn.footerHeading')}</span>
                <a href="/signup">{t('logIn.signUpLink')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
