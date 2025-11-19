function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#015D82' }}
      className="text-white py-4 px-4 mt-auto"
    >
      <div className="row">
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold">IClinic</h5>
          <p className="small text-light">
            Experienced surgeon dedicated to safe procedures and compassionate
            patient care.
          </p>
          <div className="d-flex gap-3 fs-4">
            <a href="mailto:Iclinic@gmail.com" className="text-white">
              <i className="bi bi-envelope-fill"></i>
            </a>
            <a href="https://facebook.com" className="text-white">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" className="text-white">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <h5 className="fw-bold">Services page</h5>
          <ul className="list-unstyled small">
            <li>About us</li>
            <li>Contact us</li>
            <li>C.T.A</li>
            <li>Appointment</li>
          </ul>
        </div>

        <div className="col-md-3 mb-4">
          <h5 className="fw-bold">Resources</h5>
          <ul className="list-unstyled small">
            <li>Blog</li>
            <li>Privacy</li>
            <li>Team</li>
          </ul>
        </div>

        <div className="col-md-3 mb-4">
          <h5 className="fw-bold">Contact</h5>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i>+ (20) 125-765-1098
            </li>
            <li className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              Iclinic@gmail.com
            </li>
            <li>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Cairo, Egypt
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
