import React from 'react';
import {
  Container, Row, Col, Card, Form, Button, FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: () => {},
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div />
              <Form className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel className="mb-3" controlId="username" label={t('signUp.username')}>
                  <Form.Control
                    name="username"
                    required
                    placeholder={t('errors.lengthChannelName')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label={t('signUp.password')}>
                  <Form.Control
                    name="password"
                    required
                    placeholder={t('errors.lengthPassword')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip />
                </FloatingLabel>
                <FloatingLabel className="mb-4" controlId="confirmPassword" label={t('signUp.confirmPassword')}>
                  <Form.Control
                    name="confirmPassword"
                    required
                    placeholder={t('errors.confirmed')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <Form.Control.Feedback placement="right" type="invalid" tooltip />
                </FloatingLabel>
                <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
