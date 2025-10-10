import React, { useState } from "react";
import {
  FaCertificate,
  FaDownload,
  FaEye,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaEdit,
  FaFileAlt,
  FaAward,
  FaUserGraduate,
  FaCopy,
  FaFilter,
} from "react-icons/fa";

const Certificaciones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterType, setFilterType] = useState("todos");
  const [verificationCode, setVerificationCode] = useState("");
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Datos de certificaciones emitidas
  const certificaciones = [
    {
      id: 1,
      nombre: "Ana García López",
      codigo: "CERT-NOM035-2024-001",
      curso: "Implementación NOM-035",
      categoria: "STPS Reconocido",
      fechaEmision: "1/14/2024",
      fechaVencimiento: "1/14/2026",
      estado: "activo",
      calificacion: 95,
      instructor: "Ing. Pedro Martín",
      duracion: "20 horas",
      tipo: "stps",
    },
    {
      id: 2,
      nombre: "Carlos Mendoza",
      codigo: "CERT-SAT-2024-002",
      curso: "SAT México - Facturación",
      categoria: "STPS Reconocido",
      fechaEmision: "1/31/2024",
      fechaVencimiento: "1/31/2025",
      estado: "activo",
      calificacion: 88,
      instructor: "Lic. María Rodríguez",
      duracion: "15 horas",
      tipo: "interno",
    },
    {
      id: 3,
      nombre: "María Fernández",
      codigo: "CERT-SEG-2023-003",
      curso: "Seguridad e Higiene",
      categoria: "STPS Reconocido",
      fechaEmision: "6/14/2023",
      fechaVencimiento: "6/14/2024",
      estado: "vencido",
      calificacion: 92,
      instructor: "Dr. Juan Pérez",
      duracion: "25 horas",
      tipo: "stps",
    },
  ];

  // Plantillas de certificados
  const plantillas = [
    {
      id: 1,
      nombre: "Certificado NOM-035",
      descripcion: "Plantilla oficial para certificación NOM-035",
    },
    {
      id: 2,
      nombre: "Certificado SAT",
      descripcion: "Plantilla para certificación fiscal",
    },
  ];

  // Estadísticas
  const stats = {
    total: 1247,
    activos: 1156,
    porVencer: 67,
    stpsReconocidos: 892,
    emitidosEsteMes: 156,
    emitidosHistorico: 2847,
  };

  const filteredCertificaciones = certificaciones.filter((cert) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      cert.nombre.toLowerCase().includes(term) ||
      cert.curso.toLowerCase().includes(term) ||
      cert.codigo.toLowerCase().includes(term);
    const matchesStatus =
      filterStatus === "todos" || cert.estado === filterStatus;
    const matchesType = filterType === "todos" || cert.tipo === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleVerifyCertificate = () => {
    if (verificationCode.trim()) {
      alert(`Verificando certificado: ${verificationCode}`);
    }
  };

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    setShowCertificateModal(true);
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              Gestión de Certificaciones
            </h1>
            <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
              Administra y verifica certificados de capacitación
            </p>
          </div>
          <button
            style={{
              background: "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
              border: "1px solid rgba(33,118,189,0.4)",
              borderRadius: "12px",
              padding: "0.875rem 1.75rem",
              color: "white",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
            <FaPlus />
            Nueva Certificación
          </button>
        </div>
      </div>

      {/* Sección de dos columnas: métricas y plantillas con estilo DashboardAdmin */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Columna izquierda: Certificaciones Emitidas */}
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
              margin: 0,
              marginBottom: "1rem",
            }}
          >
            Certificaciones Emitidas
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              rowGap: "0.75rem",
            }}
          >
            <span style={{ color: "#B7CCE9" }}>Este mes:</span>
            <span style={{ color: "#E6F1FF", fontWeight: 700 }}>
              {stats.emitidosEsteMes}
            </span>
            <span style={{ color: "#B7CCE9" }}>Total histórico:</span>
            <span style={{ color: "#E6F1FF", fontWeight: 700 }}>
              {stats.emitidosHistorico.toLocaleString()}
            </span>
          </div>
          <button
            style={{
              marginTop: "1rem",
              width: "100%",
              background: "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
              color: "white",
              border: "1px solid rgba(33,118,189,0.4)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
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
            Ver Todas las Certificaciones
          </button>
        </div>

        {/* Columna derecha: Plantillas de Certificados */}
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
              margin: 0,
              marginBottom: "1rem",
            }}
          >
            Plantillas de Certificados
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {plantillas.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "0.875rem",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: "#E6F1FF",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {p.nombre}
                </h4>
                <p
                  style={{
                    margin: "0.25rem 0 0.75rem",
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                  }}
                >
                  {p.descripcion}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#E6F1FF",
                      borderRadius: "8px",
                      padding: "0.5rem 0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#E6F1FF",
                      borderRadius: "8px",
                      padding: "0.5rem 0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Vista Previa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas con estilo DashboardAdmin */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {[
            {
              label: "Total Certificados",
              value: stats.total,
              icon: <FaCertificate />,
              color: "#3b82f6",
            },
            {
              label: "Activos",
              value: stats.activos,
              icon: <FaCheckCircle />,
              color: "#22c55e",
            },
            {
              label: "Por Vencer",
              value: stats.porVencer,
              icon: <FaClock />,
              color: "#f59e0b",
            },
            {
              label: "STPS Reconocidos",
              value: stats.stpsReconocidos,
              icon: <FaAward />,
              color: "#8b5cf6",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 20px ${stat.color}40`;
                e.currentTarget.style.borderColor = `${stat.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${stat.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                  fontSize: "1.2rem",
                }}
              >
                {stat.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#E6F1FF",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {stat.value.toLocaleString()}
                </span>
                <span
                  style={{
                    color: "#B7CCE9",
                    fontSize: "0.8rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de búsqueda y filtros con estilo DashboardAdmin */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "1rem 1.5rem",
          marginBottom: "1.5rem",
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
            placeholder="Buscar por curso, estudiante o número de certificado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
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
          <option value="todos">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="por_vencer">Por Vencer</option>
          <option value="vencido">Vencidos</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
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
          <option value="todos">Todos los tipos</option>
          <option value="stps">STPS Reconocido</option>
          <option value="interno">Interno</option>
        </select>
      </div>

      {/* Verificación de Certificados con estilo DashboardAdmin */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(8,14,26,0.75) 0%, rgba(8,14,26,0.55) 100%)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Ingresa el código de verificación..."
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            padding: "0.875rem 1rem",
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
        <button
          onClick={handleVerifyCertificate}
          style={{
            background: "linear-gradient(135deg, #2176bd 0%, #1565c0 100%)",
            border: "1px solid rgba(33,118,189,0.4)",
            borderRadius: "10px",
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
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(33,118,189,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(33,118,189,0.3)";
          }}
        >
          Verificar Certificado
        </button>
      </div>

      {/* Tabla de Certificados Emitidos con estilo DashboardAdmin */}
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
          <h2
            style={{
              color: "#E6F1FF",
              margin: 0,
              fontSize: "1.3rem",
              fontWeight: 700,
            }}
          >
            Certificados Emitidos
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                CERTIFICADO
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                ESTUDIANTE
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                FECHA EMISIÓN
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                VENCIMIENTO
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                ESTADO
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                CALIFICACIÓN
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificaciones.map((cert) => (
              <tr
                key={cert.id}
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
                <td style={{ padding: "1rem" }}>
                  <div
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {cert.curso}
                  </div>
                  <div style={{ color: "#7eeaff", fontSize: "0.8rem" }}>
                    {cert.codigo}
                  </div>
                  <div
                    style={{
                      color: "#9c27b0",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {cert.categoria}
                  </div>
                </td>
                <td style={{ padding: "1rem", color: "#B7CCE9" }}>
                  {cert.nombre}
                </td>
                <td style={{ padding: "1rem", color: "#B7CCE9" }}>
                  {cert.fechaEmision}
                </td>
                <td style={{ padding: "1rem", color: "#B7CCE9" }}>
                  {cert.fechaVencimiento}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background:
                        cert.estado === "activo"
                          ? "rgba(76,175,80,0.2)"
                          : cert.estado === "por_vencer"
                            ? "rgba(255,152,0,0.2)"
                            : "rgba(244,67,54,0.2)",
                      color:
                        cert.estado === "activo"
                          ? "#81c784"
                          : cert.estado === "por_vencer"
                            ? "#ffb74d"
                            : "#e57373",
                      border:
                        cert.estado === "activo"
                          ? "1px solid rgba(76,175,80,0.4)"
                          : cert.estado === "por_vencer"
                            ? "1px solid rgba(255,152,0,0.4)"
                            : "1px solid rgba(244,67,54,0.4)",
                    }}
                  >
                    {getStatusIcon(cert.estado)}
                    {getStatusText(cert.estado)}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
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
                          width: `${cert.calificacion}%`,
                          height: "100%",
                          background:
                            cert.calificacion >= 90
                              ? "#4caf50"
                              : cert.calificacion >= 70
                                ? "#ff9800"
                                : "#f44336",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "#E6F1FF",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        minWidth: "45px",
                      }}
                    >
                      {cert.calificacion}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: "1rem", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => handleViewCertificate(cert)}
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
                      title="Ver certificado"
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
                      title="Descargar PDF"
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

      {/* Modal de Certificado */}
      {showCertificateModal && selectedCertificate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowCertificateModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "20px",
              padding: "3rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "2.5rem",
                  color: "#667eea",
                }}
              >
                <FaAward />
              </div>
              <h2
                style={{
                  color: "white",
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
              >
                Certificado de Finalización
              </h2>
              <h3
                style={{
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
              >
                {selectedCertificate.curso}
              </h3>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  Instructor:
                </span>
                <p
                  style={{
                    color: "white",
                    margin: "0.25rem 0 0 0",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedCertificate.instructor}
                </p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  Fecha:
                </span>
                <p
                  style={{
                    color: "white",
                    margin: "0.25rem 0 0 0",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedCertificate.fechaEmision}
                </p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  Calificación:
                </span>
                <p
                  style={{
                    color: "white",
                    margin: "0.25rem 0 0 0",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedCertificate.calificacion}/100
                </p>
              </div>
              <div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                  }}
                >
                  Duración:
                </span>
                <p
                  style={{
                    color: "white",
                    margin: "0.25rem 0 0 0",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedCertificate.duracion}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  flex: 1,
                  background: "#0e1223",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  padding: "1rem",
                  color: "white",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a1f35";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0e1223";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <FaDownload />
                Descargar
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                  padding: "1rem",
                  color: "white",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "50px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificaciones;
