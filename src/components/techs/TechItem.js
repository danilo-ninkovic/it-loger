import React from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/techActions";
import PropTypes from "prop-types";

const TechItem = ({ tech, deleteTech }) => {
  //tech je prop iz parent komponente "TechListModal" a deleteTech je iz global state-a
  const onDelete = () => {
    deleteTech(tech.id);

    M.toast({
      html: `Tehničar ${tech.firstName} ${tech.lastName} je obrisan`,
    });
  };
  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
