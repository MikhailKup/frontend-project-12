import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../services/usersApi';
import useAuth from '../../hooks/useAuth';
import MainNavbar from './MainNavbar';

const SignUp = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [signingUp] = signup();

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('validationFeedback.required'))
      .min(3, t('validationFeedback.invalidLength'))
      .max(20, t('validationFeedback.invalidLength')),
    password: Yup.string()
      .required(t('validationFeedback.required'))
      .min(6, t('validationFeedback.invalidPassword')),
    passwordConfirmation: Yup.string()
      .required(t('validationFeedback.required'))
      .oneOf([Yup.ref('password')], t('validationFeedback.mustMatch')),
  });

  const formikObj = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: ({ username, password }) => {
      signingUp({ username, password })
        .unwrap()
        .then((data) => {
          const { token } = data;
          logIn(username, token);
          navigate('/');
        })
        .catch((e) => {
          if (e.status === 409) {
            formikObj.setFieldError('username', t('validationFeedback.userExists'));
          }
        });
    },
    validationSchema: signupSchema,
  });

  const { errors, touched } = formikObj;

  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar />
      <Container fluid="sm" className="justify-content-center d-flex py-5">
        <Card
          bg="light"
          style={{ width: '30rem' }}
        >
          <Card.Header as="h3" className="text-center py-3">
            {t('signUpPage.signingUp')}
          </Card.Header>
          <Card.Body className="m-3">
            <Form onSubmit={formikObj.handleSubmit} className="d-flex flex-column justify-content-center mt-2">
              <Form.Group className="mb-4">
                <FloatingLabel
                  controlId="username"
                  label={t('signUpPage.username')}
                >
                  <Form.Control
                    name="username"
                    placeholder={t('signUpPage.username')}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.username}
                    isInvalid={errors.username && touched.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-4">
                <FloatingLabel
                  controlId="password"
                  label={t('signUpPage.password')}
                >
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder={t('signUpPage.password')}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.password}
                    isInvalid={errors.password && touched.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-4">
                <FloatingLabel
                  controlId="passwordConfirmation"
                  label={t('signUpPage.confirmPassword')}
                >
                  <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    placeholder={t('signUpPage.confirmPassword')}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.passwordConfirmation}
                    isInvalid={errors.passwordConfirmation && touched.passwordConfirmation}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button variant="outline-dark" type="submit">
                {t('signUpPage.toSignUp')}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center p-3" />
        </Card>
      </Container>
    </div>
  );
};
export default SignUp;
