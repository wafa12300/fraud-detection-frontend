import { useState } from "react";

export default function NewTransaction({ clients = [], addTransaction }) {

  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");

  const handleSubmit = () => {
    if (!amount || !clientId) return;

    addTransaction(Number(amount), Number(clientId));

    setAmount("");
    setClientId("");
  };

  return (
    <div style={{
      background: "white",
      padding: 15,
      borderRadius: 10
    }}>

      <h3>➕ New Transaction</h3>

      {/* AMOUNT */}
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* CLIENT SELECT */}
      <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      >
        <option value="">Select Client</option>

        {clients.map(c => (
          <option key={c.CustomerId} value={c.CustomerId}>
            {c.Surname} ({c.Country})
          </option>
        ))}

      </select>

      {/* BUTTON */}
      <button onClick={handleSubmit}>
        Submit
      </button>

    </div>
  );
}