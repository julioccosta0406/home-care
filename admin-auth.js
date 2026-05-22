window.QualityLifeAuth = (() => {
    const ADMIN_USERS_KEY = "qualityLifeAdminUsers";
    const SESSION_KEY = "qualityLifeAdminSession";
    const SESSION_DURATION = 1000 * 60 * 60 * 6;
    const DEFAULT_ADMIN = {
        nome: "Administrador",
        usuario: "admin",
        senha: "julio123"
    };

    function getUsers() {
        const savedUsers = localStorage.getItem(ADMIN_USERS_KEY);

        if (!savedUsers) {
            const defaultUsers = [DEFAULT_ADMIN];
            localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(defaultUsers));
            return defaultUsers;
        }

        try {
            return JSON.parse(savedUsers);
        } catch {
            localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify([DEFAULT_ADMIN]));
            return [DEFAULT_ADMIN];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
    }

    function normalize(value) {
        return value.trim().toLowerCase();
    }

    function login(usuario, senha) {
        const users = getUsers();
        const foundUser = users.find((user) => {
            return normalize(user.usuario) === normalize(usuario) && user.senha === senha;
        });

        if (!foundUser) {
            return false;
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify({
            usuario: foundUser.usuario,
            nome: foundUser.nome,
            expiresAt: Date.now() + SESSION_DURATION
        }));

        localStorage.setItem("logado", "true");
        return true;
    }

    function register(nome, usuario, senha) {
        const users = getUsers();
        const userAlreadyExists = users.some((user) => normalize(user.usuario) === normalize(usuario));

        if (userAlreadyExists) {
            return {
                ok: false,
                message: "Esse usuario ja esta cadastrado."
            };
        }

        users.push({
            nome: nome.trim(),
            usuario: usuario.trim(),
            senha
        });

        saveUsers(users);

        return {
            ok: true,
            message: "Cadastro criado com sucesso."
        };
    }

    function getSession() {
        const savedSession = localStorage.getItem(SESSION_KEY);

        if (!savedSession) {
            return null;
        }

        try {
            const session = JSON.parse(savedSession);

            if (!session.expiresAt || session.expiresAt < Date.now()) {
                logout();
                return null;
            }

            return session;
        } catch {
            logout();
            return null;
        }
    }

    function isAdminLoggedIn() {
        return Boolean(getSession());
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem("logado");
    }

    getUsers();

    return {
        getSession,
        isAdminLoggedIn,
        login,
        logout,
        register
    };
})();
