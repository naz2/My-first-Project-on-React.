import axios from "axios";

export default {
    films: {
        fetchAll: () => axios.get("/api/authfilms").then(res => res.data.films),
        create: film =>
            axios.post("/api/authfilms", { film }).then(res => res.data.film),
        update: film =>
            axios
            .put(`/api/authfilms/${film._id}`, { film })
            .then(res => res.data.film),
        delete: film => axios.delete(`/api/authfilms/${film._id}`),
        fetchFilm: id =>
            axios.get(`/api/authfilms/${id}`).then(res => res.data.film),
    },
    users: {
        create: user => axios.post("/api/users", { user }),
        login: credentials =>
            axios.post("/api/auth", { credentials }).then(res => res.data.token),
    },
};

export const setAutorizationHeader = (token = null) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};