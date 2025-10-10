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
  FaClock, // <-- Ícono de reloj para duración
  FaStickyNote, // <-- Ícono de libreta para notas
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
      rendimientoExpanded: false, // <-- Estado para el panel de rendimiento del sistema
      coursesSearch: "",
      // Estados para paginación de cursos
      currentPage: 1,
      coursesPerPage: 4,
      // Estado para modal de notas y anuncios
      showNotesModal: false,
      // Estados para modales de cursos
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      selectedCourse: null,
      // Drawer para Gestión de Contenido
      showContentDrawer: false,
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
      // ===== Estados para Gestión de Eventos =====
      eventos: [
        {
          id: 1,
          titulo: "Capacitación NOM-035",
          fecha: "2024-07-20",
          hora: "10:00",
          duracion: "4 horas",
          ubicacion: "Sala de Conferencias A",
          descripcion:
            "Capacitación sobre la implementación de la NOM-035 en el trabajo",
          instructor: "Dra. Patricia Hernández",
          asistentes: ["Juan Pérez", "María López", "Carlos García"],
          estado: "programado",
          recordatorios: [
            { tipo: "email", tiempo: "1 día antes" },
            { tipo: "sms", tiempo: "2 horas antes" },
          ],
        },
        {
          id: 2,
          titulo: "Seminario de Liderazgo",
          fecha: "2024-07-25",
          hora: "14:00",
          duracion: "3 horas",
          ubicacion: "Auditorio Principal",
          descripcion: "Técnicas modernas de liderazgo empresarial",
          instructor: "Dr. Manuel Ruiz",
          asistentes: ["Ana Martínez", "Roberto González"],
          estado: "programado",
          recordatorios: [],
        },
      ],
      // Modales de eventos
      showEventRegisterModal: false,
      showEventEditModal: false,
      showEventDeleteModal: false,
      showEventListModal: false,
      showEventRemindersModal: false,
      showEventAttendeesModal: false,
      showEventReportsModal: false,
      showEventNotificationsModal: false,
      // Formularios de eventos
      eventForm: {
        titulo: "",
        fecha: "",
        hora: "",
        duracion: "",
        ubicacion: "",
        descripcion: "",
        instructor: "",
        asistentes: [],
        estado: "programado",
      },
      selectedEvent: null,
      eventToDelete: null,
      // Estados para recordatorios
      reminderForm: {
        eventId: null,
        tipo: "email",
        tiempo: "1 día antes",
        mensaje: "",
      },
      // Estados para asistentes
      attendeeForm: {
        eventId: null,
        nombre: "",
        email: "",
        telefono: "",
      },
      newAttendee: "",
      // Estados para reportes
      reportFilters: {
        fechaInicio: "",
        fechaFin: "",
        estado: "todos",
        instructor: "",
      },
      // Estados para notificaciones
      notificationSettings: {
        emailEnabled: true,
        smsEnabled: false,
        tiempoAnticipacion: "1 día",
        recordatorioAutomatico: true,
      },
      // Estados para tooltips personalizados
      customTooltip: {
        show: false,
        text: "",
        x: 0,
        y: 0,
        type: "",
      },
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

  handleNavigateToModule = (modulePath) => {
    this.setState({ modulosDropdownOpen: false });
    this.props.router.navigate(modulePath);
  };

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

  // Funciones para Modal de Notas y Anuncios
  handleOpenNotesModal = () => {
    this.setState({ showNotesModal: true });
  };

  handleCloseNotesModal = () => {
    this.setState({ showNotesModal: false });
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

  // ===== FUNCIONES PARA GESTIÓN DE EVENTOS =====

  // Registrar Eventos
  handleOpenEventRegister = () => {
    this.setState({
      showEventRegisterModal: true,
      eventForm: {
        titulo: "",
        fecha: "",
        hora: "",
        duracion: "",
        ubicacion: "",
        descripcion: "",
        instructor: "",
        asistentes: [],
        estado: "programado",
      },
    });
  };

  handleCloseEventRegister = () => {
    this.setState({ showEventRegisterModal: false });
  };

  handleEventInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      eventForm: {
        ...prevState.eventForm,
        [name]: value,
      },
    }));
  };

  handleSaveEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...this.state.eventForm,
      asistentes: [],
      recordatorios: [],
    };
    this.setState((prevState) => ({
      eventos: [...prevState.eventos, newEvent],
      showEventRegisterModal: false,
    }));
    alert("Evento registrado exitosamente!");
  };

  // Modificar Eventos
  handleOpenEventEdit = () => {
    this.setState({ showEventListModal: true, modalType: "edit" });
  };

  handleEditEvent = (event) => {
    this.setState({
      showEventEditModal: true,
      selectedEvent: event,
      eventForm: { ...event },
      showEventListModal: false,
    });
  };

  handleCloseEventEdit = () => {
    this.setState({
      showEventEditModal: false,
      selectedEvent: null,
    });
  };

  handleUpdateEvent = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      eventos: prevState.eventos.map((event) =>
        event.id === prevState.selectedEvent.id
          ? { ...prevState.eventForm }
          : event
      ),
      showEventEditModal: false,
    }));
    alert("Evento actualizado exitosamente!");
  };

  // Eliminar Eventos
  handleOpenEventDelete = () => {
    this.setState({ showEventListModal: true, modalType: "delete" });
  };

  handleDeleteEvent = (event) => {
    this.setState({
      showEventDeleteModal: true,
      eventToDelete: event,
      showEventListModal: false,
    });
  };

  handleConfirmDeleteEvent = () => {
    this.setState((prevState) => ({
      eventos: prevState.eventos.filter(
        (event) => event.id !== prevState.eventToDelete.id
      ),
      showEventDeleteModal: false,
      eventToDelete: null,
    }));
    alert("Evento eliminado exitosamente!");
  };

  handleCloseEventDelete = () => {
    this.setState({
      showEventDeleteModal: false,
      eventToDelete: null,
    });
  };

  // Ver Lista de Eventos
  handleOpenEventList = () => {
    this.setState({ showEventListModal: true, modalType: "view" });
  };

  handleCloseEventList = () => {
    this.setState({ showEventListModal: false, modalType: null });
  };

  // Configurar Recordatorios
  handleOpenEventReminders = () => {
    this.setState({ showEventListModal: true, modalType: "reminders" });
  };

  handleConfigureReminders = (event) => {
    this.setState({
      showEventRemindersModal: true,
      selectedEvent: event,
      reminderForm: {
        eventId: event.id,
        tipo: "email",
        tiempo: "1 día antes",
        mensaje: "",
      },
      showEventListModal: false,
    });
  };

  handleCloseEventReminders = () => {
    this.setState({
      showEventRemindersModal: false,
      selectedEvent: null,
    });
  };

  handleReminderInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      reminderForm: {
        ...prevState.reminderForm,
        [name]: value,
      },
    }));
  };

  handleSaveReminder = (e) => {
    e.preventDefault();
    const newReminder = {
      tipo: this.state.reminderForm.tipo,
      tiempo: this.state.reminderForm.tiempo,
      mensaje: this.state.reminderForm.mensaje,
    };

    this.setState((prevState) => ({
      eventos: prevState.eventos.map((event) =>
        event.id === prevState.selectedEvent.id
          ? { ...event, recordatorios: [...event.recordatorios, newReminder] }
          : event
      ),
      showEventRemindersModal: false,
    }));
    alert("Recordatorio configurado exitosamente!");
  };

  // Gestionar Asistentes
  handleOpenEventAttendees = () => {
    this.setState({ showEventListModal: true, modalType: "attendees" });
  };

  handleManageAttendees = (event) => {
    this.setState({
      showEventAttendeesModal: true,
      selectedEvent: event,
      newAttendee: "",
      showEventListModal: false,
    });
  };

  handleCloseEventAttendees = () => {
    this.setState({
      showEventAttendeesModal: false,
      selectedEvent: null,
      newAttendee: "",
    });
  };

  handleAddAttendee = () => {
    if (this.state.newAttendee.trim()) {
      this.setState((prevState) => ({
        eventos: prevState.eventos.map((event) =>
          event.id === prevState.selectedEvent.id
            ? {
                ...event,
                asistentes: [...event.asistentes, prevState.newAttendee],
              }
            : event
        ),
        selectedEvent: {
          ...prevState.selectedEvent,
          asistentes: [
            ...prevState.selectedEvent.asistentes,
            prevState.newAttendee,
          ],
        },
        newAttendee: "",
      }));
    }
  };

  handleRemoveAttendee = (attendeeIndex) => {
    this.setState((prevState) => ({
      eventos: prevState.eventos.map((event) =>
        event.id === prevState.selectedEvent.id
          ? {
              ...event,
              asistentes: event.asistentes.filter(
                (_, index) => index !== attendeeIndex
              ),
            }
          : event
      ),
      selectedEvent: {
        ...prevState.selectedEvent,
        asistentes: prevState.selectedEvent.asistentes.filter(
          (_, index) => index !== attendeeIndex
        ),
      },
    }));
  };

  // Generar Reportes
  handleOpenEventReports = () => {
    this.setState({
      showEventReportsModal: true,
      reportFilters: {
        fechaInicio: "",
        fechaFin: "",
        estado: "todos",
        instructor: "",
      },
    });
  };

  handleCloseEventReports = () => {
    this.setState({ showEventReportsModal: false });
  };

  handleReportFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      reportFilters: {
        ...prevState.reportFilters,
        [name]: value,
      },
    }));
  };

  handleGenerateReport = () => {
    const { eventos, reportFilters } = this.state;
    let filteredEvents = eventos;

    if (reportFilters.fechaInicio) {
      filteredEvents = filteredEvents.filter(
        (event) => event.fecha >= reportFilters.fechaInicio
      );
    }
    if (reportFilters.fechaFin) {
      filteredEvents = filteredEvents.filter(
        (event) => event.fecha <= reportFilters.fechaFin
      );
    }
    if (reportFilters.estado !== "todos") {
      filteredEvents = filteredEvents.filter(
        (event) => event.estado === reportFilters.estado
      );
    }
    if (reportFilters.instructor) {
      filteredEvents = filteredEvents.filter((event) =>
        event.instructor
          .toLowerCase()
          .includes(reportFilters.instructor.toLowerCase())
      );
    }

    console.log("Reporte generado:", filteredEvents);
    alert(`Reporte generado con ${filteredEvents.length} eventos`);
  };

  // Configurar Notificaciones
  handleOpenEventNotifications = () => {
    this.setState({ showEventNotificationsModal: true });
  };

  handleCloseEventNotifications = () => {
    this.setState({ showEventNotificationsModal: false });
  };

  handleNotificationSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prevState) => ({
      notificationSettings: {
        ...prevState.notificationSettings,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  handleSaveNotificationSettings = () => {
    alert("Configuración de notificaciones guardada exitosamente!");
    this.setState({ showEventNotificationsModal: false });
  };

  // Funciones de paginación para cursos
  handleNextPage = () => {
    const { currentPage, coursesPerPage } = this.state;
    const totalCourses = this.getFilteredCourses().length;
    const totalPages = Math.ceil(totalCourses / coursesPerPage);

    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handlePrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  handleGoToPage = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  getFilteredCourses = () => {
    const allCourses = [
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
    ];

    return allCourses.filter(
      (r) =>
        !this.state.coursesSearch ||
        (r.titulo + " " + r.autor + " " + r.categoria)
          .toLowerCase()
          .includes(this.state.coursesSearch.toLowerCase())
    );
  };

  getPaginatedCourses = () => {
    const { currentPage, coursesPerPage } = this.state;
    const filteredCourses = this.getFilteredCourses();
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  };

  // Funciones para tooltips personalizados
  showCustomTooltip = (e, text, type = "default") => {
    const rect = e.target.getBoundingClientRect();
    this.setState({
      customTooltip: {
        show: true,
        text: text,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        type: type,
      },
    });
  };

  hideCustomTooltip = () => {
    this.setState({
      customTooltip: {
        show: false,
        text: "",
        x: 0,
        y: 0,
        type: "",
      },
    });
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
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEditModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
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
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-glass-base btn-glass-danger btn-glass-md"
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
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseAddModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
                    Crear Curso
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===== MODALES DE GESTIÓN DE EVENTOS ===== */}

        {/* MODAL REGISTRAR EVENTO */}
        {this.state.showEventRegisterModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventRegister}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Registrar Nuevo Evento</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventRegister}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form onSubmit={this.handleSaveEvent} className="event-form">
                <div className="form-grid">
                  <div className="form-group-modal">
                    <label>Título del Evento *</label>
                    <input
                      type="text"
                      name="titulo"
                      value={this.state.eventForm.titulo}
                      onChange={this.handleEventInputChange}
                      placeholder="Ej: Capacitación NOM-035"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Fecha *</label>
                    <input
                      type="date"
                      name="fecha"
                      value={this.state.eventForm.fecha}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Hora *</label>
                    <input
                      type="time"
                      name="hora"
                      value={this.state.eventForm.hora}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Duración *</label>
                    <input
                      type="text"
                      name="duracion"
                      value={this.state.eventForm.duracion}
                      onChange={this.handleEventInputChange}
                      placeholder="Ej: 2 horas"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Ubicación *</label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={this.state.eventForm.ubicacion}
                      onChange={this.handleEventInputChange}
                      placeholder="Ej: Sala de Conferencias A"
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={this.state.eventForm.instructor}
                      onChange={this.handleEventInputChange}
                      placeholder="Ej: Dr. Juan Pérez"
                      required
                    />
                  </div>
                </div>
                <div className="form-group-modal">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={this.state.eventForm.descripcion}
                    onChange={this.handleEventInputChange}
                    placeholder="Descripción del evento..."
                    rows="3"
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEventRegister}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
                    Registrar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL LISTA DE EVENTOS */}
        {this.state.showEventListModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventList}
          >
            <div
              className="course-modal large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>
                  {this.state.modalType === "edit" &&
                    "Seleccionar Evento para Editar"}
                  {this.state.modalType === "delete" &&
                    "Seleccionar Evento para Eliminar"}
                  {this.state.modalType === "reminders" &&
                    "Seleccionar Evento para Recordatorios"}
                  {this.state.modalType === "attendees" &&
                    "Seleccionar Evento para Gestionar Asistentes"}
                  {this.state.modalType === "view" && "Lista de Eventos"}
                </h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventList}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="events-list">
                {this.state.eventos.length === 0 ? (
                  <div className="no-events">
                    <FaCalendarAlt size={48} color="#666" />
                    <p>No hay eventos registrados</p>
                  </div>
                ) : (
                  this.state.eventos.map((event) => (
                    <div key={event.id} className="event-item">
                      <div className="event-info">
                        <h4>{event.titulo}</h4>
                        <p>
                          <FaCalendarAlt /> {event.fecha} - {event.hora}
                        </p>
                        <p>
                          <FaUsers /> Instructor: {event.instructor}
                        </p>
                        <p>
                          <FaBook /> Ubicación: {event.ubicacion}
                        </p>
                        <p>
                          <FaClock /> Duración: {event.duracion}
                        </p>
                        <span className={`event-status ${event.estado}`}>
                          {event.estado}
                        </span>
                      </div>
                      <div className="event-actions">
                        {this.state.modalType === "edit" && (
                          <button
                            className="btn-glass-base btn-glass-primary btn-glass-sm"
                            onClick={() => this.handleEditEvent(event)}
                          >
                            <FaEdit /> Editar
                          </button>
                        )}
                        {this.state.modalType === "delete" && (
                          <button
                            className="btn-glass-base btn-glass-danger btn-glass-sm"
                            onClick={() => this.handleDeleteEvent(event)}
                          >
                            <FaTrash /> Eliminar
                          </button>
                        )}
                        {this.state.modalType === "reminders" && (
                          <button
                            className="btn-glass-base btn-glass-primary btn-glass-sm"
                            onClick={() => this.handleConfigureReminders(event)}
                          >
                            <FaBell /> Recordatorios
                          </button>
                        )}
                        {this.state.modalType === "attendees" && (
                          <button
                            className="btn-glass-base btn-glass-primary btn-glass-sm"
                            onClick={() => this.handleManageAttendees(event)}
                          >
                            <FaUsers /> Asistentes
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL EDITAR EVENTO */}
        {this.state.showEventEditModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventEdit}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Editar Evento</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventEdit}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form onSubmit={this.handleUpdateEvent} className="event-form">
                <div className="form-grid">
                  <div className="form-group-modal">
                    <label>Título del Evento *</label>
                    <input
                      type="text"
                      name="titulo"
                      value={this.state.eventForm.titulo}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Fecha *</label>
                    <input
                      type="date"
                      name="fecha"
                      value={this.state.eventForm.fecha}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Hora *</label>
                    <input
                      type="time"
                      name="hora"
                      value={this.state.eventForm.hora}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Duración *</label>
                    <input
                      type="text"
                      name="duracion"
                      value={this.state.eventForm.duracion}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Ubicación *</label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={this.state.eventForm.ubicacion}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label>Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={this.state.eventForm.instructor}
                      onChange={this.handleEventInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group-modal">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={this.state.eventForm.descripcion}
                    onChange={this.handleEventInputChange}
                    rows="3"
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEventEdit}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
                    Actualizar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ELIMINAR EVENTO */}
        {this.state.showEventDeleteModal && this.state.eventToDelete && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventDelete}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Eliminar Evento</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventDelete}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="delete-confirmation">
                <div className="delete-icon">
                  <FaTrash size={48} color="#ff5252" />
                </div>
                <h4>¿Estás seguro de eliminar este evento?</h4>
                <p>
                  <strong>{this.state.eventToDelete.titulo}</strong>
                </p>
                <p>
                  Fecha: {this.state.eventToDelete.fecha} -{" "}
                  {this.state.eventToDelete.hora}
                </p>
                <p>Esta acción no se puede deshacer.</p>
                <div className="modal-actions">
                  <button
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEventDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-glass-base btn-glass-danger btn-glass-md"
                    onClick={this.handleConfirmDeleteEvent}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL RECORDATORIOS */}
        {this.state.showEventRemindersModal && this.state.selectedEvent && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventReminders}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Configurar Recordatorios</h3>
                <p>{this.state.selectedEvent.titulo}</p>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventReminders}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <form onSubmit={this.handleSaveReminder}>
                <div className="form-grid">
                  <div className="form-group-modal">
                    <label>Tipo de Recordatorio</label>
                    <select
                      name="tipo"
                      value={this.state.reminderForm.tipo}
                      onChange={this.handleReminderInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Notificación Push</option>
                    </select>
                  </div>
                  <div className="form-group-modal">
                    <label>Tiempo de Anticipación</label>
                    <select
                      name="tiempo"
                      value={this.state.reminderForm.tiempo}
                      onChange={this.handleReminderInputChange}
                    >
                      <option value="15 minutos antes">15 minutos antes</option>
                      <option value="30 minutos antes">30 minutos antes</option>
                      <option value="1 hora antes">1 hora antes</option>
                      <option value="2 horas antes">2 horas antes</option>
                      <option value="1 día antes">1 día antes</option>
                      <option value="3 días antes">3 días antes</option>
                      <option value="1 semana antes">1 semana antes</option>
                    </select>
                  </div>
                </div>
                <div className="form-group-modal">
                  <label>Mensaje Personalizado</label>
                  <textarea
                    name="mensaje"
                    value={this.state.reminderForm.mensaje}
                    onChange={this.handleReminderInputChange}
                    placeholder="Mensaje personalizado para el recordatorio..."
                    rows="3"
                  />
                </div>
                <div className="existing-reminders">
                  <h4>Recordatorios Actuales:</h4>
                  {this.state.selectedEvent.recordatorios.length === 0 ? (
                    <p>No hay recordatorios configurados</p>
                  ) : (
                    this.state.selectedEvent.recordatorios.map(
                      (reminder, index) => (
                        <div key={index} className="reminder-item">
                          <span>
                            {reminder.tipo} - {reminder.tiempo}
                          </span>
                        </div>
                      )
                    )
                  )}
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEventReminders}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
                    Agregar Recordatorio
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ASISTENTES */}
        {this.state.showEventAttendeesModal && this.state.selectedEvent && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventAttendees}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Gestionar Asistentes</h3>
                <p>{this.state.selectedEvent.titulo}</p>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventAttendees}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="attendees-manager">
                <div className="add-attendee">
                  <h4>Agregar Asistente</h4>
                  <div className="attendee-input-group">
                    <input
                      type="text"
                      value={this.state.newAttendee}
                      onChange={(e) =>
                        this.setState({ newAttendee: e.target.value })
                      }
                      placeholder="Nombre del asistente"
                    />
                    <button
                      type="button"
                      className="btn-glass-base btn-glass-primary btn-glass-sm"
                      onClick={this.handleAddAttendee}
                    >
                      <FaPlus /> Agregar
                    </button>
                  </div>
                </div>
                <div className="attendees-list">
                  <h4>
                    Asistentes Registrados (
                    {this.state.selectedEvent.asistentes.length})
                  </h4>
                  {this.state.selectedEvent.asistentes.length === 0 ? (
                    <p>No hay asistentes registrados</p>
                  ) : (
                    this.state.selectedEvent.asistentes.map(
                      (attendee, index) => (
                        <div key={index} className="attendee-item">
                          <span>{attendee}</span>
                          <button
                            className="btn-glass-base btn-glass-danger btn-glass-sm"
                            onClick={() => this.handleRemoveAttendee(index)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-glass-base btn-glass-primary btn-glass-md"
                  onClick={this.handleCloseEventAttendees}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL REPORTES */}
        {this.state.showEventReportsModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventReports}
          >
            <div
              className="course-modal large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="course-modal-header">
                <h3>Generar Reportes de Eventos</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventReports}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="reports-generator">
                <div className="report-filters">
                  <h4>Filtros de Reporte</h4>
                  <div className="form-grid">
                    <div className="form-group-modal">
                      <label>Fecha Inicio</label>
                      <input
                        type="date"
                        name="fechaInicio"
                        value={this.state.reportFilters.fechaInicio}
                        onChange={this.handleReportFilterChange}
                      />
                    </div>
                    <div className="form-group-modal">
                      <label>Fecha Fin</label>
                      <input
                        type="date"
                        name="fechaFin"
                        value={this.state.reportFilters.fechaFin}
                        onChange={this.handleReportFilterChange}
                      />
                    </div>
                    <div className="form-group-modal">
                      <label>Estado</label>
                      <select
                        name="estado"
                        value={this.state.reportFilters.estado}
                        onChange={this.handleReportFilterChange}
                      >
                        <option value="todos">Todos</option>
                        <option value="programado">Programado</option>
                        <option value="en-curso">En Curso</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                    <div className="form-group-modal">
                      <label>Instructor</label>
                      <input
                        type="text"
                        name="instructor"
                        value={this.state.reportFilters.instructor}
                        onChange={this.handleReportFilterChange}
                        placeholder="Filtrar por instructor"
                      />
                    </div>
                  </div>
                </div>
                <div className="report-summary">
                  <h4>Resumen de Eventos</h4>
                  <div className="summary-cards">
                    <div className="summary-card">
                      <FaCalendarAlt size={24} />
                      <div>
                        <span>Total Eventos</span>
                        <strong>{this.state.eventos.length}</strong>
                      </div>
                    </div>
                    <div className="summary-card">
                      <FaUsers size={24} />
                      <div>
                        <span>Total Asistentes</span>
                        <strong>
                          {this.state.eventos.reduce(
                            (total, event) => total + event.asistentes.length,
                            0
                          )}
                        </strong>
                      </div>
                    </div>
                    <div className="summary-card">
                      <FaCheckCircle size={24} />
                      <div>
                        <span>Eventos Programados</span>
                        <strong>
                          {
                            this.state.eventos.filter(
                              (e) => e.estado === "programado"
                            ).length
                          }
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.handleCloseEventReports}
                  >
                    Cerrar
                  </button>
                  <button
                    className="btn-glass-base btn-glass-success btn-glass-md"
                    onClick={this.handleGenerateReport}
                  >
                    <FaTachometerAlt /> Generar Reporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL NOTIFICACIONES */}
        {this.state.showEventNotificationsModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseEventNotifications}
          >
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="course-modal-header">
                <h3>Configuración de Notificaciones</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseEventNotifications}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div className="notification-settings">
                <div className="setting-group">
                  <h4>Canales de Notificación</h4>
                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="emailEnabled"
                        checked={this.state.notificationSettings.emailEnabled}
                        onChange={this.handleNotificationSettingChange}
                      />
                      <span>Notificaciones por Email</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="smsEnabled"
                        checked={this.state.notificationSettings.smsEnabled}
                        onChange={this.handleNotificationSettingChange}
                      />
                      <span>Notificaciones por SMS</span>
                    </label>
                  </div>
                </div>
                <div className="setting-group">
                  <h4>Configuración de Recordatorios</h4>
                  <div className="form-group-modal">
                    <label>Tiempo de Anticipación por Defecto</label>
                    <select
                      name="tiempoAnticipacion"
                      value={this.state.notificationSettings.tiempoAnticipacion}
                      onChange={this.handleNotificationSettingChange}
                    >
                      <option value="15 minutos">15 minutos</option>
                      <option value="30 minutos">30 minutos</option>
                      <option value="1 hora">1 hora</option>
                      <option value="2 horas">2 horas</option>
                      <option value="1 día">1 día</option>
                      <option value="3 días">3 días</option>
                      <option value="1 semana">1 semana</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="recordatorioAutomatico"
                        checked={
                          this.state.notificationSettings.recordatorioAutomatico
                        }
                        onChange={this.handleNotificationSettingChange}
                      />
                      <span>Recordatorios Automáticos para Nuevos Eventos</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-glass-base btn-glass-secondary btn-glass-md"
                  onClick={this.handleCloseEventNotifications}
                >
                  Cancelar
                </button>
                <button
                  className="btn-glass-base btn-glass-success btn-glass-md"
                  onClick={this.handleSaveNotificationSettings}
                >
                  <FaCog /> Guardar Configuración
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL NOTAS Y ANUNCIOS */}
        {this.state.showNotesModal && (
          <div
            className="course-modal-overlay"
            onClick={this.handleCloseNotesModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10000,
            }}
          >
            <div
              className="course-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "saturate(160%) blur(12px)",
                WebkitBackdropFilter: "saturate(160%) blur(12px)",
                borderRadius: 20,
                padding: 30,
                maxWidth: 600,
                width: "90%",
                maxHeight: "80vh",
                overflow: "auto",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow:
                  "0 12px 32px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.14), 0 0 24px rgba(0, 229, 255, 0.06)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: 24,
                  color: "#E6F1FF",
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <FaStickyNote size={24} style={{ color: "#2196F3" }} />
                Notas y Anuncios
              </h3>

              {/* Contenido de notas movido del dashboard principal */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 20,
                  }}
                >
                  <img
                    src={this.state.anuncios[this.state.anuncioIndex].avatar}
                    alt="Avatar"
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "50%",
                      marginRight: 18,
                      border: "3px solid rgba(33, 150, 243, 0.3)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <h6
                        style={{
                          color: "#E6F1FF",
                          margin: 0,
                          fontSize: 17,
                          fontWeight: 600,
                        }}
                      >
                        {this.state.anuncios[this.state.anuncioIndex].nombre}
                      </h6>
                      {this.state.anuncios[this.state.anuncioIndex].badge && (
                        <span
                          style={{
                            background: "rgba(255, 193, 7, 0.15)",
                            color: "#FFC107",
                            padding: "4px 10px",
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            marginLeft: 12,
                            border: "1px solid rgba(255, 193, 7, 0.25)",
                            boxShadow: "0 2px 6px rgba(255, 193, 7, 0.2)",
                          }}
                        >
                          {this.state.anuncios[this.state.anuncioIndex].badge}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        color: "#B7CCE9",
                        fontSize: 14,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {this.state.anuncios[this.state.anuncioIndex].texto}
                    </p>
                  </div>
                </div>

                {/* Controles de navegación */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <button
                    onClick={this.handlePrevAnuncio}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 10,
                      padding: "10px 16px",
                      color: "#E6F1FF",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <FaChevronLeft size={12} />
                    Anterior
                  </button>

                  <div
                    style={{
                      color: "#B7CCE9",
                      fontSize: 13,
                      fontWeight: 600,
                      background: "rgba(255, 255, 255, 0.03)",
                      padding: "6px 14px",
                      borderRadius: 10,
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {this.state.anuncioIndex + 1} de{" "}
                    {this.state.anuncios.length}
                  </div>

                  <button
                    onClick={this.handleNextAnuncio}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: 10,
                      padding: "10px 16px",
                      color: "#E6F1FF",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Siguiente
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Botón cerrar */}
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <button
                  onClick={this.handleCloseNotesModal}
                  style={{
                    background: "rgba(33, 150, 243, 0.15)",
                    border: "1px solid rgba(33, 150, 243, 0.3)",
                    borderRadius: 12,
                    padding: "12px 32px",
                    color: "#2196F3",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(33, 150, 243, 0.25)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 4px 16px rgba(33, 150, 243, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(33, 150, 243, 0.15)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  Cerrar
                </button>
              </div>
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
              {/* Ícono de libreta justo debajo de la campanita */}
              <button
                className="sidebar-notif"
                title="Notas"
                style={{ marginTop: "48px" }}
                onClick={this.handleOpenNotesModal}
              >
                <FaStickyNote size={18} />
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
                      <button
                        className="navbar-link dropdown-link"
                        onClick={() =>
                          this.handleNavigateToModule("/certificaciones")
                        }
                      >
                        Certificaciones
                      </button>
                      <button
                        className="navbar-link dropdown-link"
                        onClick={() =>
                          this.handleNavigateToModule("/evidencias")
                        }
                      >
                        Evidencias
                      </button>
                      <button
                        className="navbar-link dropdown-link"
                        onClick={() =>
                          this.handleNavigateToModule("/reportes-metricas")
                        }
                      >
                        Reportes y Métricas
                      </button>
                      <button
                        className="navbar-link dropdown-link"
                        onClick={() =>
                          this.handleNavigateToModule("/expedientes")
                        }
                      >
                        Expedientes
                      </button>
                      <button
                        className="navbar-link dropdown-link"
                        onClick={() =>
                          this.handleNavigateToModule("/cumplimiento-stps")
                        }
                      >
                        Cumplimiento STPS
                      </button>
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
                v0.5
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
              <h1
                className="hero-title"
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "0",
                  margin: "0 0 8px 0",
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    width: "100%",
                    height: "80px",
                    transform: "translateY(-50%)",
                    backgroundImage: "url(/src/ola.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.8,
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                ></div>
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  EXPERTPATH
                </span>
              </h1>
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
              <div style={{ flex: 1.3 }}>
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
                      className="btn-glass-base btn-glass-primary btn-glass-lg"
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
                          this.setState({
                            coursesSearch: e.target.value,
                            currentPage: 1, // Reiniciar a la primera página al buscar
                          })
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
                      className="btn-glass-base btn-glass-ghost btn-glass-md"
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
                      {this.getPaginatedCourses().map((r, i) => (
                        <tr key={i}>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 8,
                                textAlign: "center",
                                maxWidth: 150,
                              }}
                            >
                              <img
                                src={r.img}
                                alt="c"
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 12,
                                  objectFit: "cover",
                                  border: "2px solid rgba(255,255,255,0.1)",
                                }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontWeight: 700,
                                    color: "#E6F1FF",
                                    fontSize: 14,
                                    lineHeight: 1.3,
                                    marginBottom: 4,
                                  }}
                                >
                                  {r.titulo}
                                </div>
                                <div
                                  style={{
                                    color: "#B7CCE9",
                                    fontSize: 12,
                                    opacity: 0.8,
                                  }}
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
                              <FaStar style={{ color: "#f5a623" }} /> {r.rating}
                            </span>
                          </td>
                          <td>
                            <span className="pill ok">
                              <FaCheckCircle style={{ marginRight: 6 }} />
                              {r.estado}
                            </span>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                                gap: 6,
                                width: "fit-content",
                              }}
                            >
                              {/* Primera fila */}
                              <button
                                className="btn-glass-icon primary"
                                title="Ver"
                                onClick={() => this.handleViewCourse(r)}
                                style={{ gridColumn: 1, gridRow: 1 }}
                              >
                                <FaEye />
                              </button>
                              <button
                                className="btn-glass-icon primary"
                                title="Editar"
                                onClick={() => this.handleEditCourse(r)}
                                style={{ gridColumn: 2, gridRow: 1 }}
                              >
                                <FaEdit />
                              </button>
                              {/* Segunda fila */}
                              <button
                                className="btn-glass-icon primary"
                                title="Gestión de Contenido"
                                onClick={() =>
                                  this.setState({
                                    showContentDrawer: true,
                                    selectedCourse: r,
                                  })
                                }
                                style={{ gridColumn: 1, gridRow: 2 }}
                              >
                                <FaCog />
                              </button>
                              <button
                                className="btn-glass-icon danger"
                                title="Eliminar"
                                onClick={() => this.handleDeleteCourse(r)}
                                style={{ gridColumn: 2, gridRow: 2 }}
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

                {/* Controles de Paginación */}
                {(() => {
                  const { currentPage, coursesPerPage } = this.state;
                  const totalCourses = this.getFilteredCourses().length;
                  const totalPages = Math.ceil(totalCourses / coursesPerPage);
                  const startIndex = (currentPage - 1) * coursesPerPage + 1;
                  const endIndex = Math.min(
                    currentPage * coursesPerPage,
                    totalCourses
                  );

                  if (totalCourses === 0) return null;

                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 16,
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {/* Información de paginación */}
                      <div
                        style={{
                          color: "#B7CCE9",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Mostrando {startIndex} - {endIndex} de {totalCourses}{" "}
                        cursos
                      </div>

                      {/* Controles de navegación */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        {/* Botón Anterior */}
                        <button
                          onClick={this.handlePrevPage}
                          disabled={currentPage === 1}
                          style={{
                            background:
                              currentPage === 1
                                ? "rgba(255,255,255,0.04)"
                                : "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(25,118,210,0.25))",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: currentPage === 1 ? "#666" : "#00e5ff",
                            borderRadius: 8,
                            padding: "8px 12px",
                            cursor:
                              currentPage === 1 ? "not-allowed" : "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== 1) {
                              e.target.style.background =
                                "linear-gradient(135deg, rgba(0,229,255,0.35), rgba(25,118,210,0.35))";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== 1) {
                              e.target.style.background =
                                "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(25,118,210,0.25))";
                            }
                          }}
                        >
                          <FaChevronLeft size={12} />
                          Anterior
                        </button>

                        {/* Indicador de página */}
                        <div
                          style={{
                            background: "rgba(0,229,255,0.15)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            borderRadius: 8,
                            padding: "8px 16px",
                            color: "#00e5ff",
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {currentPage} de {totalPages}
                        </div>

                        {/* Botón Siguiente */}
                        <button
                          onClick={this.handleNextPage}
                          disabled={currentPage === totalPages}
                          style={{
                            background:
                              currentPage === totalPages
                                ? "rgba(255,255,255,0.04)"
                                : "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(25,118,210,0.25))",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color:
                              currentPage === totalPages ? "#666" : "#00e5ff",
                            borderRadius: 8,
                            padding: "8px 12px",
                            cursor:
                              currentPage === totalPages
                                ? "not-allowed"
                                : "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== totalPages) {
                              e.target.style.background =
                                "linear-gradient(135deg, rgba(0,229,255,0.35), rgba(25,118,210,0.35))";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== totalPages) {
                              e.target.style.background =
                                "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(25,118,210,0.25))";
                            }
                          }}
                        >
                          Siguiente
                          <FaChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
              {/* Chart/Events */}
              <div style={{ flex: 1.7, minWidth: 500 }}>
                <h3
                  style={{
                    color: "#E6F1FF",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  Gestión de Eventos
                </h3>
                {(() => {
                  const materials = this.state.cmMaterials || [];
                  const filter = this.state.cmFilter || "all";
                  const search = (this.state.cmSearch || "").toLowerCase();
                  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
                  const counts = materials.reduce(
                    (acc, m) => {
                      acc.totals[m.type] = (acc.totals[m.type] || 0) + 1;
                      const t = new Date(m.createdAt).getTime();
                      if (t >= weekAgo)
                        acc.weekly[m.type] = (acc.weekly[m.type] || 0) + 1;
                      return acc;
                    },
                    {
                      totals: { video: 0, documento: 0, evaluacion: 0 },
                      weekly: { video: 0, documento: 0, evaluacion: 0 },
                    }
                  );

                  const list = materials
                    .filter((m) => filter === "all" || m.type === filter)
                    .filter((m) =>
                      (m.title + " " + (m.fileName || ""))
                        .toLowerCase()
                        .includes(search)
                    );

                  const openModal = (prefill = {}) => {
                    const form = {
                      title: prefill.title || "",
                      type: prefill.type || "",
                      file: prefill.file || null,
                    };
                    this.setState({
                      cmShowModal: true,
                      cmForm: form,
                      cmFileName: prefill.fileName || "",
                    });
                  };
                  const closeModal = () =>
                    this.setState({
                      cmShowModal: false,
                      cmForm: { title: "", type: "", file: null },
                      cmFileName: "",
                    });
                  const onInput = (e) => {
                    const { name, value, files } = e.target;
                    if (name === "file" && files && files[0]) {
                      const f = files[0];
                      const ext = f.name.split(".").pop().toLowerCase();
                      let inferred = "";
                      if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext))
                        inferred = "video";
                      else if (
                        [
                          "pdf",
                          "doc",
                          "docx",
                          "ppt",
                          "pptx",
                          "xls",
                          "xlsx",
                          "txt",
                        ].includes(ext)
                      )
                        inferred = "documento";
                      this.setState((prev) => ({
                        cmForm: {
                          ...(prev.cmForm || {}),
                          file: f,
                          type: (prev.cmForm && prev.cmForm.type) || inferred,
                        },
                        cmFileName: f.name,
                      }));
                    } else {
                      this.setState((prev) => ({
                        cmForm: { ...(prev.cmForm || {}), [name]: value },
                      }));
                    }
                  };
                  const onSubmit = (e) => {
                    e.preventDefault();
                    const form = this.state.cmForm || {
                      title: "",
                      type: "",
                      file: null,
                    };
                    const fileName =
                      this.state.cmFileName ||
                      (form.file && form.file.name) ||
                      "";
                    if (!form.title || !form.type || !form.file) {
                      alert(
                        "Completa todos los campos y selecciona un archivo"
                      );
                      return;
                    }
                    const url = URL.createObjectURL(form.file);
                    const newItem = {
                      id: Date.now(),
                      title: form.title,
                      type: form.type,
                      fileName,
                      fileUrl: url,
                      createdAt: new Date().toISOString(),
                    };
                    this.setState((prev) => ({
                      cmMaterials: [newItem, ...(prev.cmMaterials || [])],
                    }));
                    closeModal();
                  };

                  const contentInner = (
                    <div className="cm-wrap" style={{ padding: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 12,
                        }}
                      >
                        <div />
                        <button
                          className="btn-glass-base btn-glass-primary btn-glass-md"
                          onClick={() => openModal()}
                        >
                          <FaPlus style={{ marginRight: 6 }} /> Nuevo Contenido
                        </button>
                      </div>

                      <div className="cm-cards-grid">
                        <div className="cm-card">
                          <div className="cm-card-title">Videos</div>
                          <div className="cm-card-number">
                            {counts.totals.video}
                          </div>
                          <div className="cm-card-sub">
                            +{counts.weekly.video} esta semana
                          </div>
                        </div>
                        <div className="cm-card">
                          <div className="cm-card-title">Documentos</div>
                          <div className="cm-card-number">
                            {counts.totals.documento}
                          </div>
                          <div className="cm-card-sub">
                            +{counts.weekly.documento} esta semana
                          </div>
                        </div>
                        <div className="cm-card">
                          <div className="cm-card-title">Evaluaciones</div>
                          <div className="cm-card-number">
                            {counts.totals.evaluacion}
                          </div>
                          <div className="cm-card-sub">
                            +{counts.weekly.evaluacion} esta semana
                          </div>
                        </div>
                      </div>

                      <div className="cm-actions-row">
                        <div className="left">
                          <button
                            className={
                              "btn-glass-base btn-glass-ghost btn-glass-sm" +
                              (filter === "all" ? " active" : "")
                            }
                            onClick={() => this.setState({ cmFilter: "all" })}
                          >
                            Todos
                          </button>
                          <button
                            className={
                              "btn-glass-base btn-glass-ghost btn-glass-sm" +
                              (filter === "video" ? " active" : "")
                            }
                            onClick={() => this.setState({ cmFilter: "video" })}
                          >
                            Videos
                          </button>
                          <button
                            className={
                              "btn-glass-base btn-glass-ghost btn-glass-sm" +
                              (filter === "documento" ? " active" : "")
                            }
                            onClick={() =>
                              this.setState({ cmFilter: "documento" })
                            }
                          >
                            Documentos
                          </button>
                          <button
                            className={
                              "btn-glass-base btn-glass-ghost btn-glass-sm" +
                              (filter === "evaluacion" ? " active" : "")
                            }
                            onClick={() =>
                              this.setState({ cmFilter: "evaluacion" })
                            }
                          >
                            Evaluaciones
                          </button>
                        </div>
                        <div className="right">
                          <input
                            className="search-input"
                            placeholder="Buscar material..."
                            value={this.state.cmSearch || ""}
                            onChange={(e) =>
                              this.setState({ cmSearch: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="materials-table-wrap">
                        <table className="materials-table">
                          <thead>
                            <tr>
                              <th>Título</th>
                              <th>Tipo</th>
                              <th>Archivo</th>
                              <th>Creado</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.map((m) => (
                              <tr key={m.id}>
                                <td>{m.title}</td>
                                <td style={{ textTransform: "capitalize" }}>
                                  {m.type}
                                </td>
                                <td>
                                  <a
                                    href={m.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {m.fileName}
                                  </a>
                                </td>
                                <td>
                                  {new Date(m.createdAt).toLocaleString()}
                                </td>
                                <td>
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button
                                      className="btn-glass-icon primary"
                                      title="Editar"
                                      onClick={() =>
                                        openModal({
                                          title: m.title,
                                          type: m.type,
                                        })
                                      }
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      className="btn-glass-icon danger"
                                      title="Eliminar"
                                      onClick={() =>
                                        this.setState({
                                          cmMaterials: materials.filter(
                                            (x) => x.id !== m.id
                                          ),
                                        })
                                      }
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {list.length === 0 && (
                              <tr>
                                <td
                                  colSpan="5"
                                  style={{
                                    textAlign: "center",
                                    color: "#B7CCE9",
                                  }}
                                >
                                  Aún no has subido material.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {this.state.cmShowModal && (
                        <div
                          className="course-modal-overlay"
                          onClick={closeModal}
                        >
                          <div
                            className="upload-modal"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              style={{ marginLeft: "88%" }}
                              className="close-modal-btn"
                              onClick={closeModal}
                            >
                              <i className="bx bx-x"></i>
                            </button>
                            <form
                              onSubmit={(e) => onSubmit(e)}
                              className="upload-form-grid"
                            >
                              <div
                                className="form-group-modal"
                                style={{ gridColumn: "1 / -1" }}
                              >
                                <label>Título del Contenido</label>
                                <input
                                  type="text"
                                  name="title"
                                  placeholder="Ej: Video Introducción NOM-035"
                                  value={
                                    (this.state.cmForm &&
                                      this.state.cmForm.title) ||
                                    ""
                                  }
                                  onChange={(e) => onInput(e)}
                                  required
                                />
                              </div>
                              <div className="form-group-modal">
                                <label>Tipo de Contenido</label>
                                <select
                                  name="type"
                                  value={
                                    (this.state.cmForm &&
                                      this.state.cmForm.type) ||
                                    ""
                                  }
                                  onChange={(e) => onInput(e)}
                                  required
                                >
                                  <option value="">Seleccionar tipo</option>
                                  <option value="video">Video</option>
                                  <option value="documento">Documento</option>
                                  <option value="evaluacion">Evaluación</option>
                                </select>
                              </div>
                              <div
                                className="form-group-modal"
                                style={{ alignSelf: "end" }}
                              >
                                <label>Archivo</label>
                                <input
                                  type="file"
                                  name="file"
                                  onChange={(e) => onInput(e)}
                                  required
                                />
                                {this.state.cmFileName && (
                                  <div className="file-hint">
                                    {this.state.cmFileName}
                                  </div>
                                )}
                              </div>
                              <div
                                className="modal-actions"
                                style={{ gridColumn: "1 / -1" }}
                              >
                                <button
                                  type="button"
                                  className="btn-glass-base btn-glass-secondary btn-glass-md"
                                  onClick={closeModal}
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="submit"
                                  className="btn-glass-base btn-glass-upload btn-glass-md"
                                >
                                  Subir Contenido
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}

                      <style>{`
                        .cm-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 12px 0 10px; }
                        .cm-card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:14px; box-shadow:0 4px 16px rgba(0,0,0,0.15); backdrop-filter:blur(10px); position:relative; overflow:hidden; }
                        .cm-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); }
                        .cm-card-title { color:#E6F1FF; font-weight:700; margin-bottom:6px; font-size:12px; }
                        .cm-card-number { font-size:24px; font-weight:800; color:#fff; text-shadow:0 0 15px rgba(255,255,255,0.3); }
                        .cm-card-sub { color:#B7CCE9; font-size:11px; margin:8px 0 2px; opacity:0.8; }
                        .cm-actions-row { display:flex; align-items:center; justify-content:space-between; gap:12px; margin:16px 0 12px; flex-wrap:wrap; }
                        .btn-ghost { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:10px 16px; cursor:pointer; font-weight:600; color:#B7CCE9; backdrop-filter:blur(5px); transition:all 0.2s ease; }
                        .btn-ghost:hover { background:rgba(255,255,255,0.1); transform:translateY(-1px); }
                        .btn-ghost.active { background:rgba(0,229,255,0.15); color:#00e5ff; border-color:rgba(0,229,255,0.3); box-shadow:0 0 20px rgba(0,229,255,0.2); }
                        /* Legacy button styles updated to match new system */
                        .btn-primary { 
                          background: linear-gradient(135deg,rgba(0,229,255,0.25),rgba(25,118,210,0.25)); 
                          border: 1px solid rgba(0,229,255,0.4); 
                          color: #00e5ff; 
                          border-radius: 12px; 
                          padding: 12px 20px; 
                          font-weight: 600; 
                          cursor: pointer; 
                          backdrop-filter: blur(10px); 
                          box-shadow: 0 8px 32px rgba(0,229,255,0.15), 0 0 0 1px rgba(255,255,255,0.08) inset; 
                          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                          display: inline-flex;
                          align-items: center;
                          justify-content: center;
                          gap: 8px;
                        }
                        .btn-primary:hover { 
                          transform: translateY(-2px); 
                          box-shadow: 0 12px 40px rgba(0,229,255,0.25), 0 0 0 1px rgba(255,255,255,0.12) inset; 
                          background: linear-gradient(135deg,rgba(0,229,255,0.35),rgba(25,118,210,0.35)); 
                          border-color: rgba(0,229,255,0.6);
                          color: #7eeaff;
                        }
                        .search-input { padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); outline:none; width:260px; background:rgba(255,255,255,0.06); color:#E6F1FF; backdrop-filter:blur(5px); transition:all 0.2s ease; }
                        .search-input::placeholder { color:#B7CCE9; opacity:0.7; }
                        .search-input:focus { border-color:rgba(0,229,255,0.5); box-shadow:0 0 0 3px rgba(0,229,255,0.1); background:rgba(255,255,255,0.1); }
                        .materials-table-wrap { background:#ffffff0f; border:1px solid rgba(255,255,255,0.12); border-radius:12px; margin-top:12px; overflow:auto; }
                        .materials-table { width:100%; border-collapse:separate; border-spacing:0; }
                        .materials-table thead th { text-align:left; color:#E6F1FF; padding:12px; background:rgba(255,255,255,0.06); position:sticky; top:0; backdrop-filter: blur(6px); }
                        .materials-table tbody td { padding:12px; color:#B7CCE9; border-top:1px solid rgba(255,255,255,0.08); }
                        /* Modal header and close button alignment */
                        .upload-modal-header { display:flex; align-items:center; gap: 8px; }
                        .upload-modal-header .close-modal-btn { margin-left:auto; }
                        @media (max-width: 840px) { .cm-cards-grid { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; } .search-input { width: 100%; } }
                      `}</style>
                    </div>
                  );

                  // Drawer: capa encima que ocupa 40% ancho, desliza desde la derecha
                  return (
                    <>
                      {/* Botón visible si quieres abrir desde aquí también (opcional)
                          Dejamos el trigger en los íconos Ver/Editar ya añadidos */}

                      <div
                        className={
                          "content-drawer-overlay" +
                          (this.state.showContentDrawer ? " open" : "")
                        }
                        onClick={() =>
                          this.setState({ showContentDrawer: false })
                        }
                      ></div>
                      <aside
                        className={
                          "content-drawer" +
                          (this.state.showContentDrawer ? " open" : "")
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="content-drawer-header">
                          <h3 style={{ margin: 0, color: "#E6F1FF" }}>
                            Gestión de Contenido
                          </h3>
                          <button
                            className="close-modal-btn"
                            onClick={() =>
                              this.setState({ showContentDrawer: false })
                            }
                          >
                            <i className="bx bx-x" style={{ fontSize: 18 }}></i>
                          </button>
                        </div>
                        <div className="content-drawer-body">
                          {contentInner}
                        </div>
                      </aside>

                      <style>{`
                        .content-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); opacity: 0; pointer-events: none; transition: opacity .25s ease; z-index: 999; }
                        .content-drawer-overlay.open { opacity: 1; pointer-events: auto; }
                        .content-drawer { position: fixed; top:0; right:0; height:100%; width:min(560px, 45vw); background: rgba(14,18,35,0.98); border-left: 1px solid rgba(255,255,255,0.12); transform: translateX(100%); transition: transform .3s ease; z-index: 1000; display:flex; flex-direction: column; box-shadow: -16px 0 32px rgba(0,0,0,0.35); backdrop-filter: blur(8px); }
                        .content-drawer.open { transform: translateX(0); }
                        .content-drawer-header { display:flex; align-items:center; justify-content:space-between; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
                        .content-drawer-body { padding: 12px 14px 18px; overflow:auto; height: 100%; }
                        @media (max-width: 720px) { .content-drawer { width: 100%; } }
                      `}</style>
                    </>
                  );
                })()}
                {/* Placeholder for a chart/animation */}
                {/* Busco la sección 'Gráfica de Inscripciones' y reemplazo el SVG por el AreaChart funcional: */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 16,
                    padding: 24,
                    marginTop: 32,
                    boxShadow:
                      "0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 24px rgba(0,229,255,0.08)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    width: "70%",
                  }}
                >
                  {/* Dashboard Header */}
                  <div style={{ marginBottom: 24, textAlign: "center" }}>
                    <FaTachometerAlt
                      size={28}
                      style={{ color: "#00e5ff", marginBottom: 8 }}
                    />
                    <h4
                      style={{
                        color: "#E6F1FF",
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Panel de Control de Eventos
                    </h4>
                  </div>

                  {/* ACCIONES PRINCIPALES - CRUD */}
                  <div style={{ marginBottom: 24 }}>
                    <h5
                      style={{
                        color: "#00e5ff",
                        fontSize: 14,
                        fontWeight: 700,
                        marginBottom: 12,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                      }}
                    >
                      <FaBook size={14} />
                      Acciones Principales
                    </h5>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 8,
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      {/* Registrar Eventos - Card Principal */}
                      <div
                        className="event-card primary"
                        onClick={this.handleOpenEventRegister}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(25,118,210,0.15))",
                          border: "2px solid rgba(0,229,255,0.3)",
                          borderRadius: 12,
                          padding: 15,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-4px)";
                          e.target.style.boxShadow =
                            "0 16px 40px rgba(0,229,255,0.25)";
                          e.target.style.borderColor = "rgba(0,229,255,0.5)";
                          this.showCustomTooltip(
                            e,
                            "Crear o registrar nuevos eventos y capacitaciones",
                            "primary"
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                          e.target.style.borderColor = "rgba(0,229,255,0.3)";
                          this.hideCustomTooltip();
                        }}
                      >
                        <FaCalendarAlt size={22} style={{ color: "#00e5ff" }} />
                      </div>

                      {/* Ver Lista - Card Secundaria */}
                      <div
                        className="event-card secondary"
                        onClick={this.handleOpenEventList}
                        style={{
                          background: "rgba(76,175,80,0.12)",
                          border: "1px solid rgba(76,175,80,0.3)",
                          borderRadius: 12,
                          padding: 16,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.background = "rgba(76,175,80,0.18)";
                          this.showCustomTooltip(
                            e,
                            "Ver lista de eventos registrados",
                            "success"
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.background = "rgba(76,175,80,0.12)";
                          this.hideCustomTooltip();
                        }}
                      >
                        <FaEye size={22} style={{ color: "#66bb6a" }} />
                      </div>

                      {/* Modificar - Card Secundaria */}
                      <div
                        className="event-card secondary"
                        onClick={this.handleOpenEventEdit}
                        style={{
                          background: "rgba(255,193,7,0.12)",
                          border: "1px solid rgba(255,193,7,0.3)",
                          borderRadius: 12,
                          padding: 16,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.background = "rgba(255,193,7,0.18)";
                          this.showCustomTooltip(
                            e,
                            "Modificar o editar eventos existentes",
                            "warning"
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.background = "rgba(255,193,7,0.12)";
                          this.hideCustomTooltip();
                        }}
                      >
                        <FaEdit size={22} style={{ color: "#ffca28" }} />
                      </div>

                      {/* Eliminar - Card Secundaria */}
                      <div
                        className="event-card secondary danger"
                        onClick={this.handleOpenEventDelete}
                        style={{
                          background: "rgba(244,67,54,0.12)",
                          border: "1px solid rgba(244,67,54,0.3)",
                          borderRadius: 12,
                          padding: 16,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.background = "rgba(244,67,54,0.18)";
                          this.showCustomTooltip(
                            e,
                            "Eliminar eventos seleccionados",
                            "danger"
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.background = "rgba(244,67,54,0.12)";
                          this.hideCustomTooltip();
                        }}
                      >
                        <FaTrash size={22} style={{ color: "#f44336" }} />
                      </div>
                    </div>
                  </div>

                  {/* ACCIONES SECUNDARIAS - Gestión */}
                  <div style={{ marginBottom: 24 }}>
                    <h5
                      style={{
                        color: "#ab47bc",
                        fontSize: 14,
                        fontWeight: 700,
                        marginTop: -30,
                        marginBottom: 12,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <FaUsers size={14} />
                      Gestión de Eventos
                    </h5>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: 16,
                      }}
                    >
                      {/* Gestionar Asistentes */}
                      <div
                        className="event-card tertiary"
                        onClick={this.handleOpenEventAttendees}
                        style={{
                          background: "rgba(156,39,176,0.12)",
                          border: "1px solid rgba(156,39,176,0.25)",
                          borderRadius: 10,
                          padding: 14,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(156,39,176,0.18)";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(156,39,176,0.12)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <FaUsers size={20} style={{ color: "#ab47bc" }} />
                        <div>
                          <h6
                            style={{
                              color: "#E6F1FF",
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            Gestionar Asistentes
                          </h6>
                          <p
                            style={{
                              color: "#B7CCE9",
                              fontSize: 10,
                              margin: "2px 0 0 0",
                            }}
                          >
                            Agregar/quitar participantes
                          </p>
                        </div>
                      </div>

                      {/* Generar Reportes */}
                      <div
                        className="event-card tertiary"
                        onClick={this.handleOpenEventReports}
                        style={{
                          background: "rgba(255,193,7,0.12)",
                          border: "1px solid rgba(255,193,7,0.25)",
                          borderRadius: 10,
                          padding: 14,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(255,193,7,0.18)";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(255,193,7,0.12)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <FaTachometerAlt
                          size={20}
                          style={{ color: "#ffca28" }}
                        />
                        <div>
                          <h6
                            style={{
                              color: "#E6F1FF",
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            Generar Reportes
                          </h6>
                          <p
                            style={{
                              color: "#B7CCE9",
                              fontSize: 10,
                              margin: "2px 0 0 0",
                            }}
                          >
                            Estadísticas y análisis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONFIGURACIÓN Y NOTIFICACIONES */}
                  <div>
                    <h5
                      style={{
                        color: "#78909c",
                        fontSize: 14,
                        fontWeight: 700,
                        marginBottom: 12,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <FaCog size={14} />
                      Configuración
                    </h5>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 20,
                        justifyItems: "center",
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                    >
                      {/* Configurar Recordatorios */}
                      <div
                        className="event-card config"
                        onClick={this.handleOpenEventReminders}
                        style={{
                          background: "rgba(96,125,139,0.12)",
                          border: "1px solid rgba(96,125,139,0.25)",
                          borderRadius: 10,
                          padding: 20,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          width: "100%",
                          minHeight: "120px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(96,125,139,0.18)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(96,125,139,0.12)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <FaBell
                          size={24}
                          style={{ color: "#78909c", marginBottom: 8 }}
                        />
                        <h6
                          style={{
                            color: "#E6F1FF",
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          Configurar Recordatorios
                        </h6>
                        <p
                          style={{
                            color: "#B7CCE9",
                            fontSize: 11,
                            margin: "4px 0 0 0",
                          }}
                        >
                          Alertas y notificaciones
                        </p>
                      </div>

                      {/* Configurar Notificaciones */}
                      <div
                        className="event-card config"
                        onClick={this.handleOpenEventNotifications}
                        style={{
                          background: "rgba(96,125,139,0.12)",
                          border: "1px solid rgba(96,125,139,0.25)",
                          borderRadius: 10,
                          padding: 20,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          width: "100%",
                          minHeight: "120px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(96,125,139,0.18)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.background = "rgba(96,125,139,0.12)";
                        }}
                      >
                        <FaCog
                          size={24}
                          style={{ color: "#78909c", marginBottom: 8 }}
                        />
                        <h6
                          style={{
                            color: "#E6F1FF",
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          Configurar Notificaciones
                        </h6>
                        <p
                          style={{
                            color: "#B7CCE9",
                            fontSize: 11,
                            margin: "4px 0 0 0",
                          }}
                        >
                          Ajustes generales
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats rápidas */}
                  <div
                    style={{
                      marginTop: 20,
                      padding: 12,
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "#00e5ff",
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {this.state.eventos.length}
                      </div>
                      <div style={{ color: "#B7CCE9", fontSize: 11 }}>
                        Total Eventos
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "#66bb6a",
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {
                          this.state.eventos.filter(
                            (e) => e.estado === "programado"
                          ).length
                        }
                      </div>
                      <div style={{ color: "#B7CCE9", fontSize: 11 }}>
                        Programados
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: "#ffca28",
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {this.state.eventos.reduce(
                          (total, event) => total + event.asistentes.length,
                          0
                        )}
                      </div>
                      <div style={{ color: "#B7CCE9", fontSize: 11 }}>
                        Asistentes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Gráfica Profesional de Métricas del Proyecto - DESPLEGABLE */}
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: this.state.sidebarOpen ? 280 : 80,
                right: 0,
                zIndex: 1000,
                transition: "left 0.3s ease",
              }}
            >
              {/* Barra colapsable */}
              <div
                onClick={() =>
                  this.setState({
                    rendimientoExpanded: !this.state.rendimientoExpanded,
                  })
                }
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  borderBottom: "none",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: "16px 40px",
                  cursor: "pointer",
                  boxShadow:
                    "0 -10px 40px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.15)",
                  backdropFilter: "saturate(180%) blur(20px)",
                  WebkitBackdropFilter: "saturate(180%) blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(59,130,246,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(59,130,246,0.3)",
                    }}
                  >
                    <FaTachometerAlt
                      style={{ color: "#3b82f6", fontSize: "1.5rem" }}
                    />
                  </div>
                  <div>
                    <h2
                      style={{
                        color: "#E6F1FF",
                        fontWeight: 700,
                        margin: 0,
                        fontSize: "1.5rem",
                      }}
                    >
                      Rendimiento del Sistema
                    </h2>
                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0,
                        fontSize: "0.85rem",
                      }}
                    >
                      {this.state.rendimientoExpanded
                        ? "Click para contraer"
                        : "Click para ver métricas detalladas"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      color: "#4ade80",
                      padding: "8px 18px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      border: "1px solid rgba(34,197,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaCheckCircle size={14} />
                    En Tiempo Real
                  </span>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(59,130,246,0.3)",
                      transition: "transform 0.3s ease",
                      transform: this.state.rendimientoExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <FaChevronDown style={{ color: "#3b82f6", fontSize: 18 }} />
                  </div>
                </div>
              </div>

              {/* Contenido expandible */}
              <div
                style={{
                  maxHeight: this.state.rendimientoExpanded ? "85vh" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)",
                  backdropFilter: "saturate(180%) blur(30px)",
                  WebkitBackdropFilter: "saturate(180%) blur(30px)",
                  borderTop: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <div
                  style={{
                    padding: 40,
                    overflowY: "auto",
                    maxHeight: "85vh",
                  }}
                >
                  {/* Indicadores KPI */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "16px",
                      marginBottom: 32,
                    }}
                  >
                    {[
                      {
                        label: "Total Usuarios",
                        value: "341",
                        change: "+15.3%",
                        icon: <FaUsers />,
                        color: "#3b82f6",
                        bg: "rgba(59,130,246,0.15)",
                      },
                      {
                        label: "Cursos Activos",
                        value: "6",
                        change: "+2",
                        icon: <FaBook />,
                        color: "#8b5cf6",
                        bg: "rgba(139,92,246,0.15)",
                      },
                      {
                        label: "Eventos del Mes",
                        value: "12",
                        change: "+8.5%",
                        icon: <FaCalendarAlt />,
                        color: "#f59e0b",
                        bg: "rgba(245,158,11,0.15)",
                      },
                      {
                        label: "Satisfacción",
                        value: "4.7★",
                        change: "+0.3",
                        icon: <FaStar />,
                        color: "#22c55e",
                        bg: "rgba(34,197,94,0.15)",
                      },
                    ].map((kpi, index) => (
                      <div
                        key={index}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                          border: `1px solid ${kpi.color}30`,
                          borderRadius: "16px",
                          padding: "20px",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = `0 12px 32px ${kpi.color}40`;
                          e.currentTarget.style.borderColor = `${kpi.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = `${kpi.color}30`;
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              background: kpi.bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: kpi.color,
                              fontSize: "1.5rem",
                            }}
                          >
                            {kpi.icon}
                          </div>
                          <span
                            style={{
                              background: "rgba(34,197,94,0.15)",
                              color: "#4ade80",
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              border: "1px solid rgba(34,197,94,0.3)",
                            }}
                          >
                            {kpi.change}
                          </span>
                        </div>
                        <h3
                          style={{
                            color: "#E6F1FF",
                            fontSize: "2rem",
                            fontWeight: 700,
                            margin: "8px 0",
                            lineHeight: 1,
                          }}
                        >
                          {kpi.value}
                        </h3>
                        <p
                          style={{
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            margin: 0,
                            fontWeight: 500,
                          }}
                        >
                          {kpi.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Gráfica LineChart Mejorada */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,41,59,0.4) 100%)",
                      borderRadius: "20px",
                      padding: "28px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <h3
                        style={{
                          color: "#E6F1FF",
                          fontWeight: 600,
                          margin: 0,
                          fontSize: "1.2rem",
                        }}
                      >
                        Evolución de Actividades
                      </h3>
                      <div style={{ display: "flex", gap: "16px" }}>
                        {[
                          {
                            label: "Nuevos Usuarios",
                            color: "#3b82f6",
                            value: "22",
                          },
                          {
                            label: "Cursos Creados",
                            color: "#8b5cf6",
                            value: "2",
                          },
                          { label: "Eventos", color: "#f59e0b", value: "12" },
                          {
                            label: "Certificaciones",
                            color: "#22c55e",
                            value: "8",
                          },
                        ].map((legend, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "3px",
                                background: legend.color,
                                boxShadow: `0 0 10px ${legend.color}60`,
                              }}
                            />
                            <span
                              style={{
                                color: "#94a3b8",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                              }}
                            >
                              {legend.label}
                            </span>
                            <span
                              style={{
                                color: "#E6F1FF",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                background: `${legend.color}20`,
                                padding: "2px 8px",
                                borderRadius: "6px",
                              }}
                            >
                              {legend.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <LineChart
                      height={380}
                      series={[
                        {
                          data: [5, 7, 8, 10, 12, 14, 13, 15, 16, 18, 20, 22],
                          label: "Nuevos Usuarios",
                          color: "#3b82f6",
                          area: true,
                          curve: "monotoneX",
                          showMark: true,
                        },
                        {
                          data: [1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 6],
                          label: "Cursos Creados",
                          color: "#8b5cf6",
                          area: true,
                          curve: "monotoneX",
                          showMark: true,
                        },
                        {
                          data: [2, 3, 4, 5, 6, 7, 6, 8, 9, 10, 11, 12],
                          label: "Eventos",
                          color: "#f59e0b",
                          area: true,
                          curve: "monotoneX",
                          showMark: true,
                        },
                        {
                          data: [1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8],
                          label: "Certificaciones",
                          color: "#22c55e",
                          area: true,
                          curve: "monotoneX",
                          showMark: true,
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
                          labelStyle: {
                            fill: "#94a3b8",
                            fontSize: 14,
                            fontWeight: 600,
                          },
                          tickLabelStyle: {
                            fill: "#64748b",
                            fontSize: 12,
                          },
                        },
                      ]}
                      yAxis={[
                        {
                          label: "Cantidad",
                          labelStyle: {
                            fill: "#94a3b8",
                            fontSize: 14,
                            fontWeight: 600,
                          },
                          tickLabelStyle: {
                            fill: "#64748b",
                            fontSize: 12,
                          },
                        },
                      ]}
                      grid={{
                        vertical: true,
                        horizontal: true,
                      }}
                      sx={{
                        background: "transparent",
                        borderRadius: 3,
                        "& .MuiChartsAxis-line": {
                          stroke: "rgba(148,163,184,0.2)",
                        },
                        "& .MuiChartsGrid-line": {
                          stroke: "rgba(148,163,184,0.1)",
                        },
                        "& .MuiChartsAxis-tick": {
                          stroke: "rgba(148,163,184,0.3)",
                        },
                        "& .MuiChartsLegend-root": {
                          display: "none",
                        },
                      }}
                    />
                  </div>

                  {/* Insights y estadísticas adicionales */}
                  <div
                    style={{
                      marginTop: "28px",
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                    }}
                  >
                    {[
                      {
                        title: "Crecimiento Mensual",
                        value: "+18.4%",
                        subtitle: "vs mes anterior",
                        icon: "📈",
                        trend: "up",
                      },
                      {
                        title: "Tasa de Completitud",
                        value: "87%",
                        subtitle: "cursos finalizados",
                        icon: "✅",
                        trend: "up",
                      },
                      {
                        title: "Tiempo Promedio",
                        value: "2.3h",
                        subtitle: "por sesión",
                        icon: "⏱️",
                        trend: "neutral",
                      },
                    ].map((insight, index) => (
                      <div
                        key={index}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "14px",
                          padding: "18px",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "2rem",
                            filter: "grayscale(0%)",
                          }}
                        >
                          {insight.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              color: "#94a3b8",
                              fontSize: "0.8rem",
                              margin: "0 0 4px 0",
                              fontWeight: 500,
                            }}
                          >
                            {insight.title}
                          </p>
                          <h4
                            style={{
                              color: "#E6F1FF",
                              fontSize: "1.5rem",
                              fontWeight: 700,
                              margin: "0 0 4px 0",
                              lineHeight: 1,
                            }}
                          >
                            {insight.value}
                          </h4>
                          <p
                            style={{
                              color: "#64748b",
                              fontSize: "0.75rem",
                              margin: 0,
                            }}
                          >
                            {insight.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.closeContentModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-glass-base btn-glass-success btn-glass-md"
                  >
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
                    className="btn-glass-base btn-glass-secondary btn-glass-md"
                    onClick={this.closeContentDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-glass-base btn-glass-danger btn-glass-md"
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

/* ========== UNIFIED BUTTON SYSTEM ========== */
/* Sistema de botones glassmorphism consistente */

/* Base button styles */
.btn-glass-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  outline: none;
  box-shadow: var(--glass-shadow);
}

/* Button sizes */
.btn-glass-sm {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 8px;
}

.btn-glass-md {
  padding: 12px 20px;
  font-size: 14px;
}

.btn-glass-lg {
  padding: 16px 28px;
  font-size: 16px;
  border-radius: 14px;
}

/* Primary button - main actions */
.btn-glass-primary {
  background: linear-gradient(135deg, rgba(0,229,255,0.25), rgba(25,118,210,0.25));
  border: 1px solid rgba(0,229,255,0.4);
  color: #00e5ff;
  box-shadow: 
    0 8px 32px rgba(0,229,255,0.15),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

.btn-glass-primary:hover {
  background: linear-gradient(135deg, rgba(0,229,255,0.35), rgba(25,118,210,0.35));
  border-color: rgba(0,229,255,0.6);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0,229,255,0.25),
    0 0 0 1px rgba(255,255,255,0.12) inset;
  color: #7eeaff;
}

.btn-glass-primary:active {
  transform: translateY(-1px);
  box-shadow: 
    0 6px 20px rgba(0,229,255,0.2),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

/* Secondary button - alternative actions */
.btn-glass-secondary {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.16);
  color: var(--text-primary);
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.2),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

.btn-glass-secondary:hover {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.24);
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0,0,0,0.3),
    0 0 0 1px rgba(255,255,255,0.12) inset;
  color: #fff;
}

/* Ghost button - filters and tabs */
.btn-glass-ghost {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-secondary);
  box-shadow: 
    0 4px 16px rgba(0,0,0,0.15),
    0 0 0 1px rgba(255,255,255,0.05) inset;
}

.btn-glass-ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-1px);
  color: var(--text-primary);
  box-shadow: 
    0 8px 24px rgba(0,0,0,0.2),
    0 0 0 1px rgba(255,255,255,0.1) inset;
}

.btn-glass-ghost.active {
  background: rgba(0,229,255,0.15);
  border-color: rgba(0,229,255,0.3);
  color: #00e5ff;
  box-shadow: 
    0 0 20px rgba(0,229,255,0.2),
    0 0 0 1px rgba(0,229,255,0.1) inset;
}

/* Success button */
.btn-glass-success {
  background: linear-gradient(135deg, rgba(76,175,80,0.25), rgba(56,142,60,0.25));
  border: 1px solid rgba(76,175,80,0.4);
  color: #4caf50;
  box-shadow: 
    0 8px 32px rgba(76,175,80,0.15),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

.btn-glass-success:hover {
  background: linear-gradient(135deg, rgba(76,175,80,0.35), rgba(56,142,60,0.35));
  border-color: rgba(76,175,80,0.6);
  transform: translateY(-2px);
  color: #81c784;
}

/* Danger button */
.btn-glass-danger {
  background: linear-gradient(135deg, rgba(244,67,54,0.25), rgba(211,47,47,0.25));
  border: 1px solid rgba(244,67,54,0.4);
  color: #f44336;
  box-shadow: 
    0 8px 32px rgba(244,67,54,0.15),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

.btn-glass-danger:hover {
  background: linear-gradient(135deg, rgba(244,67,54,0.35), rgba(211,47,47,0.35));
  border-color: rgba(244,67,54,0.6);
  transform: translateY(-2px);
  color: #ef5350;
}

/* Icon button - small action buttons */
.btn-glass-icon {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--text-secondary);
  padding: 8px;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 16px rgba(0,0,0,0.15),
    0 0 0 1px rgba(255,255,255,0.05) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-glass-icon:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-2px) scale(1.05);
  color: var(--text-primary);
  box-shadow: 
    0 8px 24px rgba(0,0,0,0.25),
    0 0 0 1px rgba(255,255,255,0.1) inset;
}

.btn-glass-icon.danger {
  color: #f44336;
  border-color: rgba(244,67,54,0.3);
}

.btn-glass-icon.danger:hover {
  background: rgba(244,67,54,0.15);
  color: #ef5350;
  border-color: rgba(244,67,54,0.5);
}

.btn-glass-icon.primary {
  color: #00e5ff;
  border-color: rgba(0,229,255,0.3);
}

.btn-glass-icon.primary:hover {
  background: rgba(0,229,255,0.15);
  color: #7eeaff;
  border-color: rgba(0,229,255,0.5);
}

/* Upload button special styling */
.btn-glass-upload {
  background: linear-gradient(135deg, rgba(156,39,176,0.25), rgba(123,31,162,0.25));
  border: 1px solid rgba(156,39,176,0.4);
  color: #ab47bc;
  box-shadow: 
    0 8px 32px rgba(156,39,176,0.15),
    0 0 0 1px rgba(255,255,255,0.08) inset;
}

.btn-glass-upload:hover {
  background: linear-gradient(135deg, rgba(156,39,176,0.35), rgba(123,31,162,0.35));
  border-color: rgba(156,39,176,0.6);
  transform: translateY(-2px);
  color: #ba68c8;
}

/* Focus states for accessibility */
.btn-glass-base:focus-visible {
  outline: 2px solid rgba(0,229,255,0.5);
  outline-offset: 2px;
}

/* Disabled state */
.btn-glass-base:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Loading state */
.btn-glass-base.loading {
  pointer-events: none;
  position: relative;
}

.btn-glass-base.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  border: none !important;
  width: 100% !important;
  text-align: left !important;
  padding: 8px 16px !important;
  cursor: pointer !important;
  font-weight: 700;
  color: #213547 !important;
  font-size: 14px !important;
  font-family: inherit !important;
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

/* ===== ESTILOS PARA MODALES DE EVENTOS ===== */
.event-form {
  max-height: 70vh;
  overflow-y: auto;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}
.form-group-modal {
  display: flex;
  flex-direction: column;
}
.form-group-modal label {
  color: #E6F1FF;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 14px;
}
.form-group-modal input,
.form-group-modal select,
.form-group-modal textarea {
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  color: #E6F1FF;
  font-size: 14px;
  transition: all 0.2s ease;
}
.form-group-modal input:focus,
.form-group-modal select:focus,
.form-group-modal textarea:focus {
  outline: none;
  border-color: #00e5ff;
  box-shadow: 0 0 0 3px rgba(0,229,255,0.1);
  background: rgba(255,255,255,0.1);
}
.form-group-modal textarea {
  resize: vertical;
  min-height: 80px;
}

/* Modal grande para listas */
.course-modal.large {
  width: 90%;
  max-width: 800px;
}
.events-list {
  max-height: 60vh;
  overflow-y: auto;
  padding: 16px;
}
.no-events {
  text-align: center;
  padding: 40px;
  color: #666;
}
.no-events p {
  margin-top: 16px;
  font-size: 16px;
}
.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.event-item:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}
.event-info h4 {
  color: #E6F1FF;
  margin: 0 0 8px 0;
  font-size: 18px;
}
.event-info p {
  color: #B7CCE9;
  margin: 4px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.event-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 8px;
}
.event-status.programado {
  background: rgba(0,229,255,0.2);
  color: #00e5ff;
}
.event-status.en-curso {
  background: rgba(255,193,7,0.2);
  color: #ffca28;
}
.event-status.completado {
  background: rgba(76,175,80,0.2);
  color: #66bb6a;
}
.event-status.cancelado {
  background: rgba(244,67,54,0.2);
  color: #f44336;
}
.event-actions {
  display: flex;
  gap: 8px;
}

/* Confirmación de eliminación */
.delete-confirmation {
  text-align: center;
  padding: 20px;
}
.delete-icon {
  margin-bottom: 20px;
}
.delete-confirmation h4 {
  color: #E6F1FF;
  margin-bottom: 16px;
}
.delete-confirmation p {
  color: #B7CCE9;
  margin: 8px 0;
}

/* Recordatorios */
.existing-reminders {
  margin-top: 20px;
  padding: 16px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
}
.existing-reminders h4 {
  color: #E6F1FF;
  margin-bottom: 12px;
}
.reminder-item {
  padding: 8px 12px;
  background: rgba(0,229,255,0.1);
  border-radius: 6px;
  margin-bottom: 8px;
  color: #00e5ff;
  font-size: 14px;
}

/* Gestión de asistentes */
.attendees-manager {
  padding: 16px;
}
.add-attendee h4 {
  color: #E6F1FF;
  margin-bottom: 12px;
}
.attendee-input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.attendee-input-group input {
  flex: 1;
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  color: #E6F1FF;
}
.attendees-list h4 {
  color: #E6F1FF;
  margin-bottom: 12px;
}
.attendee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  margin-bottom: 8px;
}
.attendee-item span {
  color: #B7CCE9;
}

/* Reportes */
.reports-generator {
  padding: 16px;
}
.report-filters h4 {
  color: #E6F1FF;
  margin-bottom: 16px;
}
.report-summary {
  margin-top: 24px;
}
.report-summary h4 {
  color: #E6F1FF;
  margin-bottom: 16px;
}
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
}
.summary-card div {
  display: flex;
  flex-direction: column;
}
.summary-card span {
  color: #B7CCE9;
  font-size: 14px;
}
.summary-card strong {
  color: #E6F1FF;
  font-size: 24px;
  font-weight: 700;
}

/* Configuración de notificaciones */
.notification-settings {
  padding: 16px;
}
.setting-group {
  margin-bottom: 24px;
}
.setting-group h4 {
  color: #E6F1FF;
  margin-bottom: 16px;
}
.setting-item {
  margin-bottom: 12px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #B7CCE9;
  cursor: pointer;
}
.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #00e5ff;
}

/* Botones adicionales */
.btn-glass-danger {
  background: linear-gradient(135deg, rgba(244,67,54,0.25), rgba(229,115,115,0.25));
  border: 1px solid rgba(244,67,54,0.4);
  color: #f44336;
}
.btn-glass-danger:hover {
  background: linear-gradient(135deg, rgba(244,67,54,0.35), rgba(229,115,115,0.35));
  border-color: rgba(244,67,54,0.6);
}

/* Responsivo */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .event-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .summary-cards {
    grid-template-columns: 1fr;
  }
}

/* Tooltips personalizados */
.custom-tooltip {
  position: fixed;
  z-index: 9999;
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  white-space: pre-line;
  text-align: center;
  transform: translateX(-50%) translateY(-100%);
  animation: tooltipFadeIn 0.3s ease-out;
  pointer-events: none;
  max-width: 200px;
  line-height: 1.4;
}

.custom-tooltip.primary {
  background: linear-gradient(135deg, rgba(0,229,255,0.9), rgba(25,118,210,0.9));
  border-color: rgba(0,229,255,0.5);
  box-shadow: 0 20px 40px rgba(0,229,255,0.3);
}

.custom-tooltip.success {
  background: linear-gradient(135deg, rgba(76,175,80,0.9), rgba(102,187,106,0.9));
  border-color: rgba(76,175,80,0.5);
  box-shadow: 0 20px 40px rgba(76,175,80,0.3);
}

.custom-tooltip.warning {
  background: linear-gradient(135deg, rgba(255,193,7,0.9), rgba(255,202,40,0.9));
  border-color: rgba(255,193,7,0.5);
  box-shadow: 0 20px 40px rgba(255,193,7,0.3);
  color: #0a1929;
}

.custom-tooltip.danger {
  background: linear-gradient(135deg, rgba(244,67,54,0.9), rgba(229,115,115,0.9));
  border-color: rgba(244,67,54,0.5);
  box-shadow: 0 20px 40px rgba(244,67,54,0.3);
}

.custom-tooltip::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid;
}

.custom-tooltip.primary::before {
  border-top-color: rgba(0,229,255,0.9);
}

.custom-tooltip.success::before {
  border-top-color: rgba(76,175,80,0.9);
}

.custom-tooltip.warning::before {
  border-top-color: rgba(255,193,7,0.9);
}

.custom-tooltip.danger::before {
  border-top-color: rgba(244,67,54,0.9);
}

@keyframes tooltipFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%) scale(1);
  }
}
`}</style>

        {/* Tooltip personalizado */}
        {this.state.customTooltip.show && (
          <div
            className={`custom-tooltip ${this.state.customTooltip.type}`}
            style={{
              left: this.state.customTooltip.x,
              top: this.state.customTooltip.y,
            }}
          >
            {this.state.customTooltip.text}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(DashboardAdmin);
