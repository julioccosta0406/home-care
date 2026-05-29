window.QualityLifeAuth = {
    getSession(){
        return null;
    },
    isAdminLoggedIn(){
        return false;
    },
    login(){
        return false;
    },
    logout(){
        localStorage.removeItem("qualityLifeAdminSession");
        localStorage.removeItem("logado");
    },
    register(){
        return {
            ok: false,
            message: "O acesso admin agora e gerenciado pelo Firebase Authentication."
        };
    }
};
