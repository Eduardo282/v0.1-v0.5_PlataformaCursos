import React, { useState } from "react";
import {
  FaCertificate,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./ModulesStyles.css";

const Certificaciones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

  const certificaciones = [
    {
      id: 1,
      nombre: "María García López",
      curso: "NOM-035 Factores de Riesgo Psicosocial",
      fechaEmision: "2024-03-15",
      fechaVencimiento: "2025-03-15",
      estado: "activo",
      certificado: "CERT-001-2024",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez Pérez",
      curso: "Seguridad e Higiene Industrial",
      fechaEmision: "2024-02-20",
      fechaVencimiento: "2025-02-20",
      estado: "activo",
      certificado: "CERT-002-2024",
    },
    {
      id: 3,
      nombre: "Ana Martínez Silva",
      curso: "Primeros Auxilios Básicos",
      fechaEmision: "2023-12-10",
      fechaVencimiento: "2024-12-10",
      estado: "vencido",
      certificado: "CERT-003-2023",
    },
    {
      id: 4,
      nombre: "Luis Fernando Torres",
      curso: "Manejo de Sustancias Químicas",
      fechaEmision: "2024-01-05",
      fechaVencimiento: "2025-01-05",
      estado: "por_vencer",
      certificado: "CERT-004-2024",
    },
  ];

  const filteredCertificaciones = certificaciones.filter((cert) => {
    const matchesSearch =
      cert.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.curso.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "todos" || cert.estado === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "activo":
        return <FaCheckCircle className="status-icon active" />;
      case "vencido":
        return <FaExclamationTriangle className="status-icon expired" />;
      case "por_vencer":
        return <FaClock className="status-icon warning" />;
      default:
        return null;
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case "activo":
        return "Activo";
      case "vencido":
        return "Vencido";
      case "por_vencer":
        return "Por Vencer";
      default:
        return estado;
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="header-content">
          <FaCertificate className="header-icon" />
          <div>
            <h1>Gestión de Certificaciones</h1>
            <p>Administra y supervisa todas las certificaciones de empleados</p>
          </div>
        </div>
      </div>

      <div className="module-content">
        {/* Controles de filtro y búsqueda */}
        <div className="controls-section">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <FaFilter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="por_vencer">Por Vencer</option>
              <option value="vencido">Vencidos</option>
            </select>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="stats-grid">
          <div className="stat-card active">
            <h3>
              {certificaciones.filter((c) => c.estado === "activo").length}
            </h3>
            <p>Certificaciones Activas</p>
          </div>
          <div className="stat-card warning">
            <h3>
              {certificaciones.filter((c) => c.estado === "por_vencer").length}
            </h3>
            <p>Por Vencer</p>
          </div>
          <div className="stat-card expired">
            <h3>
              {certificaciones.filter((c) => c.estado === "vencido").length}
            </h3>
            <p>Vencidas</p>
          </div>
        </div>

        {/* Tabla de certificaciones */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Curso</th>
                <th>Fecha Emisión</th>
                <th>Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificaciones.map((cert) => (
                <tr key={cert.id}>
                  <td>{cert.nombre}</td>
                  <td>{cert.curso}</td>
                  <td>{cert.fechaEmision}</td>
                  <td>{cert.fechaVencimiento}</td>
                  <td>
                    <span className={`status-badge ${cert.estado}`}>
                      {getStatusIcon(cert.estado)}
                      {getStatusText(cert.estado)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action view"
                        title="Ver certificado"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn-action download"
                        title="Descargar PDF"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Certificaciones;
