import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteLog, setCurrent } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js"; //JS iz Materialize paketa za modals i sl.

import PropTypes from "prop-types";

// uzima pojedinačni log iz Logs.js i deleteLog funkciju iz logActions
const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id); //šalje id u logActions

    M.toast({ html: "Log je obrisan" }); // pop-up porukica
  };
  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal' // ovde povezujemo sa "edit-log -modal"
          className={`modal-trigger ${
            log.attention ? "red-text" : "blue-text"
          }`}
          onClick={() => setCurrent(log)} // pozvali smo direktno setCurrent i ubacili cijeli log u nju
        >
          {" "}
          {log.message}{" "}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID # {log.id}</span> last updated by{" "}
          <span className='black-text'>{log.tech}</span> on{" "}
          <Moment
            parse=' YYYY-MM-DDTHH:mm:ss '
            format='MMMM Do YYYY, H:mm   '
            utc
            local
          >
            {" "}
            {log.date}{" "}
          </Moment>
        </span>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
