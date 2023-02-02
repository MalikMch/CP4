import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";

const Home = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5500/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (
            window.confirm("Êtes-vous sûr de vouloir supprimer ce contact?")
        ) {
            axios.delete(`http://localhost:5500/api/remove/${id}`);
            toast.success("Contact Supprimé");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <h1>Mon carnet d'adresse</h1>
            <Link to="/addContact">
                <button className="btn btn-contact">Ajouter un contact</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>N°</th>
                        <th style={{ textAlign: "center" }}>Noms</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Contact</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Modifier</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Supprimer</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-view">Voir</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;