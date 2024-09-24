

const config = {
    // BACKEND_ROUTE: "https://backend-proyecto-final-b07n.onrender.com",
    BACKEND_ROUTE: import.meta.env.VITE_BACKEND_ROUTE ? import.meta.env.VITE_BACKEND_ROUTE: "http://localhost:8080",
    get GIT_PASSPORT() { return `${this.BACKEND_ROUTE}/auth/ghlogin`},
    get GGL_PASSPORT() { return `${this.BACKEND_ROUTE}/auth/ggllogin`}
}

export default config