import React, { useState } from "react";
import {
  FaFolder,
  FaUser,
  FaSearch,
  FaPlus,
  FaEdit,
  FaEye,
  FaDownload,
  FaFileAlt,
  FaCertificate,
  FaCalendarAlt,
} from "react-icons/fa";
import "./ModulesStyles.css";

const Expedientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("todos");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const expedientes = [
    {
      id: 1,
      nombre: "María García López",
      puesto: "Gerente de Recursos Humanos",
      departamento: "Recursos Humanos",
      fechaIngreso: "2020-01-15",
      numeroEmpleado: "EMP-001",
      cursos: [
        {
          nombre: "NOM-035 Factores de Riesgo",
          fecha: "2024-03-15",
          estado: "completado",
        },
        {
          nombre: "Liderazgo Efectivo",
          fecha: "2024-02-10",
          estado: "completado",
        },
        {
          nombre: "Evaluación de Desempeño",
          fecha: "2024-01-20",
          estado: "en_progreso",
        },
      ],
      certificaciones: 8,
      horasCapacitacion: 120,
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez Pérez",
      puesto: "Supervisor de Seguridad",
      departamento: "Seguridad Industrial",
      fechaIngreso: "2019-06-10",
      numeroEmpleado: "EMP-002",
      cursos: [
        {
          nombre: "Seguridad e Higiene Industrial",
          fecha: "2024-02-20",
          estado: "completado",
        },
        {
          nombre: "Manejo de Emergencias",
          fecha: "2024-01-15",
          estado: "completado",
        },
        {
          nombre: "Inspección de Seguridad",
          fecha: "2023-12-05",
          estado: "completado",
        },
      ],
      certificaciones: 12,
      horasCapacitacion: 180,
    },
    {
      id: 3,
      nombre: "Ana Martínez Silva",
      puesto: "Enfermera Ocupacional",
      departamento: "Salud Ocupacional",
      fechaIngreso: "2021-03-22",
      numeroEmpleado: "EMP-003",
      cursos: [
        {
          nombre: "Primeros Auxilios Avanzados",
          fecha: "2024-03-08",
          estado: "completado",
        },
        {
          nombre: "Ergonomía Laboral",
          fecha: "2024-02-12",
          estado: "completado",
        },
        {
          nombre: "Salud Mental en el Trabajo",
          fecha: "2024-01-10",
          estado: "pendiente",
        },
      ],
      certificaciones: 6,
      horasCapacitacion: 95,
    },
    {
      id: 4,
      nombre: "Luis Fernando Torres",
      puesto: "Técnico Químico",
      departamento: "Laboratorio",
      fechaIngreso: "2022-08-01",
      numeroEmpleado: "EMP-004",
      cursos: [
        {
          nombre: "Manejo de Sustancias Químicas",
          fecha: "2024-01-05",
          estado: "completado",
        },
        {
          nombre: "Protocolos de Laboratorio",
          fecha: "2023-11-20",
          estado: "completado",
        },
        {
          nombre: "Gestión de Residuos",
          fecha: "2023-10-15",
          estado: "en_progreso",
        },
      ],
      certificaciones: 4,
      horasCapacitacion: 85,
    },
  ];

  const departamentos = [
    "todos",
    "Recursos Humanos",
    "Seguridad Industrial",
    "Salud Ocupacional",
    "Laboratorio",
  ];

  const filteredExpedientes = expedientes.filter((empleado) => {
    const matchesSearch =
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.numeroEmpleado
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      empleado.puesto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "todos" ||
      empleado.departamento === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "completado":
        return "green";
      case "en_progreso":
        return "blue";
      case "pendiente":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <div className="header-content">
          <FaFolder className="header-icon" />
          <div>
            <h1>Expedientes de Empleados</h1>
            <p>
              Gestiona los registros completos de capacitación de cada empleado
            </p>
          </div>
        </div>
        <button className="btn-primary">
          <FaPlus /> Nuevo Expediente
        </button>
      </div>

      <div className="module-content">
        {/* Controles de búsqueda y filtro */}
        <div className="controls-section">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, número de empleado o puesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            {departamentos.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "todos" ? "Todos los departamentos" : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de expedientes */}
        <div className="expedientes-grid">
          {filteredExpedientes.map((empleado) => (
            <div key={empleado.id} className="expediente-card">
              <div className="expediente-header">
                <div className="employee-avatar">
                  <FaUser />
                </div>
                <div className="employee-info">
                  <h3>{empleado.nombre}</h3>
                  <p className="employee-id">{empleado.numeroEmpleado}</p>
                  <p className="employee-position">{empleado.puesto}</p>
                  <p className="employee-department">{empleado.departamento}</p>
                </div>
              </div>

              <div className="expediente-stats">
                <div className="stat">
                  <span className="stat-number">
                    {empleado.certificaciones}
                  </span>
                  <span className="stat-label">Certificaciones</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {empleado.horasCapacitacion}
                  </span>
                  <span className="stat-label">Horas</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{empleado.cursos.length}</span>
                  <span className="stat-label">Cursos</span>
                </div>
              </div>

              <div className="expediente-courses">
                <h4>Últimos Cursos</h4>
                {empleado.cursos.slice(0, 3).map((curso, index) => (
                  <div key={index} className="course-item">
                    <span
                      className={`course-status ${getEstadoColor(curso.estado)}`}
                    ></span>
                    <span className="course-name">{curso.nombre}</span>
                    <span className="course-date">{curso.fecha}</span>
                  </div>
                ))}
              </div>

              <div className="expediente-actions">
                <button
                  className="btn-action view"
                  title="Ver expediente completo"
                  onClick={() => setSelectedEmployee(empleado)}
                >
                  <FaEye />
                </button>
                <button className="btn-action edit" title="Editar">
                  <FaEdit />
                </button>
                <button className="btn-action download" title="Descargar PDF">
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalle del expediente */}
        {selectedEmployee && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedEmployee(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Expediente de {selectedEmployee.nombre}</h2>
                <button
                  className="close-btn"
                  onClick={() => setSelectedEmployee(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="employee-details">
                  <div className="detail-row">
                    <strong>Número de Empleado:</strong>{" "}
                    {selectedEmployee.numeroEmpleado}
                  </div>
                  <div className="detail-row">
                    <strong>Puesto:</strong> {selectedEmployee.puesto}
                  </div>
                  <div className="detail-row">
                    <strong>Departamento:</strong>{" "}
                    {selectedEmployee.departamento}
                  </div>
                  <div className="detail-row">
                    <strong>Fecha de Ingreso:</strong>{" "}
                    {selectedEmployee.fechaIngreso}
                  </div>
                </div>

                <div className="courses-history">
                  <h3>Historial de Cursos</h3>
                  <div className="courses-list">
                    {selectedEmployee.cursos.map((curso, index) => (
                      <div key={index} className="course-detail">
                        <div className="course-info">
                          <h4>{curso.nombre}</h4>
                          <p>Fecha: {curso.fecha}</p>
                        </div>
                        <span className={`status-badge ${curso.estado}`}>
                          {curso.estado.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expedientes;
