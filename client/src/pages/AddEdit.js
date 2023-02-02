import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEdit.css";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { name, email, contact } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:5500/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Veuillez mettre une valeur dans les champs de saisie");
        } else {
            if (!id) {
                axios
                .post("http://localhost:5500/api/post", {
                    name,
                    email,
                    contact,
                })
                .then(() => {
                    setState({ name: "", email: "", contact: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Contact Ajouté");
            } else {
                axios
                .put(`http://localhost:5500/api/update/${id}`, {
                    name,
                    email,
                    contact,
                })
                .then(() => {
                    setState({ name: "", email: "", contact: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Contact mis à jour");
            }
            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value});
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
            onSubmit={ handleSubmit }
            >
                <label htmlFor="name">Nom</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Nom..."
                value={ name || "" }
                onChange={ handleInputChange }
            />
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Email..."
                value={ email || "" }
                onChange={ handleInputChange }
            />
                <label htmlFor="contact">Contact</label>
                <input
                type="number"
                id="contact"
                name="contact"
                placeholder="Your name N°..."
                value={ contact || "" }
                onChange={ handleInputChange }
            />
            <input type="submit" value={ id ? "Mettre à jour" : "Enregistrer" } />
            <Link to="/">
                <input type="button" value="Retour" />
            </Link>
            </form>
        </div>
    );
};

export default AddEdit;