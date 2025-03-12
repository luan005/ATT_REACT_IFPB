import Carousel from 'react-bootstrap/Carousel';
import carrossel from '../datasets/carrossel';
import { Col, Row } from 'react-bootstrap';

function carrousel() {
    return (
   
      <Carousel>
        {carrossel.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.imagem}
              alt={item.nome}
              style={{ maxHeight: '600px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>{item.nome}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
    );
  }
  
  export default carrousel;