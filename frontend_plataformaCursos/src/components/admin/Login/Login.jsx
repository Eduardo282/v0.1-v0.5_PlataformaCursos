import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import actionApi from "../actionApi/actionApi.js";
import { saveSession } from "../../../services/authService.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alias: "",
      error: "",
      loggedIn: false,
      userData: null,
      showForgotPassword: false,
      forgotEmail: "",
      forgotMessage: "",
      forgotError: "",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const container = document.getElementById("container");
      if (container) {
        container.classList.add("sign-in");
      }
    }, 200);
    // Reduce CPU by disabling heavy background animations for auth pages
    document.body.classList.add("auth-no-anim");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-no-anim");
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, alias } = this.state;
    if (!email || !password) {
      this.setState({ error: "Email y contraseña son obligatorios" });
      return;
    }
    // Adaptar llamada a la API fake para usar email y password
    actionApi
      .login(email, password, alias)
      .then((response) => {
        const data = response.data?.data?.login;
        if (data && data.message && data.message.includes("exitoso")) {
          // Verificar que el backend envió el token JWT
          if (!data.token) {
            console.warn("[LOGIN] Backend no envió token JWT");
            this.setState({ error: "Error en autenticación (sin token)" });
            return;
          }

          // Simular campos de la tabla admin_login
          const userData = {
            id: data.id || undefined,
            name: data.name,
            email: data.email,
            alias: data.alias,
            current_role: data.role || "admin",
            active: 1,
            last_access: new Date().toISOString(),
          };

          // ✅ GUARDAR TOKEN JWT Y DATOS DE USUARIO EN LOCALSTORAGE
          saveSession(data.token, userData);
          console.log("[LOGIN] Token guardado en localStorage");

          this.setState({ loggedIn: true, userData });
        } else {
          this.setState({ error: data?.message || "Error en login" });
        }
      })
      .catch((e) => {
        this.setState({ error: "Error en login" });
        console.error(e);
      });
  };

  toggle = () => {
    const formContainer = document.querySelector(".glass-form-container");
    if (formContainer) {
      formContainer.classList.add("form-exit");
    }
    setTimeout(() => {
      const container = document.getElementById("container");
      if (container) {
        container.classList.add("sign-up");
        container.classList.remove("sign-in");
      }
    }, 100);
    setTimeout(() => {
      window.location.href = "/signup";
    }, 600);
  };

  handleForgotPassword = () => {
    this.setState({
      showForgotPassword: true,
      forgotEmail: "",
      forgotMessage: "",
      forgotError: "",
    });
  };

  handleCloseForgotPassword = () => {
    this.setState({
      showForgotPassword: false,
      forgotEmail: "",
      forgotMessage: "",
      forgotError: "",
    });
  };

  handleForgotEmailChange = (e) => {
    this.setState({ forgotEmail: e.target.value });
  };

  handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const { forgotEmail } = this.state;

    if (!forgotEmail) {
      this.setState({ forgotError: "Por favor ingresa tu correo electrónico" });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      this.setState({
        forgotError: "Por favor ingresa un correo electrónico válido",
      });
      return;
    }

    // Llamar a la API para enviar el email de recuperación
    actionApi
      .requestPasswordReset(forgotEmail)
      .then((response) => {
        const data = response.data?.data?.requestPasswordReset;
        if (data?.success) {
          this.setState({
            forgotError: "",
            forgotMessage: `Se ha enviado un enlace de recuperación a ${forgotEmail}. Por favor revisa tu correo.`,
          });

          // Cerrar el modal después de 3 segundos
          setTimeout(() => {
            this.handleCloseForgotPassword();
          }, 3000);
        } else {
          this.setState({
            forgotError:
              data?.message || "Error al enviar email de recuperación",
            forgotMessage: "",
          });
        }
      })
      .catch((error) => {
        console.error("[FORGOT_PASSWORD] Error:", error);
        this.setState({
          forgotError: "Error al procesar solicitud. Intenta nuevamente.",
          forgotMessage: "",
        });
      });
  };

  render() {
    const {
      email,
      password,
      alias,
      error,
      loggedIn,
      userData,
      showForgotPassword,
      forgotEmail,
      forgotMessage,
      forgotError,
    } = this.state;
    if (loggedIn) {
      // Redirige a /dashboardAdmin y pasa el usuario por estado
      return <Navigate to="/dashboardAdmin" state={{ user: userData }} />;
    }
    return (
      <div id="container" className="container">
        {/* MODAL DE RECUPERACIÓN DE CONTRASEÑA */}
        {showForgotPassword && (
          <div
            className="forgot-password-modal-overlay"
            onClick={this.handleCloseForgotPassword}
          >
            <div
              className="forgot-password-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="forgot-password-header">
                <h3>Recuperar Contraseña</h3>
                <button
                  className="close-modal-btn"
                  onClick={this.handleCloseForgotPassword}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <p className="forgot-password-description">
                Ingresa tu correo electrónico y te enviaremos un enlace para
                restablecer tu contraseña.
              </p>
              {forgotError && (
                <div className="glass-error-message">{forgotError}</div>
              )}
              {forgotMessage && (
                <div className="glass-success-message">{forgotMessage}</div>
              )}
              <form onSubmit={this.handleForgotPasswordSubmit}>
                <div className="glass-input-group">
                  <i className="bx bx-envelope"></i>
                  <input
                    type="email"
                    name="forgotEmail"
                    placeholder="Correo electrónico"
                    value={forgotEmail}
                    onChange={this.handleForgotEmailChange}
                    required
                  />
                </div>
                <button type="submit" className="glass-submit-btn">
                  Enviar enlace de recuperación
                </button>
              </form>
            </div>
          </div>
        )}
        {/* FIN MODAL */}
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN IN - RIGHT SIDE */}
          <div
            className="col align-items-center flex-col sign-in"
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-end",
              alignSelf: "center",
              marginLeft: "auto",
            }}
          >
            <div className="form-wrapper align-items-center">
              <div className="glass-form-container">
                <div className="glass-form-header">
                  <div className="glass-camera-icon">
                    <i className="bx bx-camera"></i>
                  </div>
                  <h2 className="glass-form-title">Bienvenido de nuevo</h2>
                  <p className="glass-form-subtitle">
                    Inicia sesión en tu cuenta
                  </p>
                </div>
                {error && <div className="glass-error-message">{error}</div>}
                <form onSubmit={this.handleSubmit}>
                  <div className="glass-input-group">
                    <i className="bx bx-user"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo"
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="glass-input-group">
                    <i className="bx bx-user-voice"></i>
                    <input
                      type="text"
                      name="alias"
                      placeholder="Alias (opcional)"
                      value={alias}
                      onChange={this.handleInputChange}
                    />
                  </div>
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
                  <div className="glass-form-options">
                    <span
                      className="glass-forgot-password"
                      onClick={this.handleForgotPassword}
                    >
                      Olvidé mi contraseña?
                    </span>
                  </div>
                  <button type="submit" className="glass-submit-btn">
                    Iniciar sesión
                  </button>
                </form>
                <div className="glass-form-footer">
                  <p>
                    <span>¿No tienes una cuenta? </span>
                    <span className="glass-form-link" onClick={this.toggle}>
                      Regístrate aquí
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* END SIGN IN */}
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

export default Login;
