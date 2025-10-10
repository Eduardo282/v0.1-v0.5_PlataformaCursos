import React, { useState } from "react";
import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaEye,
  FaDownload,
  FaCheck,
  FaTimes,
  FaFileImage,
  FaFileVideo,
  FaFilePdf,
  FaFilter,
  FaClipboardList,
  FaUserCheck,
  FaChartBar,
  FaFileExport,
} from "react-icons/fa";

const Evidencias = () => {
  const [selectedTab, setSelectedTab] = useState("todos");
  const [selectedEstado, setSelectedEstado] = useState("todos");
  const [dragActive, setDragActive] = useState(false);

  // Estadísticas
  const stats = {
    total: 1456,
    pendientes: 89,
    aprobadas: 1234,
    rechazadas: 133,
  };

  // Categorías de evidencia
  const categorias = [
    {
      nombre: "Evaluación",
      cantidad: 45,
      porcentaje: 35,
      color: "#3b82f6",
      icono: <FaClipboardList />,
    },
    {
      nombre: "Asistencia",
      cantidad: 32,
      porcentaje: 25,
      color: "#22c55e",
      icono: <FaUserCheck />,
    },
    {
      nombre: "Práctica",
      cantidad: 28,
      porcentaje: 22,
      color: "#f59e0b",
      icono: <FaChartBar />,
    },
    {
      nombre: "Certificado",
      cantidad: 15,
      porcentaje: 12,
      color: "#8b5cf6",
      icono: <FaCheckCircle />,
    },
    {
      nombre: "Otros",
      cantidad: 8,
      porcentaje: 6,
      color: "#6b7280",
      icono: <FaFileAlt />,
    },
  ];

  // Evidencias
  const evidencias = [
    {
      id: 1,
      titulo: "Proyecto Final NOM-035",
      descripcion: "Implementación completa del programa de riesgo psicosocial",
      curso: "Implementación NOM-035",
      estudiante: "Ana García López",
      archivo: "proyecto_nom035_final.pdf",
      tamano: "2.5 MB",
      fecha: "2/14/2024",
      estado: "aprobada",
      tipo: "pdf",
      calificacion: 95,
      retroalimentacion:
        "Retroalimentación: Excelente trabajo, cumple con todos los requisitos establecidos.",
      revisor: "Dr. Patricia Hernández",
      fechaRevision: "2/17/2024",
      categoria: "Evaluación",
    },
    {
      id: 2,
      titulo: "Video Demostración SAT",
      descripcion: "Proceso completo de facturación electrónica",
      curso: "SAT México - Facturación",
      estudiante: "Carlos Mendoza",
      archivo: "demo_facturacion.mp4",
      tamano: "45.2 MB",
      fecha: "2/9/2024",
      estado: "pendiente",
      tipo: "video",
      categoria: "Práctica",
    },
    {
      id: 3,
      titulo: "Evaluación de Riesgos",
      descripcion: "Análisis de seguridad en el área de trabajo",
      curso: "Seguridad e Higiene",
      estudiante: "María Fernández",
      archivo: "evaluacion_riesgos.jpg",
      tamano: "1.8 MB",
      fecha: "2/4/2024",
      estado: "rechazada",
      tipo: "imagen",
      retroalimentacion:
        "Retroalimentación: La evaluación no incluye todos los puntos requeridos. Favor de revisar la lista de verificación.",
      revisor: "Ing. Laura Reyes",
      fechaRevision: "2/7/2024",
      categoria: "Evaluación",
    },
  ];

  // Centro de validación
  const pendientesValidacion = [
    {
      id: 1,
      archivo: "Asistencia_SAT_MariaGonzalez.jpg",
      estudiante: "María González",
      curso: "SAT Facturación Electrónica",
      tipo: "imagen",
    },
  ];

  const estadisticasValidacion = {
    tasaAprobacion: 85,
    tiempoPromedio: "2.3 días",
    validacionesHoy: 12,
  };

  // Auditoría
  const registroActividades = [
    {
      id: 1,
      accion: "Evidencia aprobada",
      archivo: "Evaluacion_NOM035_JuanPerez.pdf",
      usuario: "Supervisor RH",
      tiempo: "Hace 2 horas",
      tipo: "aprobada",
    },
    {
      id: 2,
      accion: "Nueva evidencia subida",
      archivo: "Asistencia_SAT_MariaGonzalez.jpg",
      usuario: "María González",
      tiempo: "Hace 4 horas",
      tipo: "subida",
    },
    {
      id: 3,
      accion: "Evidencia rechazada",
      archivo: "Practica_Seguridad_CarlosRuiz.mp4",
      usuario: "Instructor Seguridad",
      tiempo: "Hace 6 horas",
      tipo: "rechazada",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Manejar archivos
      console.log("Archivos:", e.dataTransfer.files);
    }
  };

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case "pdf":
        return <FaFilePdf />;
      case "video":
        return <FaFileVideo />;
      case "imagen":
        return <FaFileImage />;
      default:
        return <FaFileAlt />;
    }
  };

  const getEstadoBadge = (estado) => {
    const configs = {
      aprobada: {
        bg: "rgba(34,197,94,0.2)",
        color: "#4ade80",
        text: "Aprobada",
        icon: <FaCheckCircle />,
      },
      pendiente: {
        bg: "rgba(245,158,11,0.2)",
        color: "#fbbf24",
        text: "Pendiente",
        icon: <FaClock />,
      },
      rechazada: {
        bg: "rgba(239,68,68,0.2)",
        color: "#f87171",
        text: "Rechazada",
        icon: <FaTimesCircle />,
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

  const filteredEvidencias = evidencias.filter((ev) => {
    const matchTab =
      selectedTab === "todos" ||
      (selectedTab === "documentos" && ev.tipo === "pdf") ||
      (selectedTab === "imagenes" && ev.tipo === "imagen") ||
      (selectedTab === "videos" && ev.tipo === "video");
    const matchEstado =
      selectedEstado === "todos" || ev.estado === selectedEstado;
    return matchTab && matchEstado;
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
          Gestión de Evidencias
        </h1>
        <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
          Administra y revisa las evidencias de aprendizaje de los estudiantes
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
            key: "total",
            label: "Total Evidencias",
            icon: <FaFileAlt />,
            color: "#3b82f6",
            bg: "rgba(59,130,246,0.15)",
          },
          {
            key: "pendientes",
            label: "Pendientes",
            icon: <FaClock />,
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.15)",
          },
          {
            key: "aprobadas",
            label: "Aprobadas",
            icon: <FaCheckCircle />,
            color: "#22c55e",
            bg: "rgba(34,197,94,0.15)",
          },
          {
            key: "rechazadas",
            label: "Rechazadas",
            icon: <FaTimesCircle />,
            color: "#ef4444",
            bg: "rgba(239,68,68,0.15)",
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

      {/* Zona de subida de archivos */}
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
        }}
      >
        <h3
          style={{
            color: "#E6F1FF",
            fontSize: "1.1rem",
            fontWeight: 700,
            margin: "0 0 1rem 0",
          }}
        >
          Subir Nueva Evidencia
        </h3>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? "#3b82f6" : "rgba(255,255,255,0.2)"}`,
            borderRadius: "12px",
            padding: "3rem",
            textAlign: "center",
            background: dragActive
              ? "rgba(59,130,246,0.05)"
              : "rgba(255,255,255,0.03)",
            transition: "all 0.3s ease",
          }}
        >
          <FaUpload
            style={{ fontSize: "3rem", color: "#B7CCE9", marginBottom: "1rem" }}
          />
          <h4
            style={{
              color: "#E6F1FF",
              fontSize: "1.1rem",
              margin: "0 0 0.5rem 0",
            }}
          >
            Arrastra archivos aquí o haz clic para seleccionar
          </h4>
          <p
            style={{
              color: "#B7CCE9",
              fontSize: "0.9rem",
              margin: "0 0 1.5rem 0",
            }}
          >
            Soporta documentos PDF, imágenes JPG/PNG y videos MP4 (máx. 100MB)
          </p>
          <button
            style={{
              background: "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
              border: "1px solid rgba(33,118,189,0.4)",
              borderRadius: "12px",
              padding: "0.875rem 2rem",
              color: "white",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(33,118,189,0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
            Seleccionar Archivos
          </button>
        </div>
      </div>

      {/* Categorías de Evidencia */}
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
          Categorías de Evidencia
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {categorias.map((cat, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "1.25rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "3px",
                      background: cat.color,
                    }}
                  />
                  <span
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {cat.nombre}
                  </span>
                </div>
                <span
                  style={{
                    color: "#E6F1FF",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {cat.cantidad}
                </span>
              </div>

              <div style={{ marginBottom: "0.5rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${cat.porcentaje}%`,
                      height: "100%",
                      background: cat.color,
                      borderRadius: "4px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                  {cat.cantidad} archivos
                </span>
                <span style={{ color: "#B7CCE9", fontSize: "0.8rem" }}>
                  {cat.porcentaje}%
                </span>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "0.6rem",
                  color: "#E6F1FF",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                Ver Archivos
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros y Lista de Evidencias */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "2rem",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 24px rgba(0,229,255,0.06)",
        }}
      >
        {/* Tabs y filtros */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            {["todos", "documentos", "imagenes", "videos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  background:
                    selectedTab === tab
                      ? "rgba(59,130,246,0.2)"
                      : "transparent",
                  border:
                    selectedTab === tab
                      ? "1px solid rgba(59,130,246,0.4)"
                      : "1px solid transparent",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  color: selectedTab === tab ? "#60a5fa" : "#B7CCE9",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== tab) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== tab) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <FaFilter style={{ color: "#B7CCE9", fontSize: "1rem" }} />
            <select
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
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
              <option value="todos">Todos los estados</option>
              <option value="aprobada">Aprobadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="rechazada">Rechazadas</option>
            </select>
          </div>
        </div>

        {/* Lista de evidencias */}
        <div style={{ padding: "2rem" }}>
          <h3
            style={{
              color: "#E6F1FF",
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Evidencias ({filteredEvidencias.length})
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {filteredEvidencias.map((ev) => (
              <div
                key={ev.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {/* Header de la evidencia */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", flex: 1 }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        background: "rgba(59,130,246,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#60a5fa",
                        fontSize: "1.5rem",
                      }}
                    >
                      {getIconoTipo(ev.tipo)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h4
                          style={{
                            color: "#E6F1FF",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          {ev.titulo}
                        </h4>
                        {getEstadoBadge(ev.estado)}
                      </div>
                      <p
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.9rem",
                          margin: "0 0 0.75rem 0",
                        }}
                      >
                        {ev.descripcion}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "1.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ color: "#7eeaff", fontSize: "0.85rem" }}>
                          <strong>Curso:</strong> {ev.curso}
                        </span>
                        <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                          <strong>Estudiante:</strong> {ev.estudiante}
                        </span>
                        <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                          <strong>Archivo:</strong> {ev.archivo}
                        </span>
                        <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                          <strong>Tamaño:</strong> {ev.tamano}
                        </span>
                        <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                          <strong>Subido:</strong> {ev.fecha}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
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
                      title="Ver evidencia"
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
                </div>

                {/* Calificación (si está aprobada) */}
                {ev.estado === "aprobada" && ev.calificacion && (
                  <div
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        color: "#4ade80",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      Calificación: {ev.calificacion}%
                    </div>
                  </div>
                )}

                {/* Retroalimentación */}
                {ev.retroalimentacion && (
                  <div
                    style={{
                      background:
                        ev.estado === "rechazada"
                          ? "rgba(239,68,68,0.1)"
                          : "rgba(255,255,255,0.03)",
                      border: `1px solid ${ev.estado === "rechazada" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <p
                      style={{
                        color: "#E6F1FF",
                        fontSize: "0.85rem",
                        margin: 0,
                      }}
                    >
                      {ev.retroalimentacion}
                    </p>
                    {ev.revisor && (
                      <p
                        style={{
                          color: "#B7CCE9",
                          fontSize: "0.8rem",
                          margin: "0.5rem 0 0 0",
                        }}
                      >
                        Revisado por {ev.revisor} el {ev.fechaRevision}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centro de Validación y Auditoría */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Centro de Validación */}
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
              margin: "0 0 0.5rem 0",
            }}
          >
            Centro de Validación
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                color: "#B7CCE9",
                fontSize: "0.9rem",
                fontWeight: 600,
                margin: "0 0 1rem 0",
              }}
            >
              Archivos Pendientes de Validación
            </h4>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                margin: "0 0 1rem 0",
              }}
            >
              Evidencias que requieren revisión
            </p>

            {pendientesValidacion.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(34,197,94,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                      fontSize: "1.2rem",
                    }}
                  >
                    {getIconoTipo(item.tipo)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5
                      style={{
                        color: "#E6F1FF",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {item.archivo}
                    </h5>
                    <p
                      style={{
                        color: "#B7CCE9",
                        fontSize: "0.8rem",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {item.estudiante} - {item.curso}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      flex: 1,
                      background: "rgba(34,197,94,0.15)",
                      color: "#4ade80",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(34,197,94,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(34,197,94,0.15)";
                    }}
                  >
                    Aprobar
                  </button>
                  <button
                    style={{
                      flex: 1,
                      background: "rgba(239,68,68,0.15)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(239,68,68,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                    }}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4
              style={{
                color: "#B7CCE9",
                fontSize: "0.9rem",
                fontWeight: 600,
                margin: "0 0 1rem 0",
              }}
            >
              Estadísticas de Validación
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                  Tasa de Aprobación
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flex: 1,
                    marginLeft: "1rem",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "8px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${estadisticasValidacion.tasaAprobacion}%`,
                        height: "100%",
                        background: "#22c55e",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 700,
                      minWidth: "40px",
                    }}
                  >
                    {estadisticasValidacion.tasaAprobacion}%
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                  Tiempo Promedio de Validación
                </span>
                <span style={{ color: "#E6F1FF", fontWeight: 700 }}>
                  {estadisticasValidacion.tiempoPromedio}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                  Validaciones Hoy
                </span>
                <span style={{ color: "#E6F1FF", fontWeight: 700 }}>
                  {estadisticasValidacion.validacionesHoy}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Auditoría de Evidencias */}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#E6F1FF",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Auditoría de Evidencias
              </h3>
              <h4
                style={{
                  color: "#B7CCE9",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  margin: "0.5rem 0 0 0",
                }}
              >
                Registro de Actividades
              </h4>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.8rem",
                  margin: "0.25rem 0 0 0",
                }}
              >
                Historial completo de acciones sobre evidencias
              </p>
            </div>
            <button
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem 1.25rem",
                color: "#E6F1FF",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaFileExport />
              Exportar Todo
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {registroActividades.map((act) => (
              <div
                key={act.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginTop: "0.25rem",
                    background:
                      act.tipo === "aprobada"
                        ? "#22c55e"
                        : act.tipo === "rechazada"
                          ? "#ef4444"
                          : "#3b82f6",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h5
                    style={{
                      color: "#E6F1FF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {act.accion}: {act.archivo}
                  </h5>
                  <p
                    style={{ color: "#B7CCE9", fontSize: "0.8rem", margin: 0 }}
                  >
                    Por {act.usuario} - {act.tiempo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evidencias;
