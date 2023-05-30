import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Form, FloatingLabel, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      // eslint-disable-next-line functional/no-expression-statements
      navigate(-1);
      // eslint-disable-next-line functional/no-expression-statements
      setAuthFailed(true);
      // eslint-disable-next-line functional/no-expression-statements
      console.log(values);
    },
  });

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="mb-3">
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center" />
              <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel
                  controlId="username"
                  label="Ваш ник"
                  className="mb-3"
                >
                  <Form.Control name="username" required placeholder="Ваш ник" onChange={formik.handleChange} value={formik.values.username} isInvalid={authFailed} />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-4"
                >
                  <Form.Control type="password" name="password" required placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password} isInvalid={authFailed} />
                </FloatingLabel>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                  Войти
                </Button>
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
    </div>
  );
};

export default LoginPage;
