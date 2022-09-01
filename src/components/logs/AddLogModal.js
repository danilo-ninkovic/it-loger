import React, { useState } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions'; //šalje novi log u []

import M from 'materialize-css/dist/js/materialize.min.js'; //JS iz Materialize paketa za modals i sl.

const AddLogModal = ({ addLog }) => {
  //iz props uzimamo samo funkciju addLog ne povlačimo ništa iz redux state-a
  const [message, setMessage] = useState(''); // ovo su lokalni komponent states
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Molimo unesite poruku i tehničara' }); //POP-UP odlično za alerte
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };
      addLog(newLog);

      M.toast({ html: `Novi log dodat od ${tech}` }); // pop-up porukica

      //Clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    //trigeruje se sa " a - href='#add-log-modal'" u AddBtn-u (veliko plavo +) i mora imati className="modal"
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter system log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log message{' '}
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)} // bit će suprotno od trenutne vrijednosti attention (true-false)
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light blue  btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '75%',
  height: '75%',
};

AddLogModal.propTypes = { addLog: PropTypes.func.isRequired };

export default connect(null, { addLog })(AddLogModal);

//pošto ne donosimo nikakav state u ovaj modal već samo šaljemo novi log
//umjesto "mapStateToProps" stavljamo null
