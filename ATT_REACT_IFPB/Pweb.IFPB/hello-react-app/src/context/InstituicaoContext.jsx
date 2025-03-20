import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const InstituicaoContext = createContext();

const instituicaoInitialValues = {
  NO_REGIAO: '',
  SG_UF: '',
  NO_MUNICIPIO: '',
  NO_MESORREGIAO: '',
  NO_MICRORREGIAO: '',
  NO_ENTIDADE: '',
};

const instituicaoSchema = Yup.object().shape({
  NO_REGIAO: Yup.string().required('A região é obrigatória'),
  SG_UF: Yup.string().required('O UF é obrigatório'),
  NO_MUNICIPIO: Yup.string().required('O município é obrigatório'),
  NO_MESORREGIAO: Yup.string().required('A mesorregião é obrigatória'),
  NO_MICRORREGIAO: Yup.string().required('A microrregião é obrigatória'),
  NO_ENTIDADE: Yup.string().required('A entidade é obrigatória'),
});

export const InstituicaoProvider = ({ children }) => {
  const [instituicoes, setInstituicoes] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const fetchInstituicoes = () => {
    fetch('http://localhost:3000/instituicoes')
      .then((response) => response.json())
      .then((data) => setInstituicoes(data))
      .catch((error) => {
        console.error('Erro ao carregar instituições:', error);
        toast.error('Erro ao carregar instituições.');
      });
  };

  const addInstituicao = (values) => {
    fetch('http://localhost:3000/instituicoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setInstituicoes([...instituicoes, data]);
        toast.success('Instituição adicionada com sucesso!');
        setShow(false);
      })
      .catch((error) => {
        console.error('Erro ao adicionar instituição:', error);
        toast.error('Erro ao adicionar instituição.');
      });
  };

  useEffect(() => {
    fetchInstituicoes();
  }, []);

  return (
    <InstituicaoContext.Provider
      value={{
        instituicoes,
        setInstituicoes,
        instituicaoInitialValues,
        instituicaoSchema,
        show,
        handleShow,
        addInstituicao,
      }}
    >
      {children}
    </InstituicaoContext.Provider>
  );
};

export const useInstituicao = () => useContext(InstituicaoContext);