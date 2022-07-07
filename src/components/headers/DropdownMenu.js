import { Dropdown } from "bootstrap";
import React from "react";
import { Col } from "react-bootstrap";

const DropdownMenu = () => {
  return (
    <Col md={2} sm={2} xs={2}>
      <div className="dropdown">
        <button
          className="btn btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {/* <li>
            <a className="dropdown-item" href="/login">
              Log in
            </a>
          </li> */}
          <li>
            <a className="dropdown-item" href="/upload-book">
              Upload book
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </Col>
  );
};

export default DropdownMenu;
