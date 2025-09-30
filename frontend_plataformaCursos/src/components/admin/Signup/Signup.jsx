import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import actionApi from "../actionApi/actionApi.js";
import { withRouter } from "../../utils/withRouter.jsx";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      error: "",
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const container = document.getElementById("container");
      if (container) {
        container.classList.add("sign-up");
      }
    }, 200);
    // Reduce CPU by disabling heavy background animations for auth pages
    document.body.classList.add("auth-no-anim");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-no-anim");
  }

  componentDidUpdate(prevProps, prevState) {
    // Fallback imperativo: si se activó redirectToLogin vía estado, navega por código
    if (!prevState?.redirectToLogin && this.state?.redirectToLogin) {
      try {
        console.log("[FRONTEND] componentDidUpdate: navegando a /login");
        this.props?.router?.navigate?.("/login");
      } catch (e) {
        console.warn("[FRONTEND] navigate falló, usando location.assign", e);
        window.location.assign("/login");
      }
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[FRONTEND] handleSubmit(Signup) ejecutado");
    const { name, lastname, email, password, confirm_password } = this.state;
    if (!name || !lastname || !email || !password || !confirm_password) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }
    if (password !== confirm_password) {
      this.setState({ error: "Las contraseñas no coinciden" });
      return;
    }
    try {
      console.log("[FRONTEND] Enviando signup a GraphQL...");
      console.time("signupReq");
      let watchdog = setTimeout(() => {
        console.warn("[FRONTEND] Signup sigue pendiente tras 5s...");
      }, 5000);
      const response = await actionApi.signup(name, lastname, email, password);
      clearTimeout(watchdog);
      console.timeEnd("signupReq");
      // Log completo para diagnosticar cualquier discrepancia
      console.log(
        "[FRONTEND] Respuesta completa del backend (Axios):",
        response
      );
      const gqlErrors = response?.data?.errors;
      if (gqlErrors?.length) {
        console.log("[FRONTEND] Errores GraphQL:", gqlErrors);
        this.setState({ error: gqlErrors[0]?.message || "Error en registro" });
        return;
      }
      const data = response?.data?.data?.signup;
      console.log("[FRONTEND] Payload GraphQL signup:", data);
      if (
        data &&
        (data.message?.toLowerCase() === "registro exitoso" || data.id)
      ) {
        console.log("[FRONTEND] Registro exitoso, id:", data.id);
        alert("Usuario registrado exitosamente");
        // Redirección confiable vía render
        console.log("[FRONTEND] Activando redirect a /login");
        this.setState({ redirectToLogin: true });
      } else {
        console.log("[FRONTEND] Respuesta sin éxito, mensaje:", data?.message);
        this.setState({ error: data?.message || "Error en registro" });
      }
    } catch (e) {
      console.error("[FRONTEND] Error en signup:", e);
      this.setState({ error: "Error en registro" });
    }
  };

  toggle = () => {
    const formContainer = document.querySelector(".glass-form-container");
    if (formContainer) {
      formContainer.classList.add("form-exit");
    }
    setTimeout(() => {
      const container = document.getElementById("container");
      if (container) {
        container.classList.add("sign-in");
        container.classList.remove("sign-up");
      }
    }, 100);
    setTimeout(() => {
      try {
        this.props?.router?.navigate?.("/login");
      } catch (_) {
        window.location.assign("/login");
      }
    }, 600);
  };

  render() {
    const {
      name,
      lastname,
      email,
      password,
      confirm_password,
      error,
      redirectToLogin,
    } = this.state;
    if (redirectToLogin) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div id="container" className="container">
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP - LEFT SIDE */}
          <div
            className="col align-items-center flex-col sign-up"
            style={{
              width: "50%",
              justifyContent: "flex-start",
              alignSelf: "center",
              display: "flex",
            }}
          >
            <div className="form-wrapper align-items-center">
              <div className="glass-form-container register">
                <div className="glass-form-header">
                  <div className="glass-camera-icon">
                    <i className="bx bx-user-plus"></i>
                  </div>
                  <h2 className="glass-form-title">Crear una cuenta</h2>
                  <p className="glass-form-subtitle">Unete hoy</p>
                </div>
                {error && <div className="glass-error-message">{error}</div>}
                <form onSubmit={this.handleSubmit}>
                  <div className="glass-input-group">
                    <i className="bx bxs-user"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="glass-input-group">
                    <i className="bx bxs-user"></i>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      value={lastname}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="glass-input-group">
                    <i className="bx bx-mail-send"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo"
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  {/* Campo de ID de empleado eliminado */}
                  <div className="glass-input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="glass-input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input
                      type="password"
                      name="confirm_password"
                      placeholder="Confirmar Contraseña"
                      value={confirm_password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="glass-submit-btn">
                    Registrarse
                  </button>
                </form>
                <div className="glass-form-footer">
                  <p>
                    <span>¿Ya tienes una cuenta? </span>
                    <span className="glass-form-link" onClick={this.toggle}>
                      Iniciar sesión aquí
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className="row content-row">
          {/* SIGN IN CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Bienvenido</h2>
            </div>
            <div className="img sign-in"></div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="img sign-up"></div>
            <div className="text sign-up">
              <h2>Unete hoy</h2>
            </div>
          </div>
          {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
      </div>
    );
  }
}

export default withRouter(Signup);
