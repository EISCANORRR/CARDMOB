import React from "react";

const Contact = ({ data}) => {
  if (data.length <= 0) return;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {data.map((contact) => (
        <li id={contact.id}  key={contact.id} style={{ display: "flex", margin: "10px 0" }}>
          <p id="name">Nome: {contact.name} </p>
          <p id="phone">Telefone: {contact.phone}</p>
          <button className="edit-button" style={{ marginLeft: "10px" }}>Editar</button>
          <button className="delete-button" style={{ marginLeft: "10px" }}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default Contact;