import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const InstituicoesTable = ({ instituicoes = [], setInstituicoes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [instituicoesPerPage] = useState(10);
  const [maxPageButtons] = useState(15);

  const currentInstituicoes = instituicoes.slice(
    (currentPage - 1) * instituicoesPerPage,
    currentPage * instituicoesPerPage
  );

  const totalPages = Math.ceil(instituicoes.length / instituicoesPerPage);

  const renderPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <Button key="prev" onClick={() => setCurrentPage(currentPage - 1)} style={{ margin: '0 5px' }}>
          Anterior
        </Button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{ margin: '0 5px', fontWeight: currentPage === i ? 'bold' : 'normal' }}
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <Button key="next" onClick={() => setCurrentPage(currentPage + 1)} style={{ margin: '0 5px' }}>
          Próximo
        </Button>
      );
    }

    return buttons;
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setInstituicoes(instituicoes.filter((instituicao) => instituicao.id !== id));
          toast.success('Instituição excluída com sucesso!');
        } else {
          toast.error('Erro ao excluir instituição.');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir instituição:', error);
        toast.error('Erro ao excluir instituição.');
      });
  };

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Região</th>
            <th scope="col">UF</th>
            <th scope="col">Município</th>
            <th scope="col">Mesorregião</th>
            <th scope="col">Microrregião</th>
            <th scope="col">Entidade</th>
            <th scope="col">Ações</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentInstituicoes.map((instituicao, i) => (
            <tr key={i}>
              <td>{instituicao.NO_REGIAO}</td>
              <td>{instituicao.SG_UF}</td>
              <td>{instituicao.NO_MUNICIPIO}</td>
              <td>{instituicao.NO_MESORREGIAO}</td>
              <td>{instituicao.NO_MICRORREGIAO}</td>
              <td>{instituicao.NO_ENTIDADE}</td>
              <td>
                <MDBBtn floating tag="a" className="mx-2">
                  <MDBIcon fas icon="pen" />
                </MDBBtn>
                <MDBBtn
                  floating
                  tag="a"
                  className="mx-2"
                  color="danger"
                  onClick={() => handleDelete(instituicao.id)}
                >
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {renderPageButtons()}
      </div>
    </>
  );
};

export default InstituicoesTable;