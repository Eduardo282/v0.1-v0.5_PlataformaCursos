import React, { useState } from "react";
import {
  FaFileExport,
  FaFileDownload,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaTrophy,
  FaStar,
  FaEye,
  FaDownload,
  FaBookOpen,
  FaUserGraduate,
  FaChartBar,
  FaClock,
  FaAward,
} from "react-icons/fa";

const ReportesMetricas = () => {
  const [reportType, setReportType] = useState("capacitacion");
  const [period, setPeriod] = useState("mes");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Datos de métricas principales
  const metricsData = {
    cursosCompletados: {
      value: 1247,
      change: "+12% vs mes anterior",
      trend: "up",
    },
    estudiantesActivos: {
      value: 892,
      change: "+8% vs mes anterior",
      trend: "up",
    },
    tasaFinalizacion: {
      value: "87.5%",
      change: "+3% vs mes anterior",
      trend: "up",
    },
  };

  // Ingresos mensuales
  const ingresosData = {
    total: 245000,
    cambio: "+15% vs mes anterior",
    desglose: [
      { nombre: "Cursos Premium", valor: 180000 },
      { nombre: "Certificaciones", valor: 45000 },
      { nombre: "Eventos", valor: 20000 },
    ],
  };

  // Cursos más populares
  const cursosPopulares = [
    { nombre: "NOM-035", estudiantes: 450 },
    { nombre: "SAT Facturación", estudiantes: 380 },
    { nombre: "Gestión Digital", estudiantes: 280 },
    { nombre: "Seguridad Industrial", estudiantes: 165 },
  ];

  // Satisfacción general
  const satisfaccion = {
    promedio: 4.8,
    total: 1447,
    distribucion: [
      { estrellas: 5, porcentaje: 73 },
      { estrellas: 4, porcentaje: 20 },
      { estrellas: 3, porcentaje: 5 },
    ],
  };

  // Métricas de rendimiento
  const metricsRendimiento = [
    { label: "Tasa de Finalización", valor: "94%", porcentaje: 94 },
    { label: "Retención de Empleados", valor: "87%", porcentaje: 87 },
    { label: "Calidad por Empresa", valor: "4.2", porcentaje: 84 },
    { label: "Tiempo Promedio", valor: "32 días", porcentaje: 65 },
  ];

  // Progreso de capacitación (gráfica)
  const progresoCapacitacion = [
    { mes: "Ene", completados: 65, enProgreso: 45 },
    { mes: "Feb", completados: 120, enProgreso: 60 },
    { mes: "Mar", completados: 180, enProgreso: 70 },
    { mes: "Abr", completados: 145, enProgreso: 80 },
    { mes: "May", completados: 280, enProgreso: 90 },
    { mes: "Jun", completados: 200, enProgreso: 75 },
  ];

  // Estado de cumplimiento
  const cumplimientoData = [
    { label: "Cumplimiento Total", porcentaje: 82, color: "#22c55e" },
    { label: "Cumplimiento Parcial", porcentaje: 13, color: "#f59e0b" },
    { label: "No Cumplimiento", porcentaje: 5, color: "#ef4444" },
  ];

  // Reportes generados
  const reportesGenerados = [
    {
      id: 1,
      nombre: "Reporte Mensual de Capacitación",
      tipo: "Capacitación",
      periodo: "Febrero 2024",
      fecha: "2/29/2024",
      estado: "Completado",
    },
    {
      id: 2,
      nombre: "Análisis de Cumplimiento STPS",
      tipo: "Cumplimiento",
      periodo: "Q1 2024",
      fecha: "3/14/2024",
      estado: "Completado",
    },
    {
      id: 3,
      nombre: "Reporte Financiero de Cursos",
      tipo: "Financiero",
      periodo: "Febrero 2024",
      fecha: "2/29/2024",
      estado: "Generando",
    },
  ];

  // Progreso por departamento
  const progresoDepartamento = [
    { nombre: "Recursos Humanos", porcentaje: 85 },
    { nombre: "Contabilidad", porcentaje: 92 },
    { nombre: "Operaciones", porcentaje: 68 },
  ];

  // Certificaciones obtenidas
  const certificacionesObtenidas = [
    { nombre: "NOM-035", cantidad: 18 },
    { nombre: "SAT Facturación", cantidad: 17 },
    { nombre: "Gestión Empresarial", cantidad: 8 },
  ];

  const maxCursoEstudiantes = Math.max(
    ...cursosPopulares.map((c) => c.estudiantes)
  );

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
              Reportes y Métricas
            </h1>
            <p style={{ color: "#B7CCE9", margin: 0, fontSize: "1rem" }}>
              Análisis detallado del rendimiento y cumplimiento de la plataforma
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "0.875rem 1.5rem",
                color: "#E6F1FF",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaFileExport />
              Exportar PDF
            </button>
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
              <FaFileDownload />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Tipo de Reporte
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                fontSize: "0.95rem",
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
              <option value="capacitacion">Capacitación</option>
              <option value="cumplimiento">Cumplimiento</option>
              <option value="financiero">Financiero</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Período
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                fontSize: "0.95rem",
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
              <option value="dia">Este día</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="trimestre">Este trimestre</option>
              <option value="ano">Este año</option>
            </select>
          </div>

          <div>
            <label
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Fecha Inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                fontSize: "0.95rem",
                outline: "none",
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
            />
          </div>

          <div>
            <label
              style={{
                color: "#B7CCE9",
                fontSize: "0.85rem",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Fecha Fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                padding: "0.75rem",
                color: "#E6F1FF",
                fontSize: "0.95rem",
                outline: "none",
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
            />
          </div>
        </div>
      </div>

      {/* Tarjetas de métricas principales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            key: "cursosCompletados",
            label: "Cursos Completados",
            icon: <FaBookOpen />,
            color: "#3b82f6",
          },
          {
            key: "estudiantesActivos",
            label: "Estudiantes Activos",
            icon: <FaUsers />,
            color: "#22c55e",
          },
          {
            key: "tasaFinalizacion",
            label: "Tasa de Finalización",
            icon: <FaChartLine />,
            color: "#8b5cf6",
          },
        ].map((metric) => (
          <div
            key={metric.key}
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
              e.currentTarget.style.boxShadow = `0 16px 40px ${metric.color}40`;
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
                  fontSize: "0.9rem",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {metric.label}
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${metric.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: metric.color,
                  fontSize: "1.5rem",
                }}
              >
                {metric.icon}
              </div>
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#E6F1FF",
                marginBottom: "0.5rem",
              }}
            >
              {metricsData[metric.key].value}
            </div>
            <div
              style={{ color: "#22c55e", fontSize: "0.85rem", fontWeight: 600 }}
            >
              {metricsData[metric.key].change}
            </div>
          </div>
        ))}
      </div>

      {/* Fila 1: Ingresos, Cursos Populares, Satisfacción */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Ingresos Mensuales */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 0.5rem 0",
            }}
          >
            Ingresos Mensuales
          </h3>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#E6F1FF",
              marginBottom: "0.5rem",
            }}
          >
            ${ingresosData.total.toLocaleString()}
          </div>
          <div
            style={{
              color: "#22c55e",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            {ingresosData.cambio}
          </div>

          {ingresosData.desglose.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom:
                  index < ingresosData.desglose.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
              }}
            >
              <span style={{ color: "#B7CCE9", fontSize: "0.9rem" }}>
                {item.nombre}
              </span>
              <span
                style={{
                  color: "#E6F1FF",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                ${item.valor.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Cursos Más Populares */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Cursos Más Populares
          </h3>

          {cursosPopulares.map((curso, index) => (
            <div key={index} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    color: "#E6F1FF",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {curso.nombre}
                </span>
                <span
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {curso.estudiantes} estudiantes
                </span>
              </div>
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
                    width: `${(curso.estudiantes / maxCursoEstudiantes) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Satisfacción General */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1rem 0",
            }}
          >
            Satisfacción General
          </h3>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#E6F1FF",
                marginBottom: "0.25rem",
              }}
            >
              {satisfaccion.promedio}/5
            </div>
            <div style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
              Basado en {satisfaccion.total.toLocaleString()} reseñas
            </div>
          </div>

          {satisfaccion.distribucion.map((item, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    color: "#E6F1FF",
                    fontSize: "0.85rem",
                    minWidth: "20px",
                  }}
                >
                  {item.estrellas}★
                </span>
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
                      width: `${item.porcentaje}%`,
                      height: "100%",
                      background: "#fbbf24",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "#B7CCE9",
                    fontSize: "0.85rem",
                    minWidth: "35px",
                    textAlign: "right",
                  }}
                >
                  {item.porcentaje}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Rendimiento */}
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
            margin: "0 0 0.5rem 0",
          }}
        >
          Métricas de Rendimiento
        </h3>
        <p
          style={{
            color: "#B7CCE9",
            fontSize: "0.85rem",
            margin: "0 0 1.5rem 0",
          }}
        >
          Análisis detallado del rendimiento de la plataforma
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
        >
          {metricsRendimiento.map((metric, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#E6F1FF",
                  marginBottom: "0.5rem",
                }}
              >
                {metric.valor}
              </div>
              <div
                style={{
                  color: "#B7CCE9",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                }}
              >
                {metric.label}
              </div>
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
                    width: `${metric.porcentaje}%`,
                    height: "100%",
                    background:
                      metric.porcentaje >= 90
                        ? "#22c55e"
                        : metric.porcentaje >= 70
                          ? "#3b82f6"
                          : metric.porcentaje >= 50
                            ? "#f59e0b"
                            : "#ef4444",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progreso de Capacitación + Estado de Cumplimiento */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Progreso de Capacitación */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Progreso de Capacitación
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "0.5rem",
              height: "200px",
              marginBottom: "1rem",
            }}
          >
            {progresoCapacitacion.map((data, index) => {
              const maxValue = Math.max(
                ...progresoCapacitacion.map((d) => d.completados + d.enProgreso)
              );
              const totalHeight =
                ((data.completados + data.enProgreso) / maxValue) * 180;
              const completadosHeight =
                (data.completados / (data.completados + data.enProgreso)) *
                totalHeight;
              const enProgresoHeight = totalHeight - completadosHeight;

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "180px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        height: `${completadosHeight}px`,
                        background: "#3b82f6",
                        borderRadius: "8px 8px 0 0",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <div
                      style={{
                        height: `${enProgresoHeight}px`,
                        background: "#93c5fd",
                        borderRadius:
                          completadosHeight === 0 ? "8px 8px 0 0" : "0",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: "#B7CCE9",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {data.mes}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#3b82f6",
                  borderRadius: "2px",
                }}
              />
              <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                Completados
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#93c5fd",
                  borderRadius: "2px",
                }}
              />
              <span style={{ color: "#B7CCE9", fontSize: "0.85rem" }}>
                En progreso
              </span>
            </div>
          </div>
        </div>

        {/* Estado de Cumplimiento */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Estado de Cumplimiento
          </h3>

          {cumplimientoData.map((item, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#E6F1FF",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.porcentaje}%
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
                    width: `${item.porcentaje}%`,
                    height: "100%",
                    background: item.color,
                    borderRadius: "6px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla de Reportes Generados */}
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
            Reportes Generados
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
                  padding: "1rem 2rem",
                  textAlign: "left",
                  color: "#B7CCE9",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                REPORTE
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
                TIPO
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
                PERÍODO
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
                FECHA GENERACIÓN
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
            {reportesGenerados.map((reporte) => (
              <tr
                key={reporte.id}
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
                <td
                  style={{
                    padding: "1rem 2rem",
                    color: "#E6F1FF",
                    fontWeight: 600,
                  }}
                >
                  {reporte.nombre}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      background:
                        reporte.tipo === "Capacitación"
                          ? "rgba(59,130,246,0.2)"
                          : reporte.tipo === "Cumplimiento"
                            ? "rgba(139,92,246,0.2)"
                            : "rgba(245,158,11,0.2)",
                      color:
                        reporte.tipo === "Capacitación"
                          ? "#60a5fa"
                          : reporte.tipo === "Cumplimiento"
                            ? "#a78bfa"
                            : "#fbbf24",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {reporte.tipo}
                  </span>
                </td>
                <td style={{ padding: "1rem", color: "#B7CCE9" }}>
                  {reporte.periodo}
                </td>
                <td style={{ padding: "1rem", color: "#B7CCE9" }}>
                  {reporte.fecha}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      background:
                        reporte.estado === "Completado"
                          ? "rgba(34,197,94,0.2)"
                          : "rgba(245,158,11,0.2)",
                      color:
                        reporte.estado === "Completado" ? "#4ade80" : "#fbbf24",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {reporte.estado}
                  </span>
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
                      disabled={reporte.estado === "Generando"}
                      style={{
                        background:
                          reporte.estado === "Generando"
                            ? "rgba(107,114,128,0.15)"
                            : "rgba(76,175,80,0.15)",
                        color:
                          reporte.estado === "Generando"
                            ? "#9ca3af"
                            : "#81c784",
                        border:
                          reporte.estado === "Generando"
                            ? "1px solid rgba(107,114,128,0.3)"
                            : "1px solid rgba(76,175,80,0.3)",
                        borderRadius: "8px",
                        padding: "0.5rem",
                        cursor:
                          reporte.estado === "Generando"
                            ? "not-allowed"
                            : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "36px",
                        height: "36px",
                        transition: "all 0.2s ease",
                        opacity: reporte.estado === "Generando" ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (reporte.estado !== "Generando") {
                          e.currentTarget.style.background =
                            "rgba(76,175,80,0.3)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (reporte.estado !== "Generando") {
                          e.currentTarget.style.background =
                            "rgba(76,175,80,0.15)";
                          e.currentTarget.style.transform = "scale(1)";
                        }
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

      {/* Progreso por Departamento + Certificaciones Obtenidas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Progreso por Departamento */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Progreso por Departamento
          </h3>

          {progresoDepartamento.map((dept, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#E6F1FF",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {dept.nombre}
                </span>
                <span style={{ color: "#E6F1FF", fontWeight: 700 }}>
                  {dept.porcentaje}%
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
                    width: `${dept.porcentaje}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                    borderRadius: "5px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certificaciones Obtenidas */}
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
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: "0 0 1.5rem 0",
            }}
          >
            Certificaciones Obtenidas
          </h3>

          {certificacionesObtenidas.map((cert, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  color: "#E6F1FF",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {cert.nombre}
              </span>
              <span
                style={{
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                {cert.cantidad} certificados
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportesMetricas;
