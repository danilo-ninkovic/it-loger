import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // za interakciju redux-a i komponente
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions'; // ovde smo doveli getLogs() iz logActions koja dohvaća logs sa servera i return za logs i loading je u logReduceru

import LogItem from './LogItem';
import Preloader from '../layots/Preloader';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  //logs i loading su povučeni iz initialStatea(log) u logReduceru a preko index.js
  //funkcije iz logActions se importuju a initialState iz logReducer-a je ušao kroz props pomoću connect-a

  useEffect(() => {
    //prilikom renderovanja će pozvati getLogs fuknciju iz logActions
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show ...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};
Logs.propTypes = {
  log: PropTypes.object.isRequired, // log je unutar props od Logs(props)
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // ovde donosimo potrebne state-ove za ovu komponentu i ubacujemo u connect() export
  log: state.log,
});

// state.log koji smo nazvali "log" je iz index.js "log:logReducer" (a to je cijeli initialState u lorReducer-u)
//pošto je props može se destruktuirat unutar parametra Logs({ log :{logs,loading}})

export default connect(mapStateToProps, { getLogs })(Logs);
/* importovani connect se mora i exportovati a ime komponente ide u drugu (Logs)
unutar connect-a su mapStoretoprops gdje je unesen initialState iz logReducer-a preko 
a u {} su funkcije importovane iz logActions kao getLogs i dr.
 */
