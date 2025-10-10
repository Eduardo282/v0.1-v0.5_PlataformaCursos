import React, { useState } from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaPlus,
  FaUserPlus,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRol, setSelectedRol] = useState("todos");
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [isDonutHovered, setIsDonutHovered] = useState(false);

  // Datos de métricas con posiciones en el círculo
  const metricsData = {
    nuevosUsuarios: {
      total: 82,
      cambio: 15,
      periodo: "Últimos 7 días",
      tipo: "incremento",
    },
    actividadReciente: [
      {
        id: 1,
        usuario: "Usuario 5",
        accion: "se registró",
        tiempo: "hace 10 minutos",
        iniciales: "U5",
        color: "#3b82f6",
        position: { top: "8%", left: "50%", transform: "translateX(-50%)" }, // Arriba centro
      },
      {
        id: 2,
        usuario: "Usuario 5",
        accion: "se registró",
        tiempo: "hace 10 minutos",
        iniciales: "U5",
        color: "#3b82f6",
        position: { top: "50%", left: "8%", transform: "translateY(-50%)" }, // Centro izquierda
      },
      {
        id: 3,
        usuario: "Usuario 3",
        accion: "actualizó de perfil",
        tiempo: "hace 3 horas",
        iniciales: "U3",
        color: "#22c55e",
        position: { bottom: "8%", left: "50%", transform: "translateX(-50%)" }, // Abajo centro
      },
      {
        id: 4,
        usuario: "Usuario 4",
        accion: "se registró",
        tiempo: "hace 4 horas",
        iniciales: "U4",
        color: "#ec4899",
        position: { top: "65%", right: "0%", transform: "translateY(-50%)" }, // Centro derecha
      },
    ],
  };

  // Estadísticas
  const stats = {
    totalUsuarios: 5,
    estudiantes: 3,
    instructores: 1,
    admins: 1,
  };

  // Datos de usuarios
  const usuarios = [
    {
      id: 1,
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      avatar: "/api/placeholder/80/80",
      iniciales: "MG",
      rol: "estudiante",
      estado: "activo",
      telefono: "+52 555 123 4567",
      registro: "1/14/2024",
      cursosCompletados: 3,
      cursosTotales: 5,
      avatarColor: "#3b82f6",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      avatar: "/api/placeholder/80/80",
      iniciales: "CR",
      rol: "instructor",
      estado: "activo",
      telefono: "+52 555 987 6543",
      registro: "9/9/2023",
      estudiantesTotales: 156,
      avatarColor: "#8b5cf6",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      avatar: "/api/placeholder/80/80",
      iniciales: "AM",
      rol: "estudiante",
      estado: "activo",
      telefono: "+52 555 456 7890",
      registro: "3/21/2024",
      cursosCompletados: 8,
      cursosTotales: 12,
      avatarColor: "#ec4899",
    },
    {
      id: 4,
      nombre: "Juan Pérez López",
      email: "juan.perez@email.com",
      avatar: "/api/placeholder/80/80",
      iniciales: "JP",
      rol: "estudiante",
      estado: "activo",
      telefono: "+52 555 234 5678",
      registro: "2/15/2024",
      cursosCompletados: 5,
      cursosTotales: 8,
      avatarColor: "#22c55e",
    },
    {
      id: 5,
      nombre: "Laura García Martínez",
      email: "laura.garcia@email.com",
      avatar: "/api/placeholder/80/80",
      iniciales: "LG",
      rol: "admin",
      estado: "activo",
      telefono: "+52 555 876 5432",
      registro: "1/1/2023",
      avatarColor: "#f59e0b",
    },
  ];

  const getRolBadge = (rol) => {
    const configs = {
      estudiante: {
        bg: "rgba(59,130,246,0.2)",
        color: "#60a5fa",
        text: "Estudiante",
      },
      instructor: {
        bg: "rgba(139,92,246,0.2)",
        color: "#a78bfa",
        text: "Instructor",
      },
      admin: { bg: "rgba(245,158,11,0.2)", color: "#fbbf24", text: "Admin" },
    };
    const config = configs[rol] || configs.estudiante;
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

  const getEstadoBadge = (estado) => {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "rgba(34,197,94,0.2)",
          color: "#4ade80",
          padding: "0.35rem 0.75rem",
          borderRadius: "12px",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        Activo
      </span>
    );
  };

  const filteredUsuarios = usuarios.filter((user) => {
    const matchSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRol = selectedRol === "todos" || user.rol === selectedRol;
    return matchSearch && matchRol;
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Botón icono de métricas */}
          <button
            onClick={() => setShowMetricsModal(true)}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              border: "1px solid rgba(59,130,246,0.4)",
              borderRadius: "12px",
              padding: "0.875rem",
              color: "white",
              fontSize: "1.25rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(59,130,246,0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(59,130,246,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(59,130,246,0.3)";
            }}
            title="Ver métricas de usuarios"
          >
            <FaUserCheck />
          </button>

          <div>
            <h1
              style={{
                color: "#E6F1FF",
                margin: 0,
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Gestión de Usuarios
            </h1>
            <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
              Administra estudiantes, instructores y administradores
            </p>
          </div>
        </div>

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
          <FaUserPlus />
          Agregar Usuario
        </button>
      </div>

      {/* Modal circular de métricas */}
      {showMetricsModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setShowMetricsModal(false)}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes scaleIn {
                from { 
                  transform: scale(0.8) rotate(-10deg);
                  opacity: 0;
                }
                to { 
                  transform: scale(1) rotate(0deg);
                  opacity: 1;
                }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
              }
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>

          {/* Contenedor principal del círculo */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "700px",
              height: "700px",
              animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setShowMetricsModal(false)}
              style={{
                position: "absolute",
                top: "-60px",
                right: "0px",
                background: "rgba(239,68,68,0.2)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f87171",
                fontSize: "1.3rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.4)";
                e.currentTarget.style.transform = "rotate(90deg) scale(1.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.2)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <FaTimes />
            </button>

            {/* Círculo exterior con borde brillante */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(236,72,153,0.3) 100%)",
                padding: "3px",
                boxShadow:
                  "0 0 60px rgba(59,130,246,0.4), 0 0 100px rgba(0,229,255,0.2)",
              }}
            >
              {/* Círculo del donut con segmentos */}
              <div
                onMouseEnter={() => setIsDonutHovered(true)}
                onMouseLeave={() => setIsDonutHovered(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `
                    conic-gradient(
                      from 0deg,
                      ${isDonutHovered ? "#f472b6" : "#ec4899"} 0deg 40deg,
                      #1e293b 40deg 90deg,
                      ${isDonutHovered ? "#f472b6" : "#ec4899"} 90deg 140deg,
                      #1e293b 140deg 180deg,
                      ${isDonutHovered ? "#f472b6" : "#ec4899"} 180deg 220deg,
                      #1e293b 220deg 270deg,
                      ${isDonutHovered ? "#f472b6" : "#ec4899"} 270deg 320deg,
                      #1e293b 320deg 360deg
                    )
                  `,
                  position: "relative",
                  boxShadow: isDonutHovered
                    ? "inset 0 0 40px rgba(0,0,0,0.6), 0 0 40px rgba(236,72,153,0.4)"
                    : "inset 0 0 40px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isDonutHovered ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Círculo interior blanco/centro */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "55%",
                    height: "55%",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(226,232,240,0.95) 0%, rgba(203,213,225,0.95) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Título "Nuevos Usuarios" */}
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1e293b",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      Nuevos Usuarios
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.85rem",
                        margin: 0,
                      }}
                    >
                      {metricsData.nuevosUsuarios.periodo}
                    </p>
                  </div>

                  {/* Número grande 82 */}
                  <div
                    style={{
                      fontSize: "5rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: "0.5rem 0",
                      lineHeight: 1,
                    }}
                  >
                    {metricsData.nuevosUsuarios.total}
                  </div>

                  {/* Badge de incremento */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "rgba(34,197,94,0.15)",
                      color: "#16a34a",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "1px solid rgba(34,197,94,0.3)",
                      marginTop: "0.5rem",
                    }}
                  >
                    <FaArrowUp style={{ fontSize: "0.75rem" }} />
                    {metricsData.nuevosUsuarios.cambio}% vs la semana pasada
                  </div>
                </div>

                {/* Actividades alrededor del círculo */}
                {metricsData.actividadReciente.map((actividad, index) => (
                  <div
                    key={actividad.id}
                    style={{
                      position: "absolute",
                      ...actividad.position,
                      pointerEvents: "none", // No recibe eventos de mouse
                      opacity: isDonutHovered ? 1 : 0,
                      transform: isDonutHovered
                        ? actividad.position.transform
                        : `${actividad.position.transform} scale(0.8)`,
                      transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(8,14,26,0.95) 0%, rgba(15,23,42,0.95) 100%)",
                        backdropFilter: "saturate(180%) blur(20px)",
                        WebkitBackdropFilter: "saturate(180%) blur(20px)",
                        border: `2px solid ${actividad.color}40`,
                        borderRadius: "14px",
                        padding: "0.5rem 0.7rem",
                        minWidth: "150px",
                        maxWidth: "160px",
                        boxShadow: `0 8px 32px ${actividad.color}30, 0 0 20px ${actividad.color}20`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {/* Avatar circular */}
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: actividad.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            flexShrink: 0,
                            boxShadow: `0 4px 12px ${actividad.color}60`,
                            border: "2px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          {actividad.iniciales}
                        </div>

                        {/* Información */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              color: "#E6F1FF",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              margin: "0 0 0.15rem 0",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {actividad.usuario}{" "}
                            <span style={{ color: "#94a3b8", fontWeight: 400 }}>
                              {actividad.accion}.
                            </span>
                          </p>
                          <p
                            style={{
                              color: actividad.color,
                              fontSize: "0.65rem",
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <FaClock style={{ fontSize: "0.6rem" }} />
                            {actividad.tiempo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
            key: "totalUsuarios",
            label: "Total Usuarios",
            icon: <FaUsers />,
            color: "#3b82f6",
            bg: "rgba(59,130,246,0.15)",
          },
          {
            key: "estudiantes",
            label: "Estudiantes",
            icon: <FaUserGraduate />,
            color: "#22c55e",
            bg: "rgba(34,197,94,0.15)",
          },
          {
            key: "instructores",
            label: "Instructores",
            icon: <FaChalkboardTeacher />,
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.15)",
          },
          {
            key: "admins",
            label: "Admins",
            icon: <FaUserShield />,
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
              {stats[stat.key]}
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
            placeholder="Buscar usuarios..."
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
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "0.875rem 1rem",
            color: "#E6F1FF",
            fontSize: "0.95rem",
            outline: "none",
            cursor: "pointer",
            minWidth: "180px",
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
          <option value="todos">Todos los roles</option>
          <option value="estudiante">Estudiantes</option>
          <option value="instructor">Instructores</option>
          <option value="admin">Administradores</option>
        </select>
      </div>

      {/* Grid de tarjetas de usuarios */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {filteredUsuarios.map((user) => (
          <div
            key={user.id}
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
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(59,130,246,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)";
            }}
          >
            {/* Header con avatar y nombre */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  background: user.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                {user.iniciales}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    color: "#E6F1FF",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "0 0 0.25rem 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.nombre}
                </h3>
                <p
                  style={{
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* Badges de rol y estado */}
            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
            >
              {getRolBadge(user.rol)}
              {getEstadoBadge(user.estado)}
            </div>

            {/* Información de contacto */}
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <FaPhone style={{ color: "#B7CCE9", fontSize: "0.85rem" }} />
                <span style={{ color: "#E6F1FF", fontSize: "0.85rem" }}>
                  {user.telefono}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <FaCalendar style={{ color: "#B7CCE9", fontSize: "0.85rem" }} />
                <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                  Registro: {user.registro}
                </span>
              </div>
            </div>

            {/* Información específica por rol */}
            {user.rol === "estudiante" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                    Cursos completados:
                  </span>
                  <span
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.cursosCompletados}/{user.cursosTotales}
                  </span>
                </div>
              </div>
            )}

            {user.rol === "instructor" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                    Estudiantes totales:
                  </span>
                  <span
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.estudiantesTotales}
                  </span>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                  border: "1px solid rgba(59,130,246,0.3)",
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
                  e.currentTarget.style.background = "rgba(59,130,246,0.3)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaEye />
              </button>

              <button
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(34,197,94,0.3)",
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
                title="Editar"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,197,94,0.3)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(34,197,94,0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaEdit />
              </button>

              <button
                style={{
                  background: "rgba(139,92,246,0.15)",
                  color: "#a78bfa",
                  border: "1px solid rgba(139,92,246,0.3)",
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
                title="Enviar email"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.3)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaEnvelope />
              </button>

              <button
                style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.3)",
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
                title="Eliminar"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.3)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuarios;
