import { useState } from "react";

function CreateSong() {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(title);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="submit" value="Add Song" />
    </form>
  );
}

export default CreateSong;
