import React, { useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js'; //JS iz Materialize paketa za modals i sl.
//uzimamo "current" iz connect-a (initialState u logReducer-u) i updateLog iz logActions-a
const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState(''); //lokalni state-ovi početne vrijednosti pri otvaranju
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    //pri renderovanju će ako postoji current(koji je donesen ) popuniti polja sa njim
    if (current) {
      setMessage(current.message);
      setTech(current.tech);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = () => {
    //pri submitu će
    if (message === '' || tech === '') {
      M.toast({ html: 'Molimo unesite poruku i tehničara' }); //POP-UP odlično za alerte
    } else {
      //updLog je ono što se promijenilo u poljima s tim da id mora ostati isti i date je novi svakako
      const updLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date(),
      };
      //pozivamo funkciju updateLog iz logAction-a i u nju stavljamo updLog
      updateLog(updLog);

      M.toast({ html: `log je promjenjen od ${tech}` }); //porukica

      //Clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    //trigeruje se sa " a - href='#add-log-modal'" u AddBtn-u (veliko plavo +) i mora imati className="modal"
    <div id='edit-log-modal' className='modal' style={modalStyle}>
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

EditLogModal.propTypes = {
  current: PropTypes.object, //nije required
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
