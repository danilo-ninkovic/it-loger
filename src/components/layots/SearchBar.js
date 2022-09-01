import React, { useRef } from "react"; //pomoću useRef uzimamo value od input-a, bez useState-a
import { connect } from "react-redux";
import { searchLogs } from "../../actions/logActions";
import PropTypes from "prop-types";

const SearchBar = ({ searchLogs }) => {
  const text = useRef(""); //text pomoću useRef prati sve promjene u input-u
  //pošto nemamo submit button pomoću onChange pozivamo funkciju sa svakom promjenom u inputu
  const onChange = (e) => {
    searchLogs(text.current.value);
    // pozvat će onChange iz logActions-a  da šalje request  prema serveru
    // a parametar je ono što je trenutno u inputu (text.current.value)
  };

  return (
    <div className='navbar-fixed'>
      <nav style={{ marginBottom: "30px" }} className='  blue'>
        <div className='nav-wrapper'>
          <form>
            <div className='input-field'>
              <input
                id='search'
                type='search'
                placeholder='Pretražite ...'
                ref={text}
                onChange={onChange}
              />
              <label className='label-icon' htmlFor='search'>
                <i className='material-icons'>search</i>
              </label>
              <i className='material-icons'>close</i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};
export default connect(null, { searchLogs })(SearchBar);
