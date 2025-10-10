import React, { useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaShieldAlt,
  FaHeartbeat,
  FaGraduationCap,
  FaFolderOpen,
  FaUsers,
  FaCalendarAlt,
  FaDownload,
  FaExclamationCircle,
  FaChartLine,
  FaClipboardList,
  FaSearch,
  FaBell,
  FaSync,
} from "react-icons/fa";

const CumplimientoSTPS = () => {
  const [selectedCategoria, setSelectedCategoria] = useState("todas");
  const [selectedPrioridad, setSelectedPrioridad] = useState("todas");
  const [activeTab, setActiveTab] = useState("resumen");

  // Estadísticas principales
  const stats = {
    totalRequisitos: 4,
    cumpliendo: 2,
    pendientes: 1,
    vencidos: 1,
    scoreGeneral: 50,
  };

  // Estadísticas de la tercera imagen
  const statsDetalladas = {
    cumplimientoGeneral: 85,
    normativasActivas: 12,
    empleadosCapacitados: 330,
    proximosVencimientos: 3,
  };

  // Progreso por categoría
  const categorias = [
    { nombre: "Seguridad", progreso: 75, color: "#3b82f6" },
    { nombre: "Salud", progreso: 60, color: "#22c55e" },
    { nombre: "Capacitación", progreso: 90, color: "#8b5cf6" },
    { nombre: "Documentación", progreso: 85, color: "#f59e0b" },
  ];

  // Próximos vencimientos
  const proximosVencimientos = [
    {
      id: 1,
      nombre: "NOM-030-STPS",
      descripcion: "Servicios preventivos",
      estado: "vencido",
      dias: "Vencido",
      color: "#ef4444",
    },
    {
      id: 2,
      nombre: "NOM-019-STPS",
      descripcion: "Comisiones de seguridad",
      estado: "pendiente",
      dias: "120 días",
      color: "#f59e0b",
    },
    {
      id: 3,
      nombre: "NOM-035-STPS",
      descripcion: "Riesgo psicosocial",
      estado: "completo",
      dias: "300 días",
      color: "#22c55e",
    },
  ];

  // Requisitos de cumplimiento
  const requisitos = [
    {
      id: "NOM-035-STPS-2018",
      nombre: "Factores de riesgo psicosocial en el trabajo",
      categoria: "Seguridad",
      estado: "cumple",
      prioridad: "alta",
      fechaLimite: "12/30/2024",
      fechaCompletado: "1/14/2024",
      empleadosAfectados: 245,
      evidencia: true,
    },
    {
      id: "NOM-019-STPS-2011",
      nombre:
        "Constitución, integración, organización y funcionamiento de las comisiones de seguridad e higiene",
      categoria: "Seguridad",
      estado: "pendiente",
      prioridad: "media",
      fechaLimite: "6/29/2024",
      empleadosAfectados: 245,
      evidencia: false,
    },
    {
      id: "NOM-030-STPS-2009",
      nombre: "Servicios preventivos de seguridad y salud en el trabajo",
      categoria: "Salud",
      estado: "vencido",
      prioridad: "critica",
      fechaLimite: "2/14/2024",
      empleadosAfectados: 245,
      evidencia: false,
    },
    {
      id: "Capacitación en Seguridad",
      nombre: "Programa anual de capacitación en seguridad y salud ocupacional",
      categoria: "Capacitación",
      estado: "cumple",
      prioridad: "alta",
      fechaLimite: "12/30/2024",
      fechaCompletado: "1/31/2024",
      empleadosAfectados: 245,
      evidencia: true,
    },
  ];

  // Estado por normativa (para la tercera imagen)
  const estadoPorNormativa = [
    { nombre: "NOM-035", progreso: 92, label: "Cumpliendo" },
    { nombre: "NOM-019", progreso: 68, label: "Cumpliendo" },
  ];

  // Próximas obligaciones (para la tercera imagen)
  const proximasObligaciones = [
    {
      nombre: "Renovación Certificado NOM-035",
      fecha: "Vence: 2024-10-15",
      estado: "alta",
      estadoSecundario: "pendiente",
    },
    {
      nombre: "Actualización Comisión Seguridad",
      fecha: "Vence: 2024-11-01",
      prioridad: "media",
      estado: "enProgreso",
    },
  ];

  const getEstadoBadge = (estado) => {
    const configs = {
      cumple: {
        bg: "rgba(34,197,94,0.2)",
        color: "#4ade80",
        text: "Cumple",
        icon: <FaCheckCircle />,
      },
      pendiente: {
        bg: "rgba(245,158,11,0.2)",
        color: "#fbbf24",
        text: "Pendiente",
        icon: <FaClock />,
      },
      vencido: {
        bg: "rgba(239,68,68,0.2)",
        color: "#f87171",
        text: "Vencido",
        icon: <FaExclamationTriangle />,
      },
    };
    const config = configs[estado] || configs.pendiente;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: config.bg,
          color: config.color,
          padding: "0.35rem 0.75rem",
          borderRadius: "12px",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getPrioridadBadge = (prioridad) => {
    const configs = {
      critica: { bg: "rgba(239,68,68,0.2)", color: "#f87171", text: "Crítica" },
      alta: { bg: "rgba(245,158,11,0.2)", color: "#fbbf24", text: "Alta" },
      media: { bg: "rgba(59,130,246,0.2)", color: "#60a5fa", text: "Media" },
      baja: { bg: "rgba(156,163,175,0.2)", color: "#9ca3af", text: "Baja" },
    };
    const config = configs[prioridad] || configs.media;
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

  const getCategoriaIcon = (categoria) => {
    const icons = {
      Seguridad: <FaShieldAlt />,
      Salud: <FaHeartbeat />,
      Capacitación: <FaGraduationCap />,
      Documentación: <FaFolderOpen />,
    };
    return icons[categoria] || <FaFileAlt />;
  };

  const filteredRequisitos = requisitos.filter((req) => {
    const matchCategoria =
      selectedCategoria === "todas" || req.categoria === selectedCategoria;
    const matchPrioridad =
      selectedPrioridad === "todas" || req.prioridad === selectedPrioridad;
    return matchCategoria && matchPrioridad;
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
      {/* Banner de alerta */}
      <div
        style={{
          background: "rgba(245,158,11,0.15)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FaExclamationCircle style={{ color: "#fbbf24", fontSize: "1.5rem" }} />
        <div style={{ flex: 1 }}>
          <span style={{ color: "#E6F1FF", fontWeight: 600 }}>
            Atención Requerida
          </span>
          <p
            style={{
              color: "#B7CCE9",
              margin: "0.25rem 0 0 0",
              fontSize: "0.9rem",
            }}
          >
            Tienes 3 obligaciones próximas a vencer en los próximos 30 días.{" "}
            <a
              href="#"
              style={{ color: "#fbbf24", textDecoration: "underline" }}
            >
              Ver detalles
            </a>
          </p>
        </div>
      </div>

      {/* Header principal */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
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
              Cumplimiento STPS
            </h1>
            <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
              Monitoreo y gestión del cumplimiento de normativas de la
              Secretaría del Trabajo y Previsión Social
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Actualizar Estado"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <FaSync />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Reporte Cumplimiento"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <FaDownload />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Consultar Alertas"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <FaBell />
            </button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
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
            key: "cumplimientoGeneral",
            label: "Cumplimiento General",
            value: `${statsDetalladas.cumplimientoGeneral}%`,
            subtext: "+2% vs mes anterior",
            icon: <FaChartLine />,
            color: "#22c55e",
            bg: "rgba(34,197,94,0.15)",
          },
          {
            key: "normativasActivas",
            label: "Normativas Activas",
            value: statsDetalladas.normativasActivas,
            subtext: "5 próximas",
            icon: <FaClipboardList />,
            color: "#3b82f6",
            bg: "rgba(59,130,246,0.15)",
          },
          {
            key: "empleadosCapacitados",
            label: "Empleados Capacitados",
            value: statsDetalladas.empleadosCapacitados,
            subtext: "de 330 requeridos",
            icon: <FaUsers />,
            color: "#8b5cf6",
            bg: "rgba(139,92,246,0.15)",
          },
          {
            key: "proximosVencimientos",
            label: "Próximos Vencimientos",
            value: statsDetalladas.proximosVencimientos,
            subtext: "En 30 días",
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
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#E6F1FF",
                marginBottom: "0.25rem",
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs de navegación */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "1rem 2rem",
          marginBottom: "2rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
          display: "flex",
          gap: "1rem",
        }}
      >
        {[
          { id: "resumen", label: "Resumen" },
          { id: "normativas", label: "Normativas" },
          { id: "obligaciones", label: "Obligaciones" },
          { id: "inspecciones", label: "Inspecciones" },
          { id: "calendario", label: "Calendario" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background:
                activeTab === tab.id ? "rgba(59,130,246,0.2)" : "transparent",
              border:
                activeTab === tab.id
                  ? "1px solid rgba(59,130,246,0.4)"
                  : "1px solid transparent",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              color: activeTab === tab.id ? "#60a5fa" : "#B7CCE9",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab Resumen */}
      {activeTab === "resumen" && (
        <>
          {/* Sección de dos columnas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {/* Progreso de Cumplimiento por Categoría */}
            <div
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
              }}
            >
              <h3
                style={{
                  color: "#E6F1FF",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  margin: "0 0 1.5rem 0",
                }}
              >
                Progreso de Cumplimiento por Categoría
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {categorias.map((cat, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "2px",
                            background: cat.color,
                          }}
                        />
                        <span
                          style={{
                            color: "#E6F1FF",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                          }}
                        >
                          {cat.nombre}
                        </span>
                      </div>
                      <span
                        style={{
                          color: "#E6F1FF",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                        }}
                      >
                        {cat.progreso}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "12px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${cat.progreso}%`,
                          height: "100%",
                          background: cat.color,
                          borderRadius: "6px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos Vencimientos */}
            <div
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
              }}
            >
              <h3
                style={{
                  color: "#E6F1FF",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  margin: "0 0 1.5rem 0",
                }}
              >
                Próximos Vencimientos
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {proximosVencimientos.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      padding: "1rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    <div style={{ marginBottom: "0.5rem" }}>
                      <h4
                        style={{
                          color: "#E6F1FF",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {item.nombre}
                      </h4>
                      <p
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.8rem",
                          margin: "0.25rem 0 0 0",
                        }}
                      >
                        {item.descripcion}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: item.color,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.dias}
                      </span>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Estado por Normativa */}
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
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
            }}
          >
            <h3
              style={{
                color: "#E6F1FF",
                fontSize: "1.2rem",
                fontWeight: 700,
                margin: "0 0 0.5rem 0",
              }}
            >
              Estado por Normativa
            </h3>
            <p
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                margin: "0 0 1.5rem 0",
              }}
            >
              Nivel de cumplimiento actual
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {estadoPorNormativa.map((norm, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#E6F1FF",
                          fontWeight: 700,
                          fontSize: "1rem",
                        }}
                      >
                        {norm.nombre}
                      </span>
                      <span
                        style={{
                          marginLeft: "1rem",
                          background: "rgba(34,197,94,0.2)",
                          color: "#4ade80",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {norm.label}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#E6F1FF",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      {norm.progreso}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${norm.progreso}%`,
                        height: "100%",
                        background: "#22c55e",
                        borderRadius: "5px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas Obligaciones */}
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
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
            }}
          >
            <h3
              style={{
                color: "#E6F1FF",
                fontSize: "1.2rem",
                fontWeight: 700,
                margin: "0 0 0.5rem 0",
              }}
            >
              Próximas Obligaciones
            </h3>
            <p
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                margin: "0 0 1.5rem 0",
              }}
            >
              Tareas críticas por cumplir
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {proximasObligaciones.map((obl, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div>
                    <h4
                      style={{
                        color: "#E6F1FF",
                        fontSize: "1rem",
                        fontWeight: 700,
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {obl.nombre}
                    </h4>
                    <p
                      style={{
                        color: "#B7CCE9",
                        fontSize: "0.85rem",
                        margin: 0,
                      }}
                    >
                      {obl.fecha}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {obl.estado === "alta" && (
                      <span
                        style={{
                          background: "rgba(239,68,68,0.2)",
                          color: "#f87171",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        Alta
                      </span>
                    )}
                    {obl.estadoSecundario === "pendiente" && (
                      <span
                        style={{
                          background: "rgba(245,158,11,0.2)",
                          color: "#fbbf24",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        Pendiente
                      </span>
                    )}
                    {obl.prioridad === "media" && (
                      <span
                        style={{
                          background: "rgba(59,130,246,0.2)",
                          color: "#60a5fa",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        Media
                      </span>
                    )}
                    {obl.estado === "enProgreso" && (
                      <span
                        style={{
                          background: "rgba(34,197,94,0.2)",
                          color: "#4ade80",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        En Progreso
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filtros y tabla de requisitos */}
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
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
            }}
          >
            {/* Filtros */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Categoría
                </label>
                <select
                  value={selectedCategoria}
                  onChange={(e) => setSelectedCategoria(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    color: "#E6F1FF",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer",
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
                  <option value="todas">Todas las categorías</option>
                  <option value="Seguridad">Seguridad</option>
                  <option value="Salud">Salud</option>
                  <option value="Capacitación">Capacitación</option>
                  <option value="Documentación">Documentación</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Prioridad
                </label>
                <select
                  value={selectedPrioridad}
                  onChange={(e) => setSelectedPrioridad(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    color: "#E6F1FF",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer",
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
                  <option value="todas">Todas las prioridades</option>
                  <option value="critica">Crítica</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>

              <button
                style={{
                  marginTop: "1.5rem",
                  background:
                    "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
                  border: "1px solid rgba(33,118,189,0.4)",
                  borderRadius: "12px",
                  padding: "0.875rem 2rem",
                  color: "white",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(33,118,189,0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(33,118,189,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(33,118,189,0.3)";
                }}
              >
                Generar Reporte de Cumplimiento
              </button>
            </div>

            <h3
              style={{
                color: "#E6F1FF",
                fontSize: "1.2rem",
                fontWeight: 700,
                margin: "0 0 1.5rem 0",
              }}
            >
              Requisitos de Cumplimiento STPS
            </h3>

            {/* Tabla de requisitos */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
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
                      Requisito
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
                      Categoría
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
                      Estado
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
                      Prioridad
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
                      Fecha Límite
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
                      Empleados Afectados
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
                      Evidencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequisitos.map((req) => (
                    <tr
                      key={req.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "1.25rem 1.5rem" }}>
                        <div
                          style={{
                            color: "#E6F1FF",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {req.id}
                        </div>
                        <div style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                          {req.nombre}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(59,130,246,0.15)",
                            color: "#60a5fa",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          {getCategoriaIcon(req.categoria)}
                          {req.categoria}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {getEstadoBadge(req.estado)}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {getPrioridadBadge(req.prioridad)}
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
                          {req.fechaLimite}
                        </div>
                        {req.fechaCompletado && (
                          <div style={{ color: "#4ade80", fontSize: "0.8rem" }}>
                            Completado: {req.fechaCompletado}
                          </div>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#E6F1FF",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          <FaUsers style={{ color: "#B7CCE9" }} />
                          {req.empleadosAfectados}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {req.evidencia ? (
                          <FaCheckCircle
                            style={{ color: "#4ade80", fontSize: "1.25rem" }}
                          />
                        ) : (
                          <FaClock
                            style={{ color: "#fbbf24", fontSize: "1.25rem" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Otros tabs con placeholder */}
      {activeTab !== "resumen" && (
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
            backdropFilter: "saturate(160%) blur(12px)",
            WebkitBackdropFilter: "saturate(160%) blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
            boxShadow:
              "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "12px",
              padding: "3rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
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
  );
};

export default CumplimientoSTPS;
