import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({children})=> {

    const[natual,setNatual] = useState("");
    const[jogadores,setJogadores] = useState([]);

    return(
        <AppContext.Provider
            value={{
                natual,
                setNatual,
                jogadores,
                setJogadores,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
  return useContext(AppContext);
};
export default AppContext;