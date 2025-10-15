import React, { Component } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import actionApi from "./admin/actionApi/actionApi.js";

// Wrapper para usar hooks en class component
function withSearchParams(Component) {
  return (props) => {
    const [searchParams] = useSearchParams();
    return <Component {...props} searchParams={searchParams} />;
  };
}

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      newPassword: "",
      confirmPassword: "",
      error: "",
      success: false,
      loading: true,
      tokenValid: false,
      userEmail: "",
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    // Obtener token de la URL
    const token = this.props.searchParams.get("token");

    if (!token) {
      this.setState({
        error: "Token no proporcionado",
        loading: false,
      });
      return;
    }

    this.setState({ token });

    // Verificar que el token sea válido
    actionApi
      .verifyResetToken(token)
      .then((response) => {
        const data = response.data?.data?.verifyResetToken;
        if (data?.valid) {
          this.setState({
            loading: false,
            tokenValid: true,
            userEmail: data.email || "",
          });
        } else {
          this.setState({
            loading: false,
            tokenValid: false,
            error: data?.message || "Token inválido o expirado",
          });
        }
      })
      .catch((error) => {
        console.error("[RESET_PASSWORD] Error al verificar token:", error);
        this.setState({
          loading: false,
          tokenValid: false,
          error: "Error al verificar token",
        });
      });

    document.body.classList.add("auth-no-anim");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-no-anim");
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { token, newPassword, confirmPassword } = this.state;

    // Validaciones
    if (!newPassword || !confirmPassword) {
      this.setState({ error: "Todos los campos son obligatorios" });
      return;
    }

    if (newPassword.length < 6) {
      this.setState({
        error: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      this.setState({ error: "Las contraseñas no coinciden" });
      return;
    }

    // Llamar a la API para restablecer contraseña
    actionApi
      .resetPassword(token, newPassword)
      .then((response) => {
        const data = response.data?.data?.resetPassword;
        if (data?.success) {
          this.setState({
            success: true,
            error: "",
          });

          // Redirigir al login después de 3 segundos
          setTimeout(() => {
            this.setState({ redirectToLogin: true });
          }, 3000);
        } else {
          this.setState({
            error: data?.message || "Error al restablecer contraseña",
          });
        }
      })
      .catch((error) => {
        console.error("[RESET_PASSWORD] Error:", error);
        this.setState({
          error: "Error al procesar solicitud. Intenta nuevamente.",
        });
      });
  };

  render() {
    const {
      newPassword,
      confirmPassword,
      error,
      success,
      loading,
      tokenValid,
      redirectToLogin,
    } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div id="container" className="container">
        <div className="row">
          <div
            className="col align-items-center flex-col sign-in"
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              margin: "0 auto",
            }}
          >
            <div className="form-wrapper align-items-center">
              <div className="glass-form-container">
                <div className="glass-form-header">
                  <div className="glass-camera-icon">
                    <i className="bx bx-lock-alt"></i>
                  </div>
                  <h2 className="glass-form-title">Restablecer Contraseña</h2>
                  <p className="glass-form-subtitle">
                    Crea una nueva contraseña segura
                  </p>
                </div>

                {loading && (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Verificando token...</p>
                  </div>
                )}

                {!loading && !tokenValid && (
                  <div>
                    <div className="glass-error-message">
                      {error || "Token inválido o expirado"}
                    </div>
                    <button
                      className="glass-submit-btn"
                      onClick={() => (window.location.href = "/login")}
                      style={{ marginTop: "20px" }}
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                )}

                {!loading && tokenValid && !success && (
                  <form onSubmit={this.handleSubmit}>
                    {error && (
                      <div className="glass-error-message">{error}</div>
                    )}

                    <div className="glass-input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={this.handleInputChange}
                        required
                        minLength="6"
                      />
                    </div>

                    <div className="glass-input-group">
                      <i className="bx bxs-lock-alt"></i>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                        required
                        minLength="6"
                      />
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#6c757d",
                        marginBottom: "20px",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                      }}
                    >
                      💡 La contraseña debe tener al menos 6 caracteres
                    </div>

                    <button type="submit" className="glass-submit-btn">
                      Cambiar contraseña
                    </button>
                  </form>
                )}

                {success && (
                  <div>
                    <div className="glass-success-message">
                      ✅ Contraseña actualizada exitosamente
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#666",
                      }}
                    >
                      Redirigiendo al inicio de sesión...
                    </p>
                  </div>
                )}

                <div className="glass-form-footer">
                  <p>
                    <span
                      className="glass-form-link"
                      onClick={() => (window.location.href = "/login")}
                      style={{ cursor: "pointer" }}
                    >
                      ← Volver al inicio de sesión
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Nueva Contraseña</h2>
            </div>
            <div className="img sign-in"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSearchParams(ResetPassword);
