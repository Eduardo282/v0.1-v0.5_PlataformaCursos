import React, { useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaDownload,
  FaCalendarAlt,
  FaUsers,
  FaCertificate,
  FaClock,
} from "react-icons/fa";
import "./ModulesStyles.css";

const ReportesMetricas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [selectedReport, setSelectedReport] = useState("general");

  const metricas = {
    totalEmpleados: 156,
    empleadosCapacitados: 142,
    cursosCompletados: 89,
    certificacionesVigentes: 134,
    horasCapacitacion: 2340,
    cumplimientoNormativo: 91,
  };

  const reportesDisponibles = [
    {
      id: "general",
      nombre: "Reporte General",
      descripcion: "Vista general de todas las capacitaciones",
      icono: <FaChartBar />,
    },
    {
      id: "cumplimiento",
      nombre: "Cumplimiento Normativo",
      descripcion: "Estado de cumplimiento de normas oficiales",
      icono: <FaCertificate />,
    },
    {
      id: "progreso",
      nombre: "Progreso de Empleados",
      descripcion: "Avance individual de cada empleado",
      icono: <FaChartLine />,
    },
    {
      id: "tiempo",
      nombre: "Análisis de Tiempo",
      descripcion: "Distribución de horas de capacitación",
      icono: <FaClock />,
    },
  ];

  const datosGrafico = {
    cursosTerminados: [12, 19, 23, 25, 22, 18],
    cursosEnProgreso: [8, 12, 15, 18, 16, 14],
    meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="header-content">
          <FaChartBar className="header-icon" />
          <div>
            <h1>Reportes y Métricas</h1>
            <p>Analiza el rendimiento y cumplimiento de capacitaciones</p>
          </div>
        </div>
        <div className="header-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
            <option value="trimestre">Este trimestre</option>
            <option value="año">Este año</option>
          </select>
          <button className="btn-primary">
            <FaDownload /> Exportar
          </button>
        </div>
      </div>

      <div className="module-content">
        {/* Métricas principales */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon employees">
              <FaUsers />
            </div>
            <div className="metric-content">
              <h3>{metricas.totalEmpleados}</h3>
              <p>Total Empleados</p>
              <span className="metric-change positive">
                +5% vs mes anterior
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon courses">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>{metricas.cursosCompletados}</h3>
              <p>Cursos Completados</p>
              <span className="metric-change positive">
                +12% vs mes anterior
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon certificates">
              <FaCertificate />
            </div>
            <div className="metric-content">
              <h3>{metricas.certificacionesVigentes}</h3>
              <p>Certificaciones Vigentes</p>
              <span className="metric-change neutral">Sin cambios</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon hours">
              <FaClock />
            </div>
            <div className="metric-content">
              <h3>{metricas.horasCapacitacion}</h3>
              <p>Horas de Capacitación</p>
              <span className="metric-change positive">
                +8% vs mes anterior
              </span>
            </div>
          </div>
        </div>

        {/* Indicador de cumplimiento */}
        <div className="compliance-section">
          <h2>Cumplimiento Normativo</h2>
          <div className="compliance-meter">
            <div className="compliance-circle">
              <div className="compliance-inner">
                <span className="compliance-percentage">
                  {metricas.cumplimientoNormativo}%
                </span>
                <span className="compliance-label">Cumplimiento</span>
              </div>
            </div>
            <div className="compliance-details">
              <div className="compliance-item">
                <span className="dot green"></span>
                <span>NOM-035: 95% Completado</span>
              </div>
              <div className="compliance-item">
                <span className="dot yellow"></span>
                <span>Seguridad Industrial: 88% Completado</span>
              </div>
              <div className="compliance-item">
                <span className="dot green"></span>
                <span>Primeros Auxilios: 92% Completado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tipos de reportes */}
        <div className="reports-section">
          <h2>Reportes Disponibles</h2>
          <div className="reports-grid">
            {reportesDisponibles.map((reporte) => (
              <div
                key={reporte.id}
                className={`report-card ${selectedReport === reporte.id ? "active" : ""}`}
                onClick={() => setSelectedReport(reporte.id)}
              >
                <div className="report-icon">{reporte.icono}</div>
                <h3>{reporte.nombre}</h3>
                <p>{reporte.descripcion}</p>
                <button className="btn-secondary">
                  <FaDownload /> Generar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de tendencias */}
        <div className="chart-section">
          <h2>Tendencias de Capacitación</h2>
          <div className="chart-container">
            <div className="chart-placeholder">
              <FaChartLine className="chart-icon" />
              <p>Gráfico de tendencias mensuales</p>
              <small>Cursos terminados vs En progreso</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesMetricas;
