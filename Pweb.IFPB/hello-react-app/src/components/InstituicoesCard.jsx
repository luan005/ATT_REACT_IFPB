import { Row } from 'react-bootstrap';
import InstituicaoCard from './InstituicaoCard'; 
import Instituicoes from '../datasets/instituicoes';

const InstituicoesCard= () => { 
  let instituicoesData = [...Instituicoes]; 
  return (
    <>
      <Row className="gx-3">
        {instituicoesData.map((instituicao, indice) => {
          return (
            <InstituicaoCard
              key={indice}
              imagem={instituicao.imagem} 
              nome={instituicao.NO_ENTIDADE} 
              descricao={`${instituicao.NO_MUNICIPIO}, ${instituicao.SG_UF}`}
            />
          );
        })}
      </Row>
    </>
  );
};

export default InstituicoesCard; 
