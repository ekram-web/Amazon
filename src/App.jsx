import { useContext, useEffect } from "react";
import "./App.css";

import Routing from "./Router.jsx";
import { DataContext } from "./Utility/DataProvider/DataProvider.jsx";
import { auth } from "./Utility/Firebase.js";
import { Type } from "./Utility/action.type.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
  
    auth.onAuthStateChanged((authUser) => {
      
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
