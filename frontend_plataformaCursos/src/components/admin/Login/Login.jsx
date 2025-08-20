import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import actionApi from "../actionApi/actionApi.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      loggedIn: false,
      userData: null,
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
    const { name, email, password } = this.state;
    if (!name || !email || !password) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }
    // Adaptar llamada a la API fake para usar email y password
    actionApi
      .login(name, email, password)
      .then((response) => {
        const data = response.data?.data?.login;
        if (data && data.message && data.message.includes("exitoso")) {
          // Simular campos de la tabla admin_login
          const userData = {
            id: data.id || undefined, // si lo tienes disponible
            name: data.name,
            email: data.email,
            current_role: data.role || "admin",
            active: 1,
            last_access: new Date().toISOString(),
          };
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

  render() {
    const { name, email, password, error, loggedIn, userData } = this.state;
    if (loggedIn) {
      // Redirige a /dashboardAdmin y pasa el usuario por estado
      return <Navigate to="/dashboardAdmin" state={{ user: userData }} />;
    }
    return (
      <div id="container" className="container">
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
                    <span className="glass-forgot-password">
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
