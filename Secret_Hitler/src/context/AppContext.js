import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({children})=> {

    const[natual,setNatual] = useState("");
    const[jogadores,setJogadores] = useState([]);
    const[par,setPar] = useState([[]]);
    const[vivo,setVivo] = useState(true);
    const[pres,setPres] = useState(false);
    const[chan,setChan] = useState(false);

    return(
        <AppContext.Provider
            value={{
                chan,
                setChan,
                pres,
                setPres,
                natual,
                setNatual,
                jogadores,
                setJogadores,
                par,
                setPar,
                vivo,
                setVivo,
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