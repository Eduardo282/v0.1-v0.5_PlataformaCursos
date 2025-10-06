import React, { useState } from "react";
import {
  FaCamera,
  FaUpload,
  FaEye,
  FaDownload,
  FaTrash,
  FaFileImage,
  FaFilePdf,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import "./ModulesStyles.css";

const Evidencias = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const evidencias = [
    {
      id: 1,
      nombre: "Capacitación NOM-035 Grupo A",
      tipo: "imagen",
      archivo: "capacitacion_nom035_grupoA.jpg",
      fechaSubida: "2024-03-15",
      empleado: "María García",
      curso: "NOM-035 Factores de Riesgo",
      tamaño: "2.5 MB",
    },
    {
      id: 2,
      nombre: "Examen Seguridad Industrial",
      tipo: "pdf",
      archivo: "examen_seguridad_carlos.pdf",
      fechaSubida: "2024-03-10",
      empleado: "Carlos Rodríguez",
      curso: "Seguridad e Higiene",
      tamaño: "1.8 MB",
    },
    {
      id: 3,
      nombre: "Práctica Primeros Auxilios",
      tipo: "imagen",
      archivo: "practica_primeros_auxilios.jpg",
      fechaSubida: "2024-03-08",
      empleado: "Ana Martínez",
      curso: "Primeros Auxilios",
      tamaño: "3.2 MB",
    },
    {
      id: 4,
      nombre: "Lista de Asistencia",
      tipo: "documento",
      archivo: "lista_asistencia_marzo.docx",
      fechaSubida: "2024-03-05",
      empleado: "Luis Torres",
      curso: "Manejo de Químicos",
      tamaño: "0.5 MB",
    },
  ];

  const getFileIcon = (tipo) => {
    switch (tipo) {
      case "imagen":
        return <FaFileImage className="file-icon image" />;
      case "pdf":
        return <FaFilePdf className="file-icon pdf" />;
      case "documento":
        return <FaFileAlt className="file-icon document" />;
      default:
        return <FaFileAlt className="file-icon" />;
    }
  };

  const filteredEvidencias = evidencias.filter((evidencia) => {
    const matchesSearch =
      evidencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evidencia.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evidencia.curso.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "todas" || evidencia.tipo === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="header-content">
          <FaCamera className="header-icon" />
          <div>
            <h1>Gestión de Evidencias</h1>
            <p>
              Almacena y organiza evidencias de capacitaciones y evaluaciones
            </p>
          </div>
        </div>
        <button className="btn-primary">
          <FaUpload /> Subir Evidencia
        </button>
      </div>

      <div className="module-content">
        {/* Pestañas de filtro */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "todas" ? "active" : ""}`}
            onClick={() => setActiveTab("todas")}
          >
            Todas ({evidencias.length})
          </button>
          <button
            className={`tab ${activeTab === "imagen" ? "active" : ""}`}
            onClick={() => setActiveTab("imagen")}
          >
            Imágenes ({evidencias.filter((e) => e.tipo === "imagen").length})
          </button>
          <button
            className={`tab ${activeTab === "pdf" ? "active" : ""}`}
            onClick={() => setActiveTab("pdf")}
          >
            PDFs ({evidencias.filter((e) => e.tipo === "pdf").length})
          </button>
          <button
            className={`tab ${activeTab === "documento" ? "active" : ""}`}
            onClick={() => setActiveTab("documento")}
          >
            Documentos (
            {evidencias.filter((e) => e.tipo === "documento").length})
          </button>
        </div>

        {/* Búsqueda */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar evidencias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Grid de evidencias */}
        <div className="evidencias-grid">
          {filteredEvidencias.map((evidencia) => (
            <div key={evidencia.id} className="evidencia-card">
              <div className="evidencia-header">
                {getFileIcon(evidencia.tipo)}
                <span className="file-size">{evidencia.tamaño}</span>
              </div>

              <div className="evidencia-content">
                <h3>{evidencia.nombre}</h3>
                <p className="empleado">{evidencia.empleado}</p>
                <p className="curso">{evidencia.curso}</p>
                <p className="fecha">{evidencia.fechaSubida}</p>
              </div>

              <div className="evidencia-actions">
                <button className="btn-action view" title="Ver">
                  <FaEye />
                </button>
                <button className="btn-action download" title="Descargar">
                  <FaDownload />
                </button>
                <button className="btn-action delete" title="Eliminar">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Zona de subida */}
        <div className="upload-zone">
          <FaUpload className="upload-icon" />
          <h3>Arrastra archivos aquí o haz clic para seleccionar</h3>
          <p>Formatos soportados: JPG, PNG, PDF, DOC, DOCX (Max. 10MB)</p>
          <input
            type="file"
            className="file-input"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          />
        </div>
      </div>
    </div>
  );
};

export default Evidencias;
