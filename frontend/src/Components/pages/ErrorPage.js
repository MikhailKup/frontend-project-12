import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import MainNavbar from './MainNavbar';

const ErrorPage = () => {
  const { t } = useTranslation();
  const { pagesPaths } = routes;

  return (
    <div>
      <MainNavbar />
      <Container fluid="sm" className="d-flex justify-content-center mt-5">
        <Card className="w-75 text-center">
          <Card.Header className="p-3">
            <h6>{t('errorPage.failure')}</h6>
          </Card.Header>
          <Card.Body className="p-5">
            <h2>{t('errorPage.pageNotFound')}</h2>
          </Card.Body>
          <Card.Footer className="p-3">
            <Link to={pagesPaths.mainPage()}>
              {t('errorPage.toTheMainPage')}
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default ErrorPage;
