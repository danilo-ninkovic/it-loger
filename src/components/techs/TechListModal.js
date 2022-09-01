import React, { useEffect } from "react";
import { connect } from "react-redux"; // za interakciju redux-a i komponente
import { getTechs } from "../../actions/techActions";
import PropTypes from "prop-types";

import TechItem from "./TechItem";

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
  useEffect(() => {
    //prilikom renderovanja će pozvati getTechs fuknciju
    getTechs();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='modal' id='tech-list-modal'>
      <div className='modal-content'>
        <h4>Lista Tehničara</h4>
        <ul className='collection'>
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};
TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // ovde donosimo potrebne state-ove za ovu komponentu i ubacujemo u connect() export
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
