const publicRouter = [
    { path: "/", whenAuthenticated: "next" },
    { path: "/leapcert", whenAuthenticated: "next" },
    { path: "/home", whenAuthenticated: "next" },
    { path: "/cadastro", whenAuthenticated: "redirect" },
    { path: "/login", whenAuthenticated: "redirect" }
] as const;

export default publicRouter;