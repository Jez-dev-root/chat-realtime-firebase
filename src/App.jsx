import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // 🔹 GET en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(50)
    );
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(rows);
    });
    return () => unsub();
  }, []);

  // 🔹 POST
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user.trim() || !text.trim()) return;
    await addDoc(collection(db, "messages"), {
      user: user.trim(),
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>Mini Chat (Firebase + React)</h1>

      <form
        onSubmit={sendMessage}
        style={{ display: "grid", gap: "0.5rem", margin: "1rem 0" }}
      >
        <input
          placeholder="Tu nombre"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          placeholder="Escribe un mensaje"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      <ul style={{ display: "grid", gap: "0.5rem", listStyle: "none", padding: 0 }}>
        {messages.map((m) => (
          <li
            key={m.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.75rem",
            }}
          >
            <div style={{ fontWeight: 600 }}>{m.user || "Anon"}</div>
            <div>{m.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
