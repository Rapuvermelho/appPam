import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({children})=> {

    const[nome,setNome] = useState('');
    const[par,setPar] = useState('');
    const[vivo,setVivo] = useState(true);

    return(
        <AppContext.Provider
            value={{
                nome,
                setNome,
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