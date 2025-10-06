import React, { useState } from "react";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
  FaChartPie,
  FaDownload,
} from "react-icons/fa";
import "./ModulesStyles.css";

const CumplimientoSTPS = () => {
  const [selectedNorm, setSelectedNorm] = useState("all");

  const normasSTPS = [
    {
      id: "nom035",
      codigo: "NOM-035-STPS-2018",
      nombre: "Factores de Riesgo Psicosocial en el Trabajo",
      descripcion:
        "Identificación, análisis y prevención de factores de riesgo psicosocial",
      cumplimiento: 95,
      empleadosAfectados: 156,
      empleadosCapacitados: 148,
      fechaLimite: "2024-12-31",
      estado: "cumpliendo",
      requisitos: [
        { nombre: "Política de prevención", cumplido: true },
        { nombre: "Identificación y análisis", cumplido: true },
        { nombre: "Evaluación del entorno", cumplido: true },
        { nombre: "Medidas de control", cumplido: false },
        { nombre: "Capacitación", cumplido: true },
      ],
    },
    {
      id: "nom030",
      codigo: "NOM-030-STPS-2009",
      nombre: "Servicios Preventivos de Seguridad y Salud",
      descripcion: "Organización y funcionamiento de los servicios preventivos",
      cumplimiento: 88,
      empleadosAfectados: 156,
      empleadosCapacitados: 137,
      fechaLimite: "2024-11-30",
      estado: "en_progreso",
      requisitos: [
        { nombre: "Diagnóstico de seguridad", cumplido: true },
        { nombre: "Programa de seguridad", cumplido: true },
        { nombre: "Capacitación específica", cumplido: false },
        { nombre: "Supervisión médica", cumplido: true },
        { nombre: "Registro de actividades", cumplido: false },
      ],
    },
    {
      id: "nom019",
      codigo: "NOM-019-STPS-2011",
      nombre: "Constitución y Funcionamiento de Comisiones de Seguridad",
      descripcion:
        "Integración y funcionamiento de comisiones de seguridad e higiene",
      cumplimiento: 92,
      empleadosAfectados: 156,
      empleadosCapacitados: 143,
      fechaLimite: "2024-10-31",
      estado: "por_vencer",
      requisitos: [
        { nombre: "Constitución de comisión", cumplido: true },
        { nombre: "Programa de recorridos", cumplido: true },
        { nombre: "Investigación de accidentes", cumplido: true },
        { nombre: "Capacitación de miembros", cumplido: false },
        { nombre: "Actas de reuniones", cumplido: true },
      ],
    },
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "cumpliendo":
        return "green";
      case "en_progreso":
        return "blue";
      case "por_vencer":
        return "orange";
      case "incumplimiento":
        return "red";
      default:
        return "gray";
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case "cumpliendo":
        return "En Cumplimiento";
      case "en_progreso":
        return "En Progreso";
      case "por_vencer":
        return "Por Vencer";
      case "incumplimiento":
        return "Incumplimiento";
      default:
        return estado;
    }
  };

  const cumplimientoGeneral = Math.round(
    normasSTPS.reduce((acc, norma) => acc + norma.cumplimiento, 0) /
      normasSTPS.length
  );

  const filteredNormas =
    selectedNorm === "all"
      ? normasSTPS
      : normasSTPS.filter((norma) => norma.id === selectedNorm);

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="header-content">
          <FaShieldAlt className="header-icon" />
          <div>
            <h1>Cumplimiento STPS</h1>
            <p>
              Monitorea el cumplimiento de las Normas Oficiales Mexicanas de la
              STPS
            </p>
          </div>
        </div>
        <button className="btn-primary">
          <FaDownload /> Reporte de Cumplimiento
        </button>
      </div>

      <div className="module-content">
        {/* Dashboard de cumplimiento general */}
        <div className="compliance-dashboard">
          <div className="compliance-overview">
            <div className="compliance-circle-large">
              <div className="compliance-inner-large">
                <span className="compliance-percentage-large">
                  {cumplimientoGeneral}%
                </span>
                <span className="compliance-label-large">
                  Cumplimiento General
                </span>
              </div>
            </div>
          </div>

          <div className="compliance-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div>
                <h3>
                  {normasSTPS.reduce(
                    (acc, n) => acc + n.empleadosCapacitados,
                    0
                  )}
                </h3>
                <p>Empleados Capacitados</p>
              </div>
            </div>
            <div className="stat-item">
              <FaFileAlt className="stat-icon" />
              <div>
                <h3>{normasSTPS.length}</h3>
                <p>Normas Aplicables</p>
              </div>
            </div>
            <div className="stat-item">
              <FaCheckCircle className="stat-icon" />
              <div>
                <h3>
                  {normasSTPS.filter((n) => n.estado === "cumpliendo").length}
                </h3>
                <p>En Cumplimiento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtro de normas */}
        <div className="normas-filter">
          <select
            value={selectedNorm}
            onChange={(e) => setSelectedNorm(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las normas</option>
            {normasSTPS.map((norma) => (
              <option key={norma.id} value={norma.id}>
                {norma.codigo}
              </option>
            ))}
          </select>
        </div>

        {/* Lista detallada de normas */}
        <div className="normas-list">
          {filteredNormas.map((norma) => (
            <div key={norma.id} className="norma-card">
              <div className="norma-header">
                <div className="norma-info">
                  <h3>{norma.codigo}</h3>
                  <h4>{norma.nombre}</h4>
                  <p>{norma.descripcion}</p>
                </div>
                <div className="norma-status">
                  <div className={`status-badge ${norma.estado}`}>
                    {getEstadoTexto(norma.estado)}
                  </div>
                  <div className="compliance-mini">
                    <span className="percentage">{norma.cumplimiento}%</span>
                  </div>
                </div>
              </div>

              <div className="norma-metrics">
                <div className="metric">
                  <FaUsers className="metric-icon" />
                  <span>
                    {norma.empleadosCapacitados}/{norma.empleadosAfectados}{" "}
                    empleados
                  </span>
                </div>
                <div className="metric">
                  <FaCalendarAlt className="metric-icon" />
                  <span>Vence: {norma.fechaLimite}</span>
                </div>
              </div>

              <div className="requisitos-section">
                <h4>Requisitos de Cumplimiento</h4>
                <div className="requisitos-grid">
                  {norma.requisitos.map((requisito, index) => (
                    <div key={index} className="requisito-item">
                      {requisito.cumplido ? (
                        <FaCheckCircle className="requisito-icon cumplido" />
                      ) : (
                        <FaExclamationTriangle className="requisito-icon pendiente" />
                      )}
                      <span
                        className={
                          requisito.cumplido ? "cumplido" : "pendiente"
                        }
                      >
                        {requisito.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="norma-actions">
                <button className="btn-secondary">
                  <FaFileAlt /> Ver Documentación
                </button>
                <button className="btn-secondary">
                  <FaChartPie /> Ver Métricas
                </button>
                <button className="btn-primary">
                  <FaDownload /> Generar Reporte
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Alertas de vencimiento */}
        <div className="alerts-section">
          <h2>Alertas de Vencimiento</h2>
          <div className="alerts-list">
            {normasSTPS
              .filter((norma) => norma.estado === "por_vencer")
              .map((norma) => (
                <div key={norma.id} className="alert-item warning">
                  <FaClock className="alert-icon" />
                  <div className="alert-content">
                    <h4>{norma.codigo}</h4>
                    <p>Vence el {norma.fechaLimite}</p>
                  </div>
                  <button className="btn-warning">Revisar</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CumplimientoSTPS;
