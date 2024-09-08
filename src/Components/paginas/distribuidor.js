import React, { useState } from 'react'; 

const Distribuidor = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    producto: '',
    codigoProductor: '',
    codigoTransaccion: '',
    calidad: '',
    nombreProductor: '',
    nombreDistribuidor: '',
    comunidadProductor: '',
    documentoIdentidad: '',
    numeroParcela: '',
    cantidadKilos: '',
    bolsas: '',
    otrasCertificaciones: [],
    lote: '',
    variedadProducto: '',
    autorizacionTransaccion: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(cert => cert !== value)
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2>Complete Form</h2>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="producto" className="form-label">Product</label>
          <select
            className="form-select"
            id="producto"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="chia">Chia</option>
            <option value="quina">Quinoa</option>
            <option value="amaranto">Amaranth</option>
            <option value="soya">Soy</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="codigoProductor" className="form-label">Producer Code</label>
          <input
            type="text"
            className="form-control"
            id="codigoProductor"
            name="codigoProductor"
            value={formData.codigoProductor}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="codigoTransaccion" className="form-label">Transaction Code</label>
          <input
            type="text"
            className="form-control"
            id="codigoTransaccion"
            name="codigoTransaccion"
            value={formData.codigoTransaccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="calidad" className="form-label">Quality</label>
          <select
            className="form-select"
            id="calidad"
            name="calidad"
            value={formData.calidad}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="organico">Organic</option>
            <option value="convencional">Conventional</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="nombreProductor" className="form-label">Producer's Name</label>
          <input
            type="text"
            className="form-control"
            id="nombreProductor"
            name="nombreProductor"
            placeholder="First Name, Father's Last Name, Mother's Last Name"
            value={formData.nombreProductor}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nombreDistribuidor" className="form-label">Distributor's Name</label>
          <input
            type="text"
            className="form-control"
            id="nombreDistribuidor"
            name="nombreDistribuidor"
            value={formData.nombreDistribuidor}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comunidadProductor" className="form-label">Producer's Community</label>
          <input
            type="text"
            className="form-control"
            id="comunidadProductor"
            name="comunidadProductor"
            placeholder="Community, Province, Department, Country"
            value={formData.comunidadProductor}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="documentoIdentidad" className="form-label">Identity Document</label>
          <input
            type="text"
            className="form-control"
            id="documentoIdentidad"
            name="documentoIdentidad"
            value={formData.documentoIdentidad}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numeroParcela" className="form-label">Plot Number</label>
          <input
            type="text"
            className="form-control"
            id="numeroParcela"
            name="numeroParcela"
            value={formData.numeroParcela}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cantidadKilos" className="form-label">Quantity in Kilos</label>
          <input
            type="number"
            className="form-control"
            id="cantidadKilos"
            name="cantidadKilos"
            value={formData.cantidadKilos}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bolsas" className="form-label">Bags</label>
          <input
            type="number"
            className="form-control"
            id="bolsas"
            name="bolsas"
            value={formData.bolsas}
            onChange={handleChange}
          />
        </div>

        <fieldset className="mb-3">
          <legend className="form-label">Other Certifications</legend>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="certificacionOrganica"
              name="otrasCertificaciones"
              value="organica"
              checked={formData.otrasCertificaciones.includes('organica')}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="certificacionOrganica">Organic</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="certificacionFCCS"
              name="otrasCertificaciones"
              value="fccs"
              checked={formData.otrasCertificaciones.includes('fccs')}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="certificacionFCCS">FCCS</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="certificacionBioSuisse"
              name="otrasCertificaciones"
              value="biosuisse"
              checked={formData.otrasCertificaciones.includes('biosuisse')}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="certificacionBioSuisse">BioSuisse</label>
          </div>
        </fieldset>

        <div className="mb-3">
          <label htmlFor="lote" className="form-label">Batch</label>
          <input
            type="text"
            className="form-control"
            id="lote"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="variedadProducto" className="form-label">Product Variety</label>
          <input
            type="text"
            className="form-control"
            id="variedadProducto"
            name="variedadProducto"
            value={formData.variedadProducto}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="autorizacionTransaccion"
              name="autorizacionTransaccion"
              checked={formData.autorizacionTransaccion}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="autorizacionTransaccion">Transaction Authorization</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        </div>
      </div>
    </div>

      
    </div>
  );
};

export default Distribuidor;
