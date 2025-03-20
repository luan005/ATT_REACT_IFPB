import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Propriedades = () => {
  const [propriedades, setPropriedades] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShow = () => setShow(!show);

  // Configuração do Formik
  const formik = useFormik({
    initialValues: {
      NO_REGIAO: '',
      SG_UF: '',
      NO_MUNICIPIO: '',
      NO_MESORREGIAO: '',
      NO_MICRORREGIAO: '',
      NO_ENTIDADE: '',
    },
    validationSchema: Yup.object({
      NO_REGIAO: Yup.string().required('A região é obrigatória'),
      SG_UF: Yup.string().required('O UF é obrigatório'),
      NO_MUNICIPIO: Yup.string().required('O município é obrigatório'),
      NO_MESORREGIAO: Yup.string().required('A mesorregião é obrigatória'),
      NO_MICRORREGIAO: Yup.string().required('A microrregião é obrigatória'),
      NO_ENTIDADE: Yup.string().required('A entidade é obrigatória'),
    }),
    onSubmit: (values) => {
      fetch('http://localhost:3000/instituicoes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Instituição adicionada com sucesso!');
            setPropriedades([...propriedades, values]);
            setShow(false);
            formik.resetForm(); // Reseta o formulário após a submissão
          } else {
            toast.error('Erro ao adicionar instituição.');
          }
        })
        .catch((error) => {
          console.error('Erro ao adicionar instituição:', error);
          toast.error('Erro ao adicionar instituição.');
        });
    },
  });

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
        fetchPropriedades={fetchPropriedades}
      />

      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Instituição</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Nordeste"
                name="NO_REGIAO"
                value={formik.values.NO_REGIAO}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NO_REGIAO && formik.errors.NO_REGIAO ? (
                <div className="text-danger">{formik.errors.NO_REGIAO}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>UF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: PB"
                name="SG_UF"
                value={formik.values.SG_UF}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.SG_UF && formik.errors.SG_UF ? (
                <div className="text-danger">{formik.errors.SG_UF}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Araruna"
                name="NO_MUNICIPIO"
                value={formik.values.NO_MUNICIPIO}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NO_MUNICIPIO && formik.errors.NO_MUNICIPIO ? (
                <div className="text-danger">{formik.errors.NO_MUNICIPIO}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesoregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Mata Paraibana"
                name="NO_MESORREGIAO"
                value={formik.values.NO_MESORREGIAO}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NO_MESORREGIAO && formik.errors.NO_MESORREGIAO ? (
                <div className="text-danger">{formik.errors.NO_MESORREGIAO}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Cariri Oriental"
                name="NO_MICRORREGIAO"
                value={formik.values.NO_MICRORREGIAO}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NO_MICRORREGIAO && formik.errors.NO_MICRORREGIAO ? (
                <div className="text-danger">{formik.errors.NO_MICRORREGIAO}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Entidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: INSTITUTO EDUCACIONAL MONTE HOREBE"
                name="NO_ENTIDADE"
                value={formik.values.NO_ENTIDADE}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.NO_ENTIDADE && formik.errors.NO_ENTIDADE ? (
                <div className="text-danger">{formik.errors.NO_ENTIDADE}</div>
              ) : null}
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