import React, { Fragment, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css"; //main CSS iz Materialize paketa za css clases
import M from "materialize-css/dist/js/materialize.min.js"; //JS iz Materialize paketa za modals i sl.
import "./App.css";
import SearcBar from "./components/layots/SearchBar";
import Logs from "./components/logs/Logs"; //u Logs komponenti se dohvaćaju logs iz baze pri loudovanju
import AddBtn from "../src/components/layots/AddBtn"; //plavi + button dole desno
import AddLogModal from "./components/logs/AddLogModal"; // veći modal prozor za unos novog log-a (Enter System Log)
import EditLogModal from "./components/logs/EditLogModal"; // veći modal prozor za promjenu log-a (trigeruje se ulogItem-u klikom na log.message)
import AddTechModal from "./components/techs/AddTechModal"; //manji modal za dodavanje thničara (trigeruje se na crveno dugme)
import TechListModal from "./components/techs/TechListModal"; //manji modal za pregled thničara (trigeruje se na plavo malo  dugme)
import { Provider } from "react-redux"; // za povezivanje reacta i redux-a omogućava provide redux state u react
import store from "./store"; // centralni store za redux

const App = () => {
  useEffect(() => {
    M.AutoInit(); //inicijalizacija Materijalize JS-a
  });

  return (
    <Provider store={store}>
      <Fragment>
        <SearcBar />
        <div className='container'>
          <AddBtn />
          <AddTechModal />
          <TechListModal />
          <AddLogModal />
          <EditLogModal />
          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
