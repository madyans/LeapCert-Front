const routers = [
    { path: "/", isPublic: true, whenAuthenticated: "next" },
    { path: "/home", isPublic: false, whenAuthenticated: "next" },
    { path: "/leapcert", isPublic: true, whenAuthenticated: "next" },
    { path: "/home/cursos", isPublic: false, whenAuthenticated: "next" },
    { path: "/cadastro", isPublic: true, whenAuthenticated: "redirect" },
    { path: "/login", isPublic: true, whenAuthenticated: "redirect" }
] as const;

export default routers;