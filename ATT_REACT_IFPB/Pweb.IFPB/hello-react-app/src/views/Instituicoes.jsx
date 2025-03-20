import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import InstituicoesTable from '../components/InstituicoesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, ErrorMessage } from 'formik';
import { useInstituicao } from '../context/InstituicaoContext';

const Insituicoes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    instituicoes,
    setInstituicoes, 
    instituicaoInitialValues,
    instituicaoSchema,
    show,
    handleShow,
    addInstituicao,
  } = useInstituicao();

  return (
    <>
      <div>Instituições</div>

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
          <MDBTooltip tag="span" wrapperClass="d-inline-block" title="Adicionar Instituição">
            <Button onClick={handleShow}>+</Button>
          </MDBTooltip>
        </Col>
      </Row>

      {/* Passando setInstituicoes como prop */}
      <InstituicoesTable instituicoes={instituicoes} setInstituicoes={setInstituicoes} />

      <Modal show={show} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Instituição</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={instituicaoInitialValues}
          validationSchema={instituicaoSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addInstituicao(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                {[
                  { label: 'Região', name: 'NO_REGIAO', placeholder: 'Ex: Nordeste' },
                  { label: 'UF', name: 'SG_UF', placeholder: 'Ex: PB' },
                  { label: 'Município', name: 'NO_MUNICIPIO', placeholder: 'Ex: Araruna' },
                  { label: 'Mesorregião', name: 'NO_MESORREGIAO', placeholder: 'Ex: Mata Paraibana' },
                  { label: 'Microregião', name: 'NO_MICRORREGIAO', placeholder: 'Ex: Cariri Oriental' },
                  { label: 'Entidade', name: 'NO_ENTIDADE', placeholder: 'Ex: INSTITUTO EDUCACIONAL MONTE HOREBE' },
                ].map(({ label, name, placeholder }) => (
                  <Form.Group className="mb-3" key={name}>
                    <Form.Label>{label}</Form.Label>
                    <Field className="form-control" type="text" name={name} placeholder={placeholder} />
                    <ErrorMessage name={name} component="div" className="text-danger" />
                  </Form.Group>
                ))}
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
          )}
        </Formik>
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

export default Insituicoes;