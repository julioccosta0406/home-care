window.QualityLifeClientAuth = (() => {
    const SESSION_KEY = "qualityLifeClientSession";

    function readJSON(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
        } catch {
            localStorage.setItem(key, JSON.stringify(fallback));
            return fallback;
        }
    }

    function setSession(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
        }));
    }

    function getSession() {
        return readJSON(SESSION_KEY, null);
    }

    function isLoggedIn() {
        return Boolean(getSession());
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
    }

    function requireLogin() {
        if (!isLoggedIn()) {
            window.location.href = "login.html";
            return null;
        }

        return getSession();
    }

    return {
        getSession,
        isLoggedIn,
        logout,
        requireLogin,
        setSession
    };
})();
