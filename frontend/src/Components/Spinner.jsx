import Spinner from 'react-bootstrap/Spinner';

const MainSpinner = () => (
  <div className="d-flex mt-5 justify-content-center">
    <Spinner animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default MainSpinner;
