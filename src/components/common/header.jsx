import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({onEnterSignup}) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm top-most">
      <h3 className="my-0 mr-md-auto font-weight-bold "><Link to='/todo' style={{"color":"black"}}>TODO</Link></h3>
      {/* <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="#">Features</a>
        <a className="p-2 text-dark" href="#">Enterprise</a>
        <a className="p-2 text-dark" href="#">Support</a>
        <a className="p-2 text-dark" href="#">Pricing</a>
      </nav> */}
      <Link to="/signup" className="btn btn-outline-primary absoulte">Sign up</Link>
    </div>
  );
}

export default Header;