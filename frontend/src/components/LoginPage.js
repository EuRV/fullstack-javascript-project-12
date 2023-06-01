/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Form, FloatingLabel, Row, Col, Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/index';
import routes from '../routes';

const validationSchema = Yup.object({
  username: Yup.string().required().min(4),
  password: Yup.string().required().min(4),
});

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
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
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel
                      controlId="username"
                      label="Ваш ник"
                    >
                      <Form.Control
                        name="username"
                        required
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel
                      controlId="password"
                      label="Пароль"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={authFailed}
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                    Войти
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
