import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InstituicaoCard = ({ imagem, nome, descricao }) => {
  const detalharHandleClick = (event) => {
    console.log('Clicou');
  };

  return (
    <Col md = {4}>
      <Card style={{ margin: '20px' }}>
        <Card.Img variant="top" src={imagem} />
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Text>{descricao}</Card.Text>
          <Button onClick={detalharHandleClick} variant="primary">
            Detalhar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

InstituicaoCard.propTypes = {
  imagem: PropTypes.string,
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default InstituicaoCard;
