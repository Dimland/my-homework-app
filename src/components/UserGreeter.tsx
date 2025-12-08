import { useState, useEffect } from "react";

export const UserGreeter = () => {

  // }
  const [name, setName] = useState<string>("Quest");


  useEffect(() => {

    document.title = `Hello, ${name}`;
  }, [name]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h2>User card</h2>

      <p>
        Hello, <strong>{name}</strong>!
      </p>

      <label>
        Enter your name: <br />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{ padding: "5px", marginTop: "5px" }}
        />
      </label>
    </div>
  );
};
