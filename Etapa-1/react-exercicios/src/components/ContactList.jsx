import React, { useState, useEffect, useRef } from "react";

import Contact from "./Contact";

const ContactList = () => {
  const [contacts, setContact] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");

  useEffect(() => {
    const itens = document.querySelectorAll("li");
    itens.forEach((li) => {
    const editButton = li.querySelector(".edit-button");
    const deleteButton = li.querySelector(".delete-button");
    const id = li.id;
    editButton.onclick = () => startEditing(id);
    deleteButton.onclick = () => deleteContact(id);
  });
  }, [contacts]);

  // Create
  const addContact = () => {
    if (name.trim() === "" || phone.trim() === "") return;
    setContact([...contacts, { id: Date.now(), name: name, phone: phone }]);
    setName("");
    setPhone("");
  };

  // Update
  const startEditing = (id) => {
    setEditingId(Number(id));
    const contactToEdit = contacts.find((contact) => contact.id === Number(id));
    setEditingName(contactToEdit.name);
    setEditingPhone(contactToEdit.phone);
  };
  const saveEditing = () => {
    setContact(
      contacts.map((contact) =>
        contact.id === editingId
          ? { ...contact, name: editingName, phone: editingPhone }
          : contact
      )
    );
    setEditingId(null);
    setEditingName("");
    setEditingPhone("");
  };
  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
    setEditingPhone("");
  };

  // Delete
  const deleteContact = (id) => {
    setContact(contacts.filter((contact) => contact.id !== Number(id)));
    if (id = editingId) {
      setEditingId(null);
      setEditingName("");
      setEditingPhone("");
    }
  };

  return (
    <>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Escreva o nome..."
      />
      <input
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Escreva o telefone..."
      />
      <button onClick={addContact}>Incluir contato</button>
      <Contact data={contacts} />
      {editingId && (
        <>
          <input
            type="name"
            value={editingName}
            onChange={(event) => setEditingName(event.target.value)}
          />
          <input
            type="phone"
            value={editingPhone}
            onChange={(event) => setEditingPhone(event.target.value)}
          />
          <button onClick={saveEditing}>Salvar</button>
          <a href="#" onClick={cancelEditing}>
            Cancelar
          </a>
        </>
      )}
    </>
  );
};

export default ContactList;
