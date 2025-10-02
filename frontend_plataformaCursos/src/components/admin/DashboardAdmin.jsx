import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "../utils/withRouter.jsx";
import {
  FaChevronRight,
  FaChevronLeft,
  FaUserCircle,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaUserGraduate,
  FaCalendarAlt,
  FaStar,
  FaChevronDown, // <-- Agrego el ícono de flecha abajo
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { LineChart } from "@mui/x-charts";

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: new Date(),
      sidebarOpen: false,
      anuncioIndex: 0,
      anuncios: [
        {
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          nombre: "Admin Plataforma",
          texto:
            "¡Bienvenido al panel de administración! Aquí podrás gestionar todos los aspectos de la plataforma.",
          badge: null,
        },
        {
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          nombre: "Soporte Técnico",
          texto:
            "Mantenimiento programado: El sistema estará en mantenimiento el 15/07/2024 de 2:00am a 4:00am.",
          badge: "5★",
        },
        {
          avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
          nombre: "Equipo de Desarrollo",
          texto:
            "Nueva función: Ahora puedes exportar reportes en PDF desde la sección de cursos.",
          badge: null,
        },
      ],
      statsIndex: 0,
      statsCards: [
        {
          icon: (
            <FaBook size={32} style={{ color: "#877267", marginBottom: 10 }} />
          ),
          label: "Total Cursos",
          value: 6,
        },
        {
          icon: (
            <FaUserGraduate
              size={32}
              style={{ color: "#2176bd", marginBottom: 10 }}
            />
          ),
          label: "Total Estudiantes",
          value: 341,
        },
        {
          icon: (
            <FaCalendarAlt
              size={32}
              style={{ color: "#957D70", marginBottom: 10 }}
            />
          ),
          label: "Eventos Programados",
          value: 3,
        },
        {
          icon: (
            <FaStar size={32} style={{ color: "#FFD700", marginBottom: 10 }} />
          ),
          label: "Rating Promedio",
          value: 4.7,
        },
      ],
      modulosDropdownOpen: false, // <-- Estado para el dropdown
      modulosDropdownCoords: { top: 0, left: 0 },
      coursesSearch: "",
      // Estados para modales de cursos
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      selectedCourse: null,
      editFormData: {
        titulo: "",
        autor: "",
        categoria: "",
        estudiantes: 0,
        precio: 0,
        rating: 0,
        estado: "",
      },
      addFormData: {
        titulo: "",
        autor: "",
        categoria: "",
        precio: 0,
        estado: "Activo",
      },
      // ===== Gestión de Contenido (reemplaza Próximos Eventos) =====
      contentActiveTab: "Banners", // Banners | Testimonios | FAQ
      contentBanners: [
        {
          id: 1,
          titulo: "Lanza tu carrera",
          url: "https://tusitio.com/cursos",
          imagen:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=60",
        },
      ],
      contentTestimonios: [
        {
          id: 1,
          nombre: "María López",
          mensaje:
            "El curso me ayudó a certificar a mi equipo rápidamente. ¡Excelente!",
        },
      ],
      contentFAQ: [
        {
          id: 1,
          pregunta: "¿Cómo obtengo mi certificado?",
          respuesta:
            "Al completar el curso y aprobar el examen final, podrás descargarlo desde tu perfil.",
        },
      ],
      contentShowModal: false,
      contentDeleteModal: false,
      contentEditingIndex: null,
      contentFormData: {},
    };
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSidebarClose = this.handleSidebarClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePrevAnuncio = this.handlePrevAnuncio.bind(this);
    this.handleNextAnuncio = this.handleNextAnuncio.bind(this);
    this.nextStatsCard = this.nextStatsCard.bind(this);
    this.toggleModulosDropdown = this.toggleModulosDropdown.bind(this);
    this.handleClickOutsideDropdown =
      this.handleClickOutsideDropdown.bind(this);
    this.modulosButtonRef = React.createRef();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ hora: new Date() });
    }, 1000);
    this.statsInterval = setInterval(this.nextStatsCard, 3000);
    document.addEventListener("mousedown", this.handleClickOutsideDropdown);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.statsInterval);
    document.removeEventListener("mousedown", this.handleClickOutsideDropdown);
  }

  handleClickOutsideDropdown(event) {
    if (
      this.state.modulosDropdownOpen &&
      this.modulosButtonRef.current &&
      !this.modulosButtonRef.current.contains(event.target)
    ) {
      this.setState({ modulosDropdownOpen: false });
    }
  }

  handleSidebarOpen() {
    this.setState({ sidebarOpen: true });
  }

  handleSidebarClose() {
    this.setState({ sidebarOpen: false });
  }

  handleLogout() {
    window.location.href = "/login";
  }

  handlePrevAnuncio() {
    this.setState((prev) => ({
      anuncioIndex:
        (prev.anuncioIndex - 1 + prev.anuncios.length) % prev.anuncios.length,
    }));
  }
  handleNextAnuncio() {
    this.setState((prev) => ({
      anuncioIndex: (prev.anuncioIndex + 1) % prev.anuncios.length,
    }));
  }

  nextStatsCard() {
    this.setState((prev) => ({
      statsIndex: (prev.statsIndex + 1) % prev.statsCards.length,
    }));
  }

  toggleModulosDropdown() {
    if (!this.state.modulosDropdownOpen && this.modulosButtonRef.current) {
      const rect = this.modulosButtonRef.current.getBoundingClientRect();
      this.setState({
        modulosDropdownOpen: true,
        modulosDropdownCoords: {
          top: rect.bottom,
          left: rect.left,
        },
      });
    } else {
      this.setState({ modulosDropdownOpen: false });
    }
  }

  // Funciones para Ver Curso
  handleViewCourse = (course) => {
    this.setState({
      showViewModal: true,
      selectedCourse: course,
    });
  };

  handleCloseViewModal = () => {
    this.setState({
      showViewModal: false,
      selectedCourse: null,
    });
  };

  // Funciones para Editar Curso
  handleEditCourse = (course) => {
    this.setState({
      showEditModal: true,
      selectedCourse: course,
      editFormData: {
        titulo: course.titulo,
        autor: course.autor,
        categoria: course.categoria,
        estudiantes: course.estudiantes,
        precio: course.precio,
        rating: course.rating,
        estado: course.estado,
      },
    });
  };

  handleCloseEditModal = () => {
    this.setState({
      showEditModal: false,
      selectedCourse: null,
      editFormData: {
        titulo: "",
        autor: "",
        categoria: "",
        estudiantes: 0,
        precio: 0,
        rating: 0,
        estado: "",
      },
    });
  };

  handleEditInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editFormData: {
        ...prevState.editFormData,
        [name]: value,
      },
    }));
  };

  handleSaveEdit = (e) => {
    e.preventDefault();
    // Aquí irá la llamada a tu API para actualizar el curso
    console.log("Guardando cambios:", this.state.editFormData);
    alert("Curso actualizado exitosamente!");
    this.handleCloseEditModal();
  };

  // Funciones para Eliminar Curso
  handleDeleteCourse = (course) => {
    this.setState({
      showDeleteModal: true,
      selectedCourse: course,
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
      selectedCourse: null,
    });
  };

  handleConfirmDelete = () => {
    // Aquí irá la llamada a tu API para eliminar el curso
    console.log("Eliminando curso:", this.state.selectedCourse);
    alert("Curso eliminado exitosamente!");
    this.handleCloseDeleteModal();
  };

  // ===== Gestión de Contenido: helpers y acciones =====
  setContentTab = (tab) => {
    this.setState({ contentActiveTab: tab });
  };

  getEmptyContentForm = (tab) => {
    if (tab === "Banners") return { titulo: "", url: "", imagen: "" };
    if (tab === "Testimonios") return { nombre: "", mensaje: "" };
    if (tab === "FAQ") return { pregunta: "", respuesta: "" };
    return {};
  };

  getContentList = (tab) => {
    if (tab === "Banners") return this.state.contentBanners;
    if (tab === "Testimonios") return this.state.contentTestimonios;
    if (tab === "FAQ") return this.state.contentFAQ;
    return [];
  };

  setContentList = (tab, list) => {
    if (tab === "Banners") this.setState({ contentBanners: list });
    if (tab === "Testimonios") this.setState({ contentTestimonios: list });
    if (tab === "FAQ") this.setState({ contentFAQ: list });
  };

  openContentAdd = () => {
    const { contentActiveTab } = this.state;
    this.setState({
      contentShowModal: true,
      contentEditingIndex: null,
      contentFormData: this.getEmptyContentForm(contentActiveTab),
    });
  };

  openContentEdit = (index) => {
    const { contentActiveTab } = this.state;
    const list = this.getContentList(contentActiveTab);
    const item = list[index];
    this.setState({
      contentShowModal: true,
      contentEditingIndex: index,
      contentFormData: { ...item },
    });
  };

  closeContentModal = () => {
    this.setState({
      contentShowModal: false,
      contentFormData: {},
      contentEditingIndex: null,
    });
  };

  handleContentInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      contentFormData: { ...prev.contentFormData, [name]: value },
    }));
  };

  saveContentItem = (e) => {
    e.preventDefault();
    const { contentActiveTab, contentEditingIndex, contentFormData } =
      this.state;
    const list = [...this.getContentList(contentActiveTab)];
    if (contentActiveTab === "Banners") {
      if (!contentFormData.titulo || !contentFormData.url) {
        alert("Completa título y URL");
        return;
      }
    }
    if (contentActiveTab === "Testimonios") {
      if (!contentFormData.nombre || !contentFormData.mensaje) {
        alert("Completa nombre y mensaje");
        return;
      }
    }
    if (contentActiveTab === "FAQ") {
      if (!contentFormData.pregunta || !contentFormData.respuesta) {
        alert("Completa pregunta y respuesta");
        return;
      }
    }

    if (contentEditingIndex === null || contentEditingIndex === undefined) {
      // agregar
      const newItem = { id: Date.now(), ...contentFormData };
      list.push(newItem);
    } else {
      // editar
      list[contentEditingIndex] = {
        ...list[contentEditingIndex],
        ...contentFormData,
      };
    }
    this.setContentList(contentActiveTab, list);
    this.closeContentModal();
  };

  openContentDelete = (index) => {
    this.setState({ contentDeleteModal: true, contentEditingIndex: index });
  };

  closeContentDelete = () => {
    this.setState({ contentDeleteModal: false, contentEditingIndex: null });
  };

  confirmContentDelete = () => {
    const { contentActiveTab, contentEditingIndex } = this.state;
    const list = [...this.getContentList(contentActiveTab)];
    if (contentEditingIndex !== null && contentEditingIndex >= 0) {
      list.splice(contentEditingIndex, 1);
      this.setContentList(contentActiveTab, list);
    }
    this.closeContentDelete();
  };

  renderContentFormFields = () => {
    const { contentActiveTab, contentFormData } = this.state;
    if (contentActiveTab === "Banners") {
      return (
        <>
          <div className="form-group-modal">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={contentFormData.titulo || ""}
              onChange={this.handleContentInputChange}
              required
            />
          </div>
          <div className="form-group-modal">
            <label>URL *</label>
            <input
              type="url"
              name="url"
              value={contentFormData.url || ""}
              onChange={this.handleContentInputChange}
              placeholder="https://..."
              required
            />
          </div>
          <div className="form-group-modal" style={{ gridColumn: "1 / -1" }}>
            <label>Imagen (URL)</label>
            <input
              type="url"
              name="imagen"
              value={contentFormData.imagen || ""}
              onChange={this.handleContentInputChange}
              placeholder="https://..."
            />
          </div>
        </>
      );
    }
    if (contentActiveTab === "Testimonios") {
      return (
        <>
          <div className="form-group-modal">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={contentFormData.nombre || ""}
              onChange={this.handleContentInputChange}
              required
            />
          </div>
          <div className="form-group-modal" style={{ gridColumn: "1 / -1" }}>
            <label>Mensaje *</label>
            <input
              type="text"
              name="mensaje"
              value={contentFormData.mensaje || ""}
              onChange={this.handleContentInputChange}
              required
            />
          </div>
        </>
      );
    }
    if (contentActiveTab === "FAQ") {
      return (
        <>
          <div className="form-group-modal" style={{ gridColumn: "1 / -1" }}>
            <label>Pregunta *</label>
            <input
              type="text"
              name="pregunta"
              value={contentFormData.pregunta || ""}
              onChange={this.handleContentInputChange}
              required
            />
          </div>
          <div className="form-group-modal" style={{ gridColumn: "1 / -1" }}>
            <label>Respuesta *</label>
            <input
              type="text"
              name="respuesta"
              value={contentFormData.respuesta || ""}
              onChange={this.handleContentInputChange}
              required
            />
          </div>
        </>
      );
    }
    return null;
  };

  // Funciones para Agregar Curso
  handleAddCourse = () => {
    this.setState({
      showAddModal: true,
      addFormData: {
        titulo: "",
        autor: "",
        categoria: "",
        precio: 0,
        estado: "Activo",
      },
    });
  };

  handleCloseAddModal = () => {
    this.setState({
      showAddModal: false,
      addFormData: {
        titulo: "",
        autor: "",
        categoria: "",
        precio: 0,
        estado: "Activo",
      },
    });
  };

  handleAddInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      addFormData: {
        ...prevState.addFormData,
        [name]: value,
      },
    }));
  };

  handleSaveNewCourse = (e) => {
    e.preventDefault();
    // Aquí irá la llamada a tu API para crear el curso
    console.log("Creando nuevo curso:", this.state.addFormData);
    alert("Curso creado exitosamente!");
    this.handleCloseAddModal();
  };

  render() {
    const user = this.props.router?.location?.state?.user || this.props.user;
    const {
      hora,
      sidebarOpen,
      showViewModal,
      showEditModal,
      showDeleteModal,
      showAddModal,
      selectedCourse,
      editFormData,
      addFormData,
    } = this.state;
    const { statsIndex, statsCards } = this.state;
    return (
      <>
        {/* MODAL VER CURSO */}
        {showViewModal && selectedCourse && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseViewModal}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Detalles del Curso</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseViewModal}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="course-modal-content">
                <div className="course-detail-row">
                  <img
                    src={selectedCourse.img}
                    alt="curso"
                    className="course-detail-img"
                  />
                  <div>
                    <h4 style={{ color: "#E6F1FF", marginBottom: 8 }}>
                      {selectedCourse.titulo}
                    </h4>
                    <p style={{ color: "#B7CCE9", fontSize: 14 }}>
                      Impartido por: {selectedCourse.autor}
                    </p>
                  </div>
                </div>
                <div className="course-detail-grid">
                  <div className="course-detail-item">
                    <span className="detail-label">Categoría:</span>
                    <span className="detail-value">
                      {selectedCourse.categoria}
                    </span>
                  </div>
                  <div className="course-detail-item">
                    <span className="detail-label">Estudiantes:</span>
                    <span className="detail-value">
                      {selectedCourse.estudiantes}
                    </span>
                  </div>
                  <div className="course-detail-item">
                    <span className="detail-label">Precio:</span>
                    <span className="detail-value">
                      ${selectedCourse.precio.toLocaleString()}
                    </span>
                  </div>
                  <div className="course-detail-item">
                    <span className="detail-label">Rating:</span>
                    <span className="detail-value">
                      ⭐ {selectedCourse.rating}
                    </span>
                  </div>
                  <div className="course-detail-item">
                    <span className="detail-label">Estado:</span>
                    <span className="detail-value">
                      {selectedCourse.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL EDITAR CURSO */}
        {showEditModal && selectedCourse && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEditModal}
          >
            <div
              className="course-modal course-modal-large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>Editar Curso</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEditModal}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form
                onSubmit={this.handleSaveEdit}
                className="course-modal-content"
              >
                <div className="course-edit-grid">
                  <div className="form-group-modal">
                    <label>Título del Curso</label>
                    <input
                      type="text"
                      name="titulo"
                      value={editFormData.titulo}
                      onChange={this.handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Expositor (Quien lo imparte)</label>
                    <input
                      type="text"
                      name="autor"
                      value={editFormData.autor}
                      onChange={this.handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Categoría</label>
                    <select
                      name="categoria"
                      value={editFormData.categoria}
                      onChange={this.handleEditInputChange}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Seguridad Laboral">
                        Seguridad Laboral
                      </option>
                      <option value="Fiscal">Fiscal</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Liderazgo">Liderazgo</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div className="form-group-modal">
                    <label>Precio ($)</label>
                    <input
                      type="number"
                      name="precio"
                      value={editFormData.precio}
                      onChange={this.handleEditInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Estado</label>
                    <select
                      name="estado"
                      value={editFormData.estado}
                      onChange={this.handleEditInputChange}
                      required
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="En revisión">En revisión</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={this.handleCloseEditModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ELIMINAR CURSO */}
        {showDeleteModal && selectedCourse && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseDeleteModal}
          >
            <div
              className="course-modal course-modal-small"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>Confirmar Eliminación</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseDeleteModal}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="course-modal-content">
                <div className="delete-warning">
                  <FaTrash
                    size={48}
                    style={{ color: "#e74c3c", marginBottom: 16 }}
                  />
                  <p
                    style={{ color: "#E6F1FF", fontSize: 16, marginBottom: 12 }}
                  >
                    ¿Estás seguro de que deseas eliminar este curso?
                  </p>
                  <p
                    style={{ color: "#B7CCE9", fontSize: 14, marginBottom: 8 }}
                  >
                    <strong>{selectedCourse.titulo}</strong>
                  </p>
                  <p style={{ color: "#c0392b", fontSize: 13 }}>
                    Esta acción no se puede deshacer
                  </p>
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={this.handleCloseDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={this.handleConfirmDelete}
                  >
                    Eliminar Curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL AGREGAR CURSO */}
        {showAddModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseAddModal}
          >
            <div
              className="course-modal course-modal-large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>Agregar Nuevo Curso</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseAddModal}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form
                onSubmit={this.handleSaveNewCourse}
                className="course-modal-content"
              >
                <div className="course-edit-grid">
                  <div className="form-group-modal">
                    <label>Título del Curso *</label>
                    <input
                      type="text"
                      name="titulo"
                      value={addFormData.titulo}
                      onChange={this.handleAddInputChange}
                      placeholder="Ej: Introducción a React"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Expositor (Quien lo imparte) *</label>
                    <input
                      type="text"
                      name="autor"
                      value={addFormData.autor}
                      onChange={this.handleAddInputChange}
                      placeholder="Ej: Dr. Juan Pérez"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Categoría *</label>
                    <select
                      name="categoria"
                      value={addFormData.categoria}
                      onChange={this.handleAddInputChange}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Seguridad Laboral">
                        Seguridad Laboral
                      </option>
                      <option value="Fiscal">Fiscal</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Liderazgo">Liderazgo</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div className="form-group-modal">
                    <label>Precio ($) *</label>
                    <input
                      type="number"
                      name="precio"
                      value={addFormData.precio}
                      onChange={this.handleAddInputChange}
                      min="0"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Estado *</label>
                    <select
                      name="estado"
                      value={addFormData.estado}
                      onChange={this.handleAddInputChange}
                      required
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="En revisión">En revisión</option>
                    </select>
                  </div>
                </div>
                <div className="add-course-note">
                  <i
                    className="bx bx-info-circle"
                    style={{ marginRight: 8 }}
                  ></i>
                  <span>Los campos marcados con * son obligatorios</span>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={this.handleCloseAddModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save">
                    Crear Curso
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sidebar oculto y pestaña, fuera del flujo principal */}
        <div>
          {/* Overlay oscuro cuando sidebar está abierto */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={this.handleSidebarClose}
            ></div>
          )}
          {/* Pestaña para abrir sidebar */}
          {!sidebarOpen && (
            <>
              <div
                className="sidebar-tab"
                onClick={this.handleSidebarOpen}
                title="Haz click para mostrar el panel admin"
              >
                <FaChevronRight size={22} style={{ marginBottom: 6 }} />
                <span
                  style={{
                    writingMode: "vertical-rl",
                    fontWeight: 600,
                    letterSpacing: 2,
                    fontSize: 15,
                  }}
                >
                  Admin
                </span>
              </div>
              {/* Campanita fija con badge (2) justo debajo de la pestaña del sidebar */}
              <button className="sidebar-notif" title="Notificaciones">
                <FaBell size={18} />
                <span className="sidebar-notif-badge">2</span>
              </button>
            </>
          )}
          {/* Sidebar */}
          <div className={`sidebar-admin${sidebarOpen ? " open" : ""}`}>
            <div className="sidebar-header">
              <FaUserCircle
                size={48}
                style={{ color: "#7eeaff", marginBottom: 8 }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--text-primary)",
                }}
              >
                {user?.alias || user?.name || "Admin"}
              </div>
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                {user?.email || "admin@mail.com"}
              </div>
              <button
                className="sidebar-close"
                onClick={this.handleSidebarClose}
                title="Cerrar panel"
              >
                <FaChevronLeft size={20} />
              </button>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-link">
                <FaTachometerAlt /> <span>Dashboard</span>
              </div>
              <div className="sidebar-link">
                <FaUsers /> <span>Usuarios</span>
              </div>
              <div className="sidebar-link">
                <FaBook /> <span>Cursos</span>
              </div>
              <div className="sidebar-link">
                <FaCog /> <span>Configuración</span>
              </div>
            </div>
            <div className="sidebar-section">
              <div className="sidebar-link">
                <FaQuestionCircle /> <span>Ayuda</span>
              </div>
            </div>
            {/* Estado movido a un badge flotante abajo/derecha */}
            <div className="sidebar-section">
              <button className="sidebar-logout" onClick={this.handleLogout}>
                <FaSignOutAlt style={{ marginRight: 8 }} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
        {/* Contenido principal del dashboard */}
        <div style={{ minHeight: "100vh", background: "var(--app-bg)" }}>
          {/* Badge de estado flotante abajo a la derecha */}
          <div className="floating-status">
            <span className="sidebar-dot online"></span>
            <span>Online</span>
          </div>
          {/* Navbar Glassmorphism Sticky Full Width con sombra y detalles café */}
          <nav
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.2rem 2.5rem",
              boxSizing: "border-box",
              borderRadius: 0,
              background:
                "linear-gradient(90deg, rgba(8,14,26,0.55) 0%, rgba(8,14,26,0.35) 100%)",
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08)",
              backdropFilter: "saturate(160%) blur(8px)",
              WebkitBackdropFilter: "saturate(160%) blur(8px)",
              color: "#E6F1FF",
              margin: 0,
              maxWidth: "100%",
              minHeight: 80,
              borderTop: "1px solid rgba(255,255,255,0.16)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              borderLeft: 0,
              borderRight: 0,
              outline: "none",
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 70%, 95% 75%, 90% 80%, 85% 82%, 80% 83%, 75% 82%, 70% 80%, 65% 77%, 60% 73%, 55% 68%, 50% 65%, 45% 68%, 40% 73%, 35% 77%, 30% 80%, 25% 82%, 20% 83%, 15% 82%, 10% 80%, 5% 75%, 0% 70%)",
            }}
          >
            {/* Sección izquierda: enlaces */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flex: 1,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: 1,
                  color: "#E6F1FF",
                }}
              >
                ExpertPath
              </span>
              <div style={{ position: "relative" }}>
                <button
                  ref={this.modulosButtonRef}
                  className="navbar-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                  onClick={this.toggleModulosDropdown}
                >
                  Módulos{" "}
                  <FaChevronDown style={{ marginLeft: 2, fontSize: 14 }} />
                </button>
                {this.state.modulosDropdownOpen &&
                  ReactDOM.createPortal(
                    <div
                      style={{
                        position: "fixed",
                        top: this.state.modulosDropdownCoords.top,
                        left: this.state.modulosDropdownCoords.left,
                        background: "#fff",
                        boxShadow: "0 4px 16px #0002",
                        borderRadius: 10,
                        minWidth: 210,
                        zIndex: 2000,
                        padding: "8px 0",
                        border: "1.5px solid #ececec",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <a href="#" className="navbar-link dropdown-link">
                        Certificaciones
                      </a>
                      <a href="#" className="navbar-link dropdown-link">
                        Evidencias
                      </a>
                      <a href="#" className="navbar-link dropdown-link">
                        Reportes y Métricas
                      </a>
                      <a href="#" className="navbar-link dropdown-link">
                        Expedientes
                      </a>
                      <a href="#" className="navbar-link dropdown-link">
                        Cumplimiento STPS
                      </a>
                    </div>,
                    document.body
                  )}
              </div>
              <a href="#" className="navbar-link">
                Cursos
              </a>
              <a href="#" className="navbar-link">
                Usuarios
              </a>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "35%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="Logo"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    boxShadow: "none",
                    filter: "none",
                    background: "none",
                    margin: "auto",
                  }}
                />
              </div>
            </div>
            {/* Sección derecha: usuario, hora, logout, versión */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                flex: 1,
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <span
                style={{
                  marginLeft: 28,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "4px 16px",
                  color: "#E6F1FF",
                  fontWeight: 600,
                  fontSize: 15,
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.08) inset, 0 4px 16px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Admin
              </span>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  boxShadow: "none",
                  border: "1.5px solid #ececec",
                }}
              />
              <span
                style={{
                  marginLeft: 18,
                  fontWeight: 500,
                  color: "#B7CCE9",
                  fontSize: 15,
                }}
              >
                {hora.toLocaleTimeString()}
              </span>
              {/* Versión del software, sutil */}
              <span
                style={{
                  marginLeft: 28,
                  fontSize: 15,
                  color: "#7eeaff",
                  fontWeight: 700,
                  background: "rgba(0,229,255,0.08)",
                  borderRadius: 8,
                  padding: "4px 14px",
                  border: "1px solid rgba(0,229,255,0.25)",
                  boxShadow: "0 0 12px rgba(0,229,255,0.25)",
                  alignSelf: "center",
                  letterSpacing: 1,
                }}
              >
                v0.1
              </span>
              {/* <button
                style={{
                  marginLeft: 24,
                  background: "#957D70",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 1px 4px #0001",
                  transition: "background 0.2s, color 0.2s",
                }}
                onClick={this.handleLogout}
              >
                Cerrar sesión
              </button> */}
              <span
                style={{ fontWeight: 600, color: "#ffffffff", fontSize: 16 }}
              >
                {user?.alias || user?.name || "Admin"}
              </span>
            </div>
          </nav>
          {/* Hero header estilo portfolio (oscuro/neón) */}
          <div className="hero-header">
            <div className="hero-inner">
              <div className="hero-kicker">// Panel · administrador</div>
              <h1 className="hero-title">EXPERTPATH</h1>
              <p className="hero-subtitle">
                Plataforma de cursos · software para equipos
              </p>
            </div>
          </div>
          {/* Dashboard Content minimalista */}
          <div
            style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}
          >
            <p style={{ color: "#B7CCE9", marginBottom: 32 }}>
              Gestiona cursos, usuarios y contenido de la plataforma
            </p>
            {/* Stats */}
            <div className="stats-marquee">
              <div className="stats-marquee-track">
                {this.state.statsCards
                  .concat(this.state.statsCards)
                  .map((card, i) => (
                    <div
                      key={i}
                      className="dashboard-stats-panel"
                      style={{ minWidth: 260, maxWidth: 320, margin: "0 12px" }}
                    >
                      {card.icon}
                      <div style={{ color: "#E6F1FF", fontWeight: 600 }}>
                        {card.label}
                      </div>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: "#E6F1FF",
                        }}
                      >
                        {card.value}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Recent Courses */}
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 2 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <h3 style={{ color: "#E6F1FF", fontWeight: 700, margin: 0 }}>
                    Todos los Cursos
                  </h3>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <button
                      title="Agregar Curso"
                      onClick={this.handleAddCourse}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "linear-gradient(135deg, #00e5ff, #1976d2)",
                        border: "none",
                        borderRadius: 10,
                        padding: "10px 18px",
                        cursor: "pointer",
                        fontWeight: 700,
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0, 229, 255, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 16px rgba(0, 229, 255, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 229, 255, 0.3)";
                      }}
                    >
                      <FaPlus /> Agregar Curso
                    </button>
                    <div style={{ position: "relative" }}>
                      <FaSearch
                        style={{
                          position: "absolute",
                          left: 10,
                          top: 10,
                          color: "#888",
                        }}
                      />
                      <input
                        value={this.state.coursesSearch}
                        onChange={(e) =>
                          this.setState({ coursesSearch: e.target.value })
                        }
                        placeholder="Buscar cursos..."
                        style={{
                          padding: "8px 12px 8px 32px",
                          borderRadius: 10,
                          border: "1.5px solid #ececec",
                          outline: "none",
                          width: 220,
                          background: "#fff",
                        }}
                      />
                    </div>
                    <button
                      title="Filtros"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#fff",
                        border: "1.5px solid #ececec",
                        borderRadius: 10,
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      <FaFilter /> Filtros
                    </button>
                  </div>
                </div>
                <div className="courses-table-wrap">
                  <table className="courses-table">
                    <thead>
                      <tr>
                        <th style={{ width: 380 }}>Curso</th>
                        <th>Categoría</th>
                        <th>Estudiantes</th>
                        <th>Precio</th>
                        <th>Rating</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Implementación de la NOM-035 en el Trabajo",
                          autor: "Dra. Patricia Hernández",
                          categoria: "Seguridad Laboral",
                          estudiantes: 32,
                          precio: 2500,
                          rating: 4.8,
                          estado: "Activo",
                        },
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Curso SAT México - Facturación Electrónica",
                          autor: "Lic. Roberto González",
                          categoria: "Fiscal",
                          estudiantes: 45,
                          precio: 1800,
                          rating: 4.6,
                          estado: "Activo",
                        },
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Crea tu Plataforma de Gestión Empresarial",
                          autor: "Ing. Ana Martínez",
                          categoria: "Tecnología",
                          estudiantes: 23,
                          precio: 4500,
                          rating: 4.9,
                          estado: "Activo",
                        },
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Fundamentos de Liderazgo Empresarial",
                          autor: "Dr. Manuel Ruiz",
                          categoria: "Liderazgo",
                          estudiantes: 156,
                          precio: 0,
                          rating: 4.4,
                          estado: "Activo",
                        },
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Seguridad e Higiene en el Trabajo",
                          autor: "Ing. Laura Pérez",
                          categoria: "Seguridad Laboral",
                          estudiantes: 18,
                          precio: 2200,
                          rating: 4.7,
                          estado: "Activo",
                        },
                        {
                          img: "https://randomuser.me/api/portraits/lego/9.jpg",
                          titulo: "Marketing Digital para Empresas",
                          autor: "Lic. Sofía Vargas",
                          categoria: "Marketing",
                          estudiantes: 67,
                          precio: 1900,
                          rating: 4.5,
                          estado: "Activo",
                        },
                      ]
                        .filter(
                          (r) =>
                            !this.state.coursesSearch ||
                            (r.titulo + " " + r.autor + " " + r.categoria)
                              .toLowerCase()
                              .includes(this.state.coursesSearch.toLowerCase())
                        )
                        .map((r, i) => (
                          <tr key={i}>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                }}
                              >
                                <img
                                  src={r.img}
                                  alt="c"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 8,
                                  }}
                                />
                                <div>
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: "#E6F1FF",
                                    }}
                                  >
                                    {r.titulo}
                                  </div>
                                  <div
                                    style={{ color: "#B7CCE9", fontSize: 13 }}
                                  >
                                    {r.autor}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="pill cat">{r.categoria}</span>
                            </td>
                            <td>{r.estudiantes}</td>
                            <td>
                              {r.precio === 0
                                ? "$0"
                                : `$${r.precio.toLocaleString()}`}
                            </td>
                            <td>
                              <span
                                style={{
                                  color: "#f5a623",
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                }}
                              >
                                <FaStar style={{ color: "#f5a623" }} />{" "}
                                {r.rating}
                              </span>
                            </td>
                            <td>
                              <span className="pill ok">
                                <FaCheckCircle style={{ marginRight: 6 }} />
                                {r.estado}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: 10 }}>
                                <button
                                  className="icon-btn"
                                  title="Ver"
                                  onClick={() => this.handleViewCourse(r)}
                                >
                                  <FaEye />
                                </button>
                                <button
                                  className="icon-btn"
                                  title="Editar"
                                  onClick={() => this.handleEditCourse(r)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="icon-btn danger"
                                  title="Eliminar"
                                  onClick={() => this.handleDeleteCourse(r)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Chart/Events */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: "#E6F1FF",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  Gestión de Contenido
                </h3>
                <div className="content-panel">
                  <div className="content-tabs">
                    {[
                      { key: "Banners", label: "Banners/Portadas" },
                      { key: "Testimonios", label: "Testimonios" },
                      { key: "FAQ", label: "FAQ" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        className={
                          "content-tab" +
                          (this.state.contentActiveTab === t.key
                            ? " active"
                            : "")
                        }
                        onClick={() => this.setContentTab(t.key)}
                      >
                        {t.label}
                      </button>
                    ))}
                    <button
                      className="content-add"
                      onClick={this.openContentAdd}
                    >
                      <FaPlus style={{ marginRight: 6 }} /> Agregar
                    </button>
                  </div>
                  <div className="content-list">
                    {this.getContentList(this.state.contentActiveTab).length ===
                    0 ? (
                      <div className="content-empty">No hay elementos aún</div>
                    ) : (
                      this.getContentList(this.state.contentActiveTab).map(
                        (item, idx) => (
                          <div key={item.id || idx} className="content-item">
                            {this.state.contentActiveTab === "Banners" && (
                              <div className="content-item-media">
                                {item.imagen ? (
                                  <img src={item.imagen} alt="banner" />
                                ) : (
                                  <div className="content-item-placeholder">
                                    Sin imagen
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="content-item-body">
                              {this.state.contentActiveTab === "Banners" && (
                                <>
                                  <div className="content-item-title">
                                    {item.titulo}
                                  </div>
                                  <div className="content-item-sub">
                                    {item.url}
                                  </div>
                                </>
                              )}
                              {this.state.contentActiveTab ===
                                "Testimonios" && (
                                <>
                                  <div className="content-item-title">
                                    {item.nombre}
                                  </div>
                                  <div className="content-item-sub">
                                    {item.mensaje}
                                  </div>
                                </>
                              )}
                              {this.state.contentActiveTab === "FAQ" && (
                                <>
                                  <div className="content-item-title">
                                    {item.pregunta}
                                  </div>
                                  <div className="content-item-sub">
                                    {item.respuesta}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="content-item-actions">
                              <button
                                className="icon-btn"
                                title="Editar"
                                onClick={() => this.openContentEdit(idx)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="icon-btn danger"
                                title="Eliminar"
                                onClick={() => this.openContentDelete(idx)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
                {/* Placeholder for a chart/animation */}
                {/* Busco la sección 'Gráfica de Inscripciones' y reemplazo el SVG por el AreaChart funcional: */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: 16,
                    marginTop: 32,
                    textAlign: "center",
                    boxShadow:
                      "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    Gráfica de Inscripciones
                  </span>
                  <LineChart
                    height={220}
                    series={[
                      {
                        data: [
                          120, 140, 180, 220, 260, 300, 340, 370, 400, 430, 460,
                          500,
                        ],
                        label: "Usuarios",
                        color: "#1976d2",
                        area: true,
                      },
                      {
                        data: [10, 15, 18, 22, 25, 28, 30, 32, 35, 37, 40, 45],
                        label: "Cursos",
                        color: "#8e24aa",
                        area: true,
                      },
                      {
                        data: [
                          60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260,
                          280,
                        ],
                        label: "Inscripciones",
                        color: "#ff9800",
                        area: true,
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: [
                          "Ene",
                          "Feb",
                          "Mar",
                          "Abr",
                          "May",
                          "Jun",
                          "Jul",
                          "Ago",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dic",
                        ],
                        label: "Mes",
                      },
                    ]}
                    yAxis={[{ label: "Cantidad" }]}
                    grid={{ vertical: true, horizontal: true }}
                    sx={{
                      background: "transparent",
                      borderRadius: 3,
                      "--ChartsLegend-rootOffsetY": "12px",
                      "--ChartsLegend-rootOffsetX": "0px",
                      "--ChartsLegend-labelFontWeight": 600,
                      "--ChartsLegend-labelFontSize": "15px",
                    }}
                  />
                </div>
                {/* Más contenido para scroll */}
                <div style={{ marginTop: 40 }}>
                  <h4
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    Usuarios Recientes
                  </h4>
                  <div className="usuarios-recientes-table">
                    <div className="usuarios-recientes-header">
                      <span>Nombre</span>
                      <span>Correo</span>
                      <span>Rol</span>
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="usuarios-recientes-row">
                        <span className="usuarios-recientes-nombre">
                          Usuario {i + 1}
                        </span>
                        <span className="usuarios-recientes-correo">
                          usuario{i + 1}@mail.com
                        </span>
                        <span className="usuarios-recientes-rol">admin</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 40 }}>
                  <h4
                    style={{
                      color: "#E6F1FF",
                      fontWeight: 600,
                      marginBottom: 50,
                      textAlign: "center",
                    }}
                  >
                    Notas y Anuncios
                  </h4>
                  {(() => {
                    const anuncio =
                      this.state.anuncios[this.state.anuncioIndex];
                    return (
                      <div
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 16,
                          boxShadow:
                            "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08)",
                          padding: 32,
                          border: "1px solid rgba(255,255,255,0.12)",
                          maxWidth: 420,
                          margin: "0 auto",
                          position: "relative",
                          textAlign: "center",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: -38,
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          <img
                            src={anuncio.avatar}
                            alt="avatar"
                            style={{
                              width: 76,
                              height: 76,
                              borderRadius: "50%",
                              border: "4px solid #fff",
                              boxShadow: "0 2px 8px #0001",
                            }}
                          />
                        </div>
                        {anuncio.badge && (
                          <div
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 16,
                              background: "#fff",
                              color: "#E87D23",
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: 15,
                              boxShadow: "0 2px 8px #0001",
                            }}
                          >
                            {anuncio.badge}
                          </div>
                        )}
                        <div
                          style={{
                            marginTop: 48,
                            fontWeight: 700,
                            fontSize: 20,
                          }}
                        >
                          <span style={{ color: "#E6F1FF" }}>
                            {anuncio.nombre}
                          </span>
                        </div>
                        <div
                          style={{
                            color: "#444",
                            margin: "18px 0 28px 0",
                            fontSize: 16,
                          }}
                        >
                          <span style={{ color: "#B7CCE9" }}>
                            {anuncio.texto}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 32,
                          }}
                        >
                          <button
                            onClick={this.handlePrevAnuncio}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FaChevronLeft
                              size={28}
                              style={{ color: "#E87D23" }}
                            />
                          </button>
                          <button
                            onClick={this.handleNextAnuncio}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FaChevronRight
                              size={28}
                              style={{ color: "#E87D23" }}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* Más secciones para hacer scroll */}
            <div style={{ marginTop: 64, marginBottom: 64 }}>
              <h2
                style={{ color: "#E6F1FF", fontWeight: 700, marginBottom: 24 }}
              >
                Reportes y Actividad Reciente
              </h2>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="report-card-custom"
                    style={{ minWidth: 320, flex: 1, marginBottom: 24 }}
                  >
                    <div className="report-card-logo">
                      <span className="report-card-logo-circle">EP</span>
                    </div>
                    <div className="report-card-title">REPORTE</div>
                    <div className="report-card-desc">
                      Actividad reciente, cambios en cursos, usuarios o eventos.
                      Detalles y métricas relevantes para el administrador.
                    </div>
                    <div className="report-card-divider"></div>
                    <button className="report-card-btn">
                      VER DETALLES{" "}
                      <span style={{ marginLeft: 6, fontWeight: 700 }}>
                        &rarr;
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Inserto el gráfico en la sección de estadísticas o debajo de las cards: */}
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto 40px auto",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                boxShadow:
                  "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08)",
                padding: 32,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  color: "#E6F1FF",
                  fontWeight: 700,
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                Actividad Administrativa (2025)
              </h3>
              <LineChart
                height={320}
                series={[
                  {
                    data: [5, 7, 8, 10, 12, 14, 13, 15, 16, 18, 20, 22],
                    label: "Reportes",
                    color: "#1976d2",
                    area: true,
                  },
                  {
                    data: [2, 3, 4, 5, 6, 7, 6, 8, 9, 10, 11, 12],
                    label: "Eventos",
                    color: "#ff9800",
                    area: true,
                  },
                  {
                    data: [1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8],
                    label: "Notas/Anuncios",
                    color: "#8e24aa",
                    area: true,
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "point",
                    data: [
                      "Ene",
                      "Feb",
                      "Mar",
                      "Abr",
                      "May",
                      "Jun",
                      "Jul",
                      "Ago",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dic",
                    ],
                    label: "Mes",
                  },
                ]}
                yAxis={[{ label: "Cantidad" }]}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                  background: "transparent",
                  borderRadius: 3,
                  boxShadow: 0,
                  "--ChartsLegend-rootOffsetY": "12px",
                  "--ChartsLegend-rootOffsetX": "0px",
                  "--ChartsLegend-labelFontWeight": 600,
                  "--ChartsLegend-labelFontSize": "15px",
                }}
              />
            </div>
          </div>
        </div>
        {/* ===== Modales de Gestión de Contenido ===== */}
        {this.state.contentShowModal && (
          <div
            className="course-modal-overlay"
            onClick={this.closeContentModal}
          >
            <div
              className="course-modal course-modal-large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>
                  {this.state.contentEditingIndex === null
                    ? `Agregar ${this.state.contentActiveTab}`
                    : `Editar ${this.state.contentActiveTab}`}
                </h3>
                <button
                  className="close-modal-btn"
                  onClick={this.closeContentModal}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form
                onSubmit={this.saveContentItem}
                className="course-modal-content"
              >
                <div className="course-edit-grid">
                  {this.renderContentFormFields()}
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={this.closeContentModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {this.state.contentDeleteModal && (
          <div
            className="course-modal-overlay"
            onClick={this.closeContentDelete}
          >
            <div
              className="course-modal course-modal-small"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>Eliminar {this.state.contentActiveTab}</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.closeContentDelete}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="course-modal-content">
                <div className="delete-warning">
                  <FaTrash
                    size={48}
                    style={{ color: "#e74c3c", marginBottom: 16 }}
                  />
                  <p
                    style={{ color: "#E6F1FF", fontSize: 16, marginBottom: 12 }}
                  >
                    ¿Seguro que deseas eliminar este elemento?
                  </p>
                  <p style={{ color: "#c0392b", fontSize: 13 }}>
                    Esta acción no se puede deshacer
                  </p>
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={this.closeContentDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={this.confirmContentDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <style>{`
:root {
  /* App background with dark neon accents */
  --app-bg:
    radial-gradient(1000px 500px at 10% 0%, rgba(0,229,255,0.08), transparent 60%),
    radial-gradient(900px 500px at 90% 20%, rgba(94,0,255,0.08), transparent 60%),
    linear-gradient(180deg, #0a0f1a 0%, #0c1220 55%, #0b1426 100%);

  /* Glass tokens */
  --glass-bg: rgba(8,14,26,0.55);
  --glass-border: rgba(255,255,255,0.12);
  --glass-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08);

  /* Text & accents */
  --text-primary: #E6F1FF;
  --text-secondary: #B7CCE9;
  --accent-cyan: #7eeaff;
  --accent-blue: #1976d2;
}
.hero-header {
  position: relative;
  width: 100%;
  padding: 80px 0 60px 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 100%);
}
.hero-header::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(600px 260px at 20% 30%, rgba(0,229,255,0.12), transparent 60%),
    radial-gradient(480px 220px at 70% 20%, rgba(255,145,0,0.10), transparent 60%);
  filter: blur(0.3px);
}
.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  z-index: 1;
}
.hero-kicker {
  color: var(--text-secondary);
  letter-spacing: 0.25em;
  font-size: 12px;
  margin-bottom: 12px;
}
.hero-title {
  font-size: clamp(38px, 8vw, 84px);
  color: #fff;
  letter-spacing: 0.06em;
  font-weight: 800;
  margin: 0 0 8px 0;
}
.hero-subtitle {
  color: var(--text-secondary);
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0;
}
.usuarios-recientes-table {
  width: 100%;
  background: var(--glass-bg);
  border-radius: 14px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  padding: 8px 0 8px 0;
  font-size: 15px;
  margin-bottom: 8px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.usuarios-recientes-header {
  display: flex;
  justify-content: space-between;
  background: rgba(255,255,255,0.06);
  color: var(--text-primary);
  font-weight: 700;
  padding: 12px 24px;
  font-size: 16px;
  border-bottom: 1px solid var(--glass-border);
}
.usuarios-recientes-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.06);
  margin: 0 16px 12px 16px;
  border-radius: 10px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  padding: 12px 24px;
  transition: box-shadow 0.18s, transform 0.12s, background 0.18s;
}
.usuarios-recientes-row:hover {
  box-shadow: 0 8px 24px rgba(16,137,255,0.12);
  background: rgba(255,255,255,0.10);
  transform: translateY(-1px);
}
.usuarios-recientes-nombre {
  color: var(--text-primary);
  font-weight: 600;
}
.usuarios-recientes-correo {
  color: var(--text-secondary);
}
.usuarios-recientes-rol {
  color: var(--accent-cyan);
  font-weight: 600;
}
/* Reportes y Actividad Reciente - Card Custom Design */
.report-card-custom {
  background: var(--glass-bg);
  border-radius: 18px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  padding: 38px 32px 32px 32px;
  color: var(--text-primary);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 340px;
  max-width: 370px;
  margin: 0 auto 24px auto;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.report-card-logo {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.report-card-logo-circle {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
  color: #fff;
  font-weight: 700;
  font-size: 22px;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glass-shadow);
  border: 4px solid rgba(255,255,255,0.6);
  margin-bottom: 8px;
}
.report-card-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-align: center;
  margin-top: 38px;
  margin-bottom: 18px;
  color: var(--text-primary);
  font-family: inherit;
}
.report-card-desc {
  font-size: 17px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 18px;
  margin-top: 0;
  line-height: 1.5;
}
.report-card-divider {
  width: 60px;
  height: 2.5px;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
  margin: 0 auto 24px auto;
  border-radius: 2px;
}
.report-card-btn {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent-cyan);
  background: none;
  border: none;
  letter-spacing: 0.12em;
  margin-top: 8px;
  cursor: pointer;
  transition: color 0.18s;
  outline: none;
  text-align: center;
  font-family: inherit;
}
.report-card-btn:hover {
  color: var(--accent-blue);
  text-decoration: underline;
}
.sidebar-tab {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 200;
  background: var(--glass-bg);
  color: var(--text-primary);
  border-radius: 0 12px 12px 0;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  padding: 12px 6px 12px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.2s, transform 0.12s, box-shadow 0.2s;
  font-family: inherit;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.sidebar-tab:hover {
  background: rgba(255,255,255,0.10);
  transform: translateX(2px);
}
.sidebar-notif {
  position: fixed;
  top: 240px; /* debajo de la pestaña (que está en top:120px) */
  left: -6px;
  z-index: 201;
  background: var(--glass-bg);
  color: var(--accent-cyan);
  border-radius: 50%;
  padding: 10px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.sidebar-notif:hover { background: rgba(255,255,255,0.10); }
.sidebar-notif-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e53935;
  color: #fff;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}
.sidebar-admin {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  border-right: 1px solid var(--glass-border);
  z-index: 300;
  display: flex;
  flex-direction: column;
  padding: 0 0 24px 0;
  transition: left 0.35s cubic-bezier(.68,-0.55,.27,1.55);
  font-family: inherit;
  pointer-events: none;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.sidebar-admin.open {
  left: 0;
  pointer-events: auto;
}
.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 16px 0;
  border-bottom: 1px solid var(--glass-border);
  position: relative;
}
.sidebar-close {
  position: absolute;
  right: 12px;
  top: 12px;
  background: rgba(255,255,255,0.06);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--glass-shadow);
  transition: background 0.2s, transform 0.12s;
}
.sidebar-close:hover {
  background: rgba(255,255,255,0.12);
  transform: translateY(-1px);
}
.sidebar-section {
  margin: 18px 0 0 0;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.18s, color 0.18s;
}
.sidebar-link:hover {
  background: rgba(255,255,255,0.08);
  color: var(--text-primary);
}
.sidebar-badge {
  background: rgba(0,229,255,0.12);
  color: #fff;
  font-size: 12px;
  border-radius: 8px;
  padding: 2px 8px;
  margin-left: auto;
  font-weight: 600;
}
.sidebar-status {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 15px;
  color: #888;
}
.sidebar-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}
.sidebar-dot.online {
  background: #4fd964;
  box-shadow: 0 0 6px #4fd96499;
}
.sidebar-logout {
  margin-top: 18px;
  background: rgba(255,255,255,0.06);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  box-shadow: var(--glass-shadow);
  transition: background 0.2s, color 0.2s, transform 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-logout:hover {
  background: rgba(255,255,255,0.12);
  transform: translateY(-1px);
}
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 250;
  transition: background 0.2s;
}
.curso-card-3d {
  background: #DFDDE2;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px #bfae9e55, 0 2px 8px #0001 inset, 0 1.5px 0 #fff inset;
  border: 1.5px solid #877267;
  border-bottom: 2.5px solid #877267;
  border-right: 2.5px solid #877267;
  transition: 
    box-shadow 0.18s cubic-bezier(.4,2,.6,1), 
    transform 0.12s cubic-bezier(.4,2,.6,1),
    border-bottom 0.12s, border-right 0.12s;
  cursor: pointer;
  will-change: transform, box-shadow;
  position: relative;
  outline: none;
}
.curso-card-3d:active,
.curso-card-3d:focus:active {
  transform: translateY(6px) scale(0.98);
  box-shadow: 0 2px 6px #bfae9e33, 0 1px 2px #0001 inset;
  border-bottom: 1px solid #877267;
  border-right: 1px solid #877267;
}
.curso-card-3d:focus {
  box-shadow: 0 0 0 2px #4f8cff55, 0 8px 24px #bfae9e55, 0 2px 8px #0001 inset;
}
.evento-flip-card {
  background: none;
  width: 100%;
  height: 110px;
  perspective: 900px;
  margin-bottom: 16px;
  border-radius: 16px;
  display: flex;
  align-items: stretch;
}
.evento-flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(.4,2,.6,1);
  transform-style: preserve-3d;
  border-radius: 16px;
}
.evento-flip-card:hover .evento-flip-card-inner,
.evento-flip-card:focus-within .evento-flip-card-inner {
  transform: rotateY(180deg);
}
.evento-flip-card-front, .evento-flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
}
.evento-flip-card-front {
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  padding: 18px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.evento-flip-card-back {
  background: rgba(0,0,0,0.4);
  color: #fff;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.evento-flip-card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}
.navbar-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 14px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  background: none;
  transition: color 0.18s cubic-bezier(.4,2,.6,1);
  z-index: 1;
  overflow: visible;
}
.navbar-link::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 75%;
  width: 100px;
  height: 75px;
  transform: translate(-50%, -55%) scale(0.7, 0.7);
  border-radius: 32px 32px 40px 40px / 32px 32px 60px 60px;
  background: rgba(255,255,255,0.08);
  opacity: 0;
  box-shadow: var(--glass-shadow);
  transition: opacity 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s cubic-bezier(.4,2,.6,1);
  z-index: -1;
}
.navbar-link:hover, .navbar-link:focus {
  color: var(--text-primary);
  font-weight: 700;
  background: rgba(255,255,255,0.06);
}
.navbar-link:hover::before, .navbar-link:focus::before {
  opacity: 1;
  transform: translate(-50%, -55%) scale(1, 1.1);
  background: rgba(255,255,255,0.08);
}
.table, table, th, td {
  border: 1.5px solid #21100F;
}
.dashboard-stats-panel {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
.stats-marquee {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1320px;
  overflow: hidden;
  margin: 0 auto 32px auto;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.stats-marquee-track {
  display: flex;
  white-space: nowrap;
  animation: stats-marquee-anim 25s linear infinite;
}
.stats-marquee:hover .stats-marquee-track {
  animation-play-state: paused;
}
@keyframes stats-marquee-anim {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.navbar-link.dropdown-link::before {
  display: none !important;
  content: none !important;
  background: none !important;
  box-shadow: none !important;
}
.navbar-link.dropdown-link {
  background: none !important;
  font-weight: 700;
  color: #213547 !important;
}
.navbar-link.dropdown-link:hover, .navbar-link.dropdown-link:focus {
  background: #f7f7fa !important;
  color: #000 !important;
  font-weight: 700;
}
/* Badge flotante de estado */
.floating-status {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 8px 12px;
  box-shadow: var(--glass-shadow);
  font-weight: 600;
}
/* Cursos - tabla estilo como el mock */
.courses-table-wrap {
  background: rgba(255,255,255,0.06);
  border-radius: 14px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.courses-table-wrap .courses-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.courses-table-wrap .courses-table thead th {
  text-align: left;
  background: rgba(255,255,255,0.06);
  color: var(--text-primary);
  font-weight: 700;
  padding: 12px 16px;
  border-bottom: 1px solid var(--glass-border);
  font-size: 14px;
}
.courses-table-wrap .courses-table tbody td {
  padding: 18px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  color: var(--text-secondary);
  font-size: 14px;
  vertical-align: middle;
}
.courses-table-wrap .pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.3px;
  line-height: 1.4;
}
.courses-table-wrap .pill.cat {
  background: rgba(0,229,255,0.12);
  color: #7eeaff;
  border: 1.5px solid rgba(0,229,255,0.30);
  padding: 7px 16px;
}
.courses-table-wrap .pill.ok {
  background: rgba(79,217,100,0.15);
  color: #7ef7a0;
  border: 1.5px solid rgba(79,217,100,0.40);
  padding: 7px 12px;
  gap: 6px;
}
.courses-table-wrap .icon-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  color: var(--text-secondary);
  box-shadow: var(--glass-shadow);
}
.courses-table-wrap .icon-btn:hover { color: var(--text-primary); }
.courses-table-wrap .icon-btn.danger { color: #c0392b; }

/* Evitar que la regla global de tabla pinte bordes aquí */
.courses-table-wrap table, .courses-table-wrap th, .courses-table-wrap td {
  border: none !important;
}

/* ========== MODALES DE CURSOS ========== */
.course-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
}

.course-modal {
  background: rgba(30, 36, 50, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.4s ease-out;
}

.course-modal-large {
  max-width: 800px;
}

.course-modal-small {
  max-width: 450px;
}

.course-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.course-modal-header h3 {
  color: #E6F1FF;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.course-modal-content {
  padding: 28px;
}

.course-detail-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.course-detail-img {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.course-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.course-detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-label {
  color: #B7CCE9;
  font-size: 13px;
  font-weight: 500;
}

.detail-value {
  color: #E6F1FF;
  font-size: 16px;
  font-weight: 600;
}

/* Formulario de Edición */
.course-edit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.form-group-modal {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group-modal label {
  color: #B7CCE9;
  font-size: 14px;
  font-weight: 600;
}

.form-group-modal input,
.form-group-modal select {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 14px;
  color: #E6F1FF;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.form-group-modal input:focus,
.form-group-modal select:focus {
  border-color: rgba(0, 229, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.form-group-modal select option {
  background: #1e2432;
  color: #E6F1FF;
}

/* Modal de Eliminación */
.delete-warning {
  text-align: center;
  padding: 20px 0;
}

/* Botones del Modal */
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn-cancel,
.btn-save,
.btn-delete {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.06);
  color: #B7CCE9;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #E6F1FF;
}

.btn-save {
  background: rgba(0, 229, 255, 0.2);
  color: #7eeaff;
  border: 1px solid rgba(0, 229, 255, 0.4);
}

.btn-save:hover {
  background: rgba(0, 229, 255, 0.3);
  transform: translateY(-2px);
}

.btn-delete {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.4);
}

.btn-delete:hover {
  background: rgba(231, 76, 60, 0.3);
  transform: translateY(-2px);
}

/* Nota informativa en formulario de agregar */
.add-course-note {
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  color: #7eeaff;
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-course-note i {
  font-size: 18px;
}

/* Responsive para modales */
@media only screen and (max-width: 768px) {
  .course-modal {
    width: 95%;
    max-height: 90vh;
  }

  .course-edit-grid {
    grid-template-columns: 1fr;
  }

  .course-detail-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .btn-cancel,
  .btn-save,
  .btn-delete {
    width: 100%;
  }
}

/* ===== Estilos Gestión de Contenido ===== */
.content-panel {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.content-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.content-tab {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--glass-border);
  color: var(--text-secondary);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.content-tab.active {
  color: var(--text-primary);
  background: rgba(255,255,255,0.10);
}
.content-add {
  margin-left: auto;
  background: linear-gradient(135deg, #00e5ff, #1976d2);
  border: none;
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}
.content-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 10px;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 8px 10px;
}
.content-item-media img {
  width: 80px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
}
.content-item-placeholder {
  width: 80px;
  height: 48px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 12px;
}
.content-item-title {
  color: var(--text-primary);
  font-weight: 700;
}
.content-item-sub {
  color: var(--text-secondary);
  font-size: 13px;
}
`}</style>
      </>
    );
  }
}

export default withRouter(DashboardAdmin);
