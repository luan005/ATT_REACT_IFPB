import { Container } from 'react-bootstrap';
import PropriedadesCard from './InstituicoesCard';
import Carrossel from './Carrosel';

const Main = () => {
  return (
    <main>
        {/* Carrossel */}
        <Carrossel />
      
      <Container fluid className="mt-2">        
        {/* Propriedades */}
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
