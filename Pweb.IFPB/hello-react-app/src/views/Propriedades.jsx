import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'; 

const Propriedades = () => {
  const [propriedades, setPropriedades] = useState([]);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    NO_REGIAO: '',
    SG_UF: '',
    NO_MUNICIPIO: '',
    NO_MESORREGIAO: '',
    NO_MICRORREGIAO: '',
    NO_ENTIDADE: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  
  const validationSchema = Yup.object().shape({
    NO_REGIAO: Yup.string().required('A região é obrigatória'),
    SG_UF: Yup.string().required('O UF é obrigatório'),
    NO_MUNICIPIO: Yup.string().required('O município é obrigatório'),
    NO_MESORREGIAO: Yup.string().required('A mesorregião é obrigatória'),
    NO_MICRORREGIAO: Yup.string().required('A microrregião é obrigatória'),
    NO_ENTIDADE: Yup.string().required('A entidade é obrigatória'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      await validationSchema.validate(inputs, { abortEarly: false });

     
      fetch('http://localhost:3000/instituicoes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Instituição adicionada com sucesso!');
            setPropriedades([...propriedades, inputs]);
            setShow(false);
            setInputs({
              NO_REGIAO: '',
              SG_UF: '',
              NO_MUNICIPIO: '',
              NO_MESORREGIAO: '',
              NO_MICRORREGIAO: '',
              NO_ENTIDADE: ''
            });
          } else {
            toast.error('Erro ao adicionar instituição.');
          }
        })
        .catch((error) => {
          console.error('Erro ao adicionar instituição:', error);
          toast.error('Erro ao adicionar instituição.');
        });
    } catch (validationErrors) {
      
      validationErrors.inner.forEach((error) => {
        toast.error(error.message); 
      });
    }
  };

  const fetchPropriedades = () => {
    fetch('http://localhost:3000/instituicoes')
      .then((response) => response.json())
      .then((data) => setPropriedades(data))
      .catch((error) => {
        console.error('Erro ao carregar instituições:', error);
        toast.error('Erro ao carregar instituições.');
      });
  };

  useEffect(() => {
    fetchPropriedades();
  }, []);

  return (
    <>
      <div>Instituições</div>

      <div>
        <Row>
          <Col>
            <MDBInput
              label="Buscar"
              id="formControlSm"
              type="text"
              size="sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </Col>
          <Col>
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="Adicionar Instituição"
            >
              <Button onClick={handleShow}>+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      <PropriedadesTable
        propriedades={propriedades} 
        setPropriedades={setPropriedades}
      />

      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Instituição</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Nordeste"
                name="NO_REGIAO"
                value={inputs.NO_REGIAO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>UF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: PB"
                name="SG_UF"
                value={inputs.SG_UF}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Araruna"
                name="NO_MUNICIPIO"
                value={inputs.NO_MUNICIPIO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesoregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Mata Paraibana"
                name="NO_MESORREGIAO"
                value={inputs.NO_MESORREGIAO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Cariri Oriental"
                name="NO_MICRORREGIAO"
                value={inputs.NO_MICRORREGIAO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Entidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: INSTITUTO EDUCACIONAL MONTE HOREBE"
                name="NO_ENTIDADE"
                value={inputs.NO_ENTIDADE}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Propriedades;