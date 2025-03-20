import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import usePropriedade from '../context/PropriedadeContext';

const PropriedadesTable = () => {
  let { propriedades, setPropriedades } = usePropriedade();

  const getPropriedades = (event) => {
    fetch('http://localhost:3000/propriedades')
      .then((response) => response.json())
      .then((data) => {
        setPropriedades([...data]);
      })
      .catch((error) => {
        console.log('Deu erro!');
      });
  };

  useEffect(getPropriedades, []);

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Região</th>
            <th scope="col">UF</th>
            <th scope="col">Município</th>
            <th scope="col">Mesoregião</th>
            <th scope="col">Microregião</th>
            <th scope="col">Entidade</th>
            <th scope="col">Ações</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {propriedades.map((propriedades, i) => {
            return (
              <tr key={i}>
                <td>{propriedades.NO_REGIAO}</td>
                <td>{propriedades.SG_UF}</td>
                <td>{propriedades.NO_MUNICIPIO}</td>
                <td>{propriedades.NO_MESORREGIAO}</td>
                <td>{propriedades.NO_MICRORREGIAO}</td>
                <td>{propriedades.NO_ENTIDADE}</td>
                <td>
                  <MDBBtn floating tag="a" className="mx-2">
                    <MDBIcon fas icon="pen" />
                  </MDBBtn>

                  <MDBBtn floating tag="a" className="mx-2" color="danger">
                    <MDBIcon fas icon="trash-alt" />
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default PropriedadesTable;
