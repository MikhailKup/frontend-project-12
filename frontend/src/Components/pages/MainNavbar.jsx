import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import useAuth from '../../hooks/useAuth';

const MainNavbar = ({ hasLogout }) => {
  const { t, i18n } = useTranslation();
  const { logOut } = useAuth();
  const { resolvedLanguage } = i18n;

  const handleLogOut = () => logOut();
  const logOutBtn = (
    <Button
      onClick={handleLogOut}
      className="border-dark border-start-0
        border-top-0 border-3"
    >
      {t('mainPage.logOut')}
    </Button>
  );

  const handleSwitchLng = (lng) => async () => {
    await i18n.changeLanguage(lng);
  };

  const buildLanguageList = () => {
    const lngs = i18n.languages;
    const cn = (curLng) => classNames({
      'visually-hidden': curLng === resolvedLanguage,
    });
    return lngs.map((lng) => (
      <NavDropdown.Item
        key={uniqueId()}
        className={cn(lng)}
        onClick={handleSwitchLng(lng)}
      >
        {t(`languages.${lng}`)}
      </NavDropdown.Item>
    ));
  };

  return (
    <Navbar bg="light" className="border-bottom border-dark border-3" expand="lg">
      <Container>
        <Navbar.Brand
          className="pe-2 me-1 rounded-2 border-bottom border-end border-primary border-3"
          href="/"
        >
          Slack Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="lng" />
        <Navbar.Collapse id="lng" className="d-flex justify-content-end">
          <Nav>
            <NavDropdown
              id="changeLng"
              title={t(`languages.${resolvedLanguage}`)}
              menuVariant="dark"
            >
              {buildLanguageList()}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {hasLogout ? logOutBtn : null}
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
