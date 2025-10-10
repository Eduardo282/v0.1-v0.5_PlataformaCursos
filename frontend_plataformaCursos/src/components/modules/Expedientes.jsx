import React, { useState } from "react";
import {
  FaUsers,
  FaFileAlt,
  FaCertificate,
  FaExclamationTriangle,
  FaSearch,
  FaEye,
  FaDownload,
  FaEdit,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
  FaBriefcase,
  FaUserTie,
  FaPlus,
} from "react-icons/fa";

const Expedientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("todos");
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  // Estadísticas
  const stats = {
    totalEmpleados: 1245,
    expedientesCompletos: 198,
    certificadosActivos: 1456,
    vencimientosProximos: 23,
  };

  // Datos de empleados
  const empleados = [
    {
      id: "EMP-001",
      nombre: "Ana García López",
      email: "ana.garcia@empresa.com",
      avatar: "AGL",
      avatarColor: "#3b82f6",
      departamento: "Recursos Humanos",
      puesto: "Gerente de Recursos Humanos",
      jefe: "Ana López",
      fechaIngreso: "2022-03-15",
      telefono: "+52 55 1234 5678",
      direccion: "Av. Insurgentes 123, Col. Roma, CDMX",
      contactoEmergencia: "María Pérez - +52 55 9876 5432",
      capacitacion: {
        completados: 8,
        activos: 2,
        tiempoTotal: "120h",
      },
      cumplimiento: 95,
      estado: "cumple",
      ultimaActualizacion: "2/14/2024",
    },
    {
      id: "EMP-002",
      nombre: "Carlos Mendoza Ruiz",
      email: "carlos.mendoza@empresa.com",
      avatar: "CMR",
      avatarColor: "#22c55e",
      departamento: "Finanzas",
      puesto: "Contador General",
      jefe: "Laura Martínez",
      fechaIngreso: "2021-07-22",
      telefono: "+52 55 2345 6789",
      direccion: "Calle Reforma 456, Col. Centro, CDMX",
      contactoEmergencia: "Pedro Mendoza - +52 55 8765 4321",
      capacitacion: {
        completados: 12,
        activos: 1,
        tiempoTotal: "180h",
      },
      cumplimiento: 88,
      estado: "cumple",
      ultimaActualizacion: "2/9/2024",
    },
    {
      id: "EMP-003",
      nombre: "María Fernández Silva",
      email: "maria.fernandez@empresa.com",
      avatar: "MFS",
      avatarColor: "#f59e0b",
      departamento: "Operaciones",
      puesto: "Coordinadora de Seguridad",
      jefe: "Roberto Sánchez",
      fechaIngreso: "2020-11-10",
      telefono: "+52 55 3456 7890",
      direccion: "Av. Universidad 789, Col. Del Valle, CDMX",
      contactoEmergencia: "Juan Fernández - +52 55 7654 3210",
      capacitacion: {
        completados: 5,
        activos: 3,
        tiempoTotal: "85h",
      },
      cumplimiento: 72,
      estado: "parcial",
      ultimaActualizacion: "2/7/2024",
    },
    {
      id: "EMP004",
      nombre: "Juan Pérez García",
      email: "juan.perez@empresa.com",
      avatar: "JPG",
      avatarColor: "#8b5cf6",
      departamento: "Operaciones",
      puesto: "Supervisor de Producción",
      jefe: "Ana López",
      fechaIngreso: "2022-03-15",
      telefono: "+52 55 1234 5678",
      direccion: "Av. Insurgentes 123, Col. Roma, CDMX",
      contactoEmergencia: "María Pérez - +52 55 9876 5432",
      capacitacion: {
        completados: 6,
        activos: 0,
        tiempoTotal: "10h",
      },
      cumplimiento: 92,
      estado: "activo",
      ultimaActualizacion: "2/14/2024",
    },
    {
      id: "EMP002",
      nombre: "María González López",
      email: "maria.gonzalez@empresa.com",
      avatar: "MGL",
      avatarColor: "#ec4899",
      departamento: "Recursos Humanos",
      puesto: "Analista de Recursos Humanos",
      jefe: "Roberto García",
      fechaIngreso: "2021-08-20",
      telefono: "+52 55 2345 6789",
      direccion: "Calle Reforma 456, Col. Juárez, CDMX",
      contactoEmergencia: "Carlos González - +52 55 8765 4321",
      capacitacion: {
        completados: 12,
        activos: 12,
        tiempoTotal: "12h",
      },
      cumplimiento: 100,
      estado: "activo",
      ultimaActualizacion: "2/12/2024",
    },
    {
      id: "EMP003",
      nombre: "Carlos Ruiz Mendoza",
      email: "carlos.ruiz@empresa.com",
      avatar: "CRM",
      avatarColor: "#f97316",
      departamento: "Seguridad",
      puesto: "Técnico de Seguridad",
      jefe: "Patricia López",
      fechaIngreso: "2023-01-10",
      telefono: "+52 55 3456 7890",
      direccion: "Av. Revolución 789, Col. San Ángel, CDMX",
      contactoEmergencia: "Laura Ruiz - +52 55 7654 3210",
      capacitacion: {
        completados: 6,
        activos: 15,
        tiempoTotal: "15h",
      },
      cumplimiento: 76,
      estado: "enCapacitacion",
      ultimaActualizacion: "2/10/2024",
    },
  ];

  const departamentos = [
    "Recursos Humanos",
    "Finanzas",
    "Operaciones",
    "Seguridad",
    "Producción",
  ];

  const getEstadoBadge = (estado) => {
    const configs = {
      cumple: { bg: "rgba(34,197,94,0.2)", color: "#4ade80", text: "Cumple" },
      parcial: {
        bg: "rgba(245,158,11,0.2)",
        color: "#fbbf24",
        text: "Parcial",
      },
      activo: { bg: "rgba(34,197,94,0.2)", color: "#4ade80", text: "Activo" },
      enCapacitacion: {
        bg: "rgba(245,158,11,0.2)",
        color: "#fbbf24",
        text: "En Capacitación",
      },
    };
    const config = configs[estado] || configs.parcial;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: config.bg,
          color: config.color,
          padding: "0.35rem 0.75rem",
          borderRadius: "12px",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        {config.text}
      </span>
    );
  };

  const getCumplimientoColor = (porcentaje) => {
    if (porcentaje >= 90) return "#22c55e";
    if (porcentaje >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const filteredEmpleados = empleados.filter((emp) => {
    const matchSearch =
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDepartamento =
      selectedDepartamento === "todos" ||
      emp.departamento === selectedDepartamento;
    return matchSearch && matchDepartamento;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0a0f1a 0%, #0c1220 55%, #0b1426 100%)",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 24px rgba(0,229,255,0.06)",
        }}
      >
        <h1
          style={{
            color: "#E6F1FF",
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Expedientes de Empleados
        </h1>
        <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
          Gestión integral de registros de capacitación y cumplimiento
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            key: "totalEmpleados",
            label: "Total Empleados",
            icon: <FaUsers />,
            color: "#3b82f6",
            bg: "rgba(59,130,246,0.15)",
          },
          {
            key: "expedientesCompletos",
            label: "Expedientes Completos",
            icon: <FaFileAlt />,
            color: "#22c55e",
            bg: "rgba(34,197,94,0.15)",
          },
          {
            key: "certificadosActivos",
            label: "Certificados Activos",
            icon: <FaCertificate />,
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.15)",
          },
          {
            key: "vencimientosProximos",
            label: "Vencimientos Próximos",
            icon: <FaExclamationTriangle />,
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.15)",
          },
        ].map((stat) => (
          <div
            key={stat.key}
            style={{
              background:
                "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
              backdropFilter: "saturate(160%) blur(12px)",
              WebkitBackdropFilter: "saturate(160%) blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 16px 40px ${stat.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  color: "#B7CCE9",
                  fontSize: "0.85rem",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                  fontSize: "1.5rem",
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div
              style={{ fontSize: "2.5rem", fontWeight: 700, color: "#E6F1FF" }}
            >
              {stats[stat.key].toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Barra de búsqueda y filtros */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <FaSearch
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#B7CCE9",
              fontSize: "1rem",
            }}
          />
          <input
            type="text"
            placeholder="Buscar por nombre, ID o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "0.875rem 1rem 0.875rem 3rem",
              color: "#E6F1FF",
              fontSize: "0.95rem",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(33,150,243,0.5)";
              e.target.style.background = "rgba(255,255,255,0.08)";
              e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.15)";
              e.target.style.background = "rgba(255,255,255,0.05)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <select
          value={selectedDepartamento}
          onChange={(e) => setSelectedDepartamento(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "0.875rem 1rem",
            color: "#E6F1FF",
            fontSize: "0.95rem",
            outline: "none",
            cursor: "pointer",
            minWidth: "200px",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(33,150,243,0.5)";
            e.target.style.background = "rgba(255,255,255,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.15)";
            e.target.style.background = "rgba(255,255,255,0.05)";
          }}
        >
          <option value="todos">Todos los departamentos</option>
          {departamentos.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <button
          style={{
            background: "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
            border: "1px solid rgba(33,118,189,0.4)",
            borderRadius: "12px",
            padding: "0.875rem 1.5rem",
            color: "white",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(33,118,189,0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(33,118,189,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(33,118,189,0.3)";
          }}
        >
          <FaPlus />
          Nuevo Empleado
        </button>
      </div>

      {/* Tabla de empleados */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 24px rgba(0,229,255,0.06)",
        }}
      >
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3
            style={{
              color: "#E6F1FF",
              fontSize: "1.2rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Empleados ({filteredEmpleados.length})
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Empleado
                </th>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Departamento
                </th>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Capacitación
                </th>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Cumplimiento
                </th>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Última Actualización
                </th>
                <th
                  style={{
                    padding: "1rem 1.5rem",
                    textAlign: "center",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.map((emp) => (
                <tr
                  key={emp.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: emp.avatarColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {emp.avatar}
                      </div>
                      <div>
                        <div
                          style={{
                            color: "#E6F1FF",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {emp.nombre}
                        </div>
                        <div style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        color: "#E6F1FF",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {emp.departamento}
                    </div>
                    <div style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                      {emp.puesto}
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        color: "#E6F1FF",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {emp.capacitacion.completados} completados
                    </div>
                    <div style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                      {emp.capacitacion.activos} activos •{" "}
                      {emp.capacitacion.tiempoTotal}
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      {getEstadoBadge(emp.estado)}
                      <span
                        style={{
                          color: getCumplimientoColor(emp.cumplimiento),
                          fontWeight: 700,
                          fontSize: "0.95rem",
                        }}
                      >
                        {emp.cumplimiento}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ color: "#E6F1FF", fontSize: "0.9rem" }}>
                      {emp.ultimaActualizacion}
                    </div>
                  </td>
                  <td style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => setSelectedEmpleado(emp)}
                        style={{
                          background: "rgba(33,150,243,0.15)",
                          color: "#64b5f6",
                          border: "1px solid rgba(33,150,243,0.3)",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "36px",
                          height: "36px",
                          transition: "all 0.2s ease",
                        }}
                        title="Ver detalles"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(33,150,243,0.3)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(33,150,243,0.15)";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <FaEye />
                      </button>
                      <button
                        style={{
                          background: "rgba(76,175,80,0.15)",
                          color: "#81c784",
                          border: "1px solid rgba(76,175,80,0.3)",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "36px",
                          height: "36px",
                          transition: "all 0.2s ease",
                        }}
                        title="Descargar"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(76,175,80,0.3)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(76,175,80,0.15)";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
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

      {/* Modal de detalles del empleado */}
      {selectedEmpleado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "2rem",
          }}
          onClick={() => setSelectedEmpleado(null)}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #0f1825 0%, #0a0f1a 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div
              style={{
                padding: "2rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2
                  style={{
                    color: "#E6F1FF",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Expediente Completo
                </h2>
                <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
                  Información detallada de {selectedEmpleado.nombre}
                </p>
              </div>
              <button
                onClick={() => setSelectedEmpleado(null)}
                style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                padding: "0 2rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                gap: "1rem",
              }}
            >
              {[
                { id: "personal", label: "Personal" },
                { id: "capacitacion", label: "Capacitación" },
                { id: "documentos", label: "Documentos" },
                { id: "evaluaciones", label: "Evaluaciones" },
                { id: "cumplimiento", label: "Cumplimiento" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === tab.id
                        ? "3px solid #3b82f6"
                        : "3px solid transparent",
                    color: activeTab === tab.id ? "#60a5fa" : "#B7CCE9",
                    padding: "1rem 1.5rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = "#E6F1FF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = "#B7CCE9";
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenido del tab Personal */}
            {activeTab === "personal" && (
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                  }}
                >
                  <div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Nombre Completo
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.nombre}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Puesto
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.puesto}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Jefe Directo
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.jefe}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Email
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.email}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Dirección
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.direccion}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ID Empleado
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.id}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Departamento
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.departamento}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Fecha de Ingreso
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.fechaIngreso}
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Teléfono
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.telefono}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.85rem",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Contacto de Emergencia
                      </label>
                      <div
                        style={{
                          color: "#E6F1FF",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {selectedEmpleado.contactoEmergencia}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido de otros tabs */}
            {activeTab !== "personal" && (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <div
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: "12px",
                    padding: "3rem",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    📋
                  </div>
                  <h3
                    style={{
                      color: "#E6F1FF",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    Sección en desarrollo
                  </h3>
                  <p style={{ color: "#B7CCE9", margin: 0 }}>
                    La información de {activeTab} estará disponible próximamente
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expedientes;
