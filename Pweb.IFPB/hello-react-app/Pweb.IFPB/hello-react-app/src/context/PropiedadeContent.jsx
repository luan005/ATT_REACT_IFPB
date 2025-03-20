import { createContext, useContext, useState } from 'react';
import * as yup from 'yup';

const PropriedadeContext = createContext();

export function PropriedadeContextProvider({ children }) {
  let [propriedades, setPropriedades] = useState([]);

  let [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  let propriedadesInitialValues = {
    NO_REGIAO: '',
    SG_UF: '',
    NO_MUNICIPIO: '',
    NO_MESORREGIAO: '',
    NO_MICRORREGIAO: '',
  };

  const propriedadeSchema = yup.object().shape({
    NO_REGIAO: yup.string().trim().min(1).max(10).required(),
    SG_UF: yup.string().trim().min(1).max(20).required(),
    NO_MUNICIPIO: yup.string().trim().min(1).max(20).required(),
    NO_MESORREGIAO: yup.number().required(),
    NO_MICRORREGIAO: yup.number().required(),
  });

  return (
    <PropriedadeContext.Provider
      value={{
        propriedades,
        setPropriedades,
        propriedadesInitialValues,
        propriedadeSchema,
        show,
        handleShow,
      }}
    >
      {children}
    </PropriedadeContext.Provider>
  );
}

export default function usePropriedade() {
  return useContext(PropriedadeContext);
}
