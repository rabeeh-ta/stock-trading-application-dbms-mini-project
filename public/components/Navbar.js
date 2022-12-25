export function Navbar() {
  const [meme, setMeme] = React.useState(0);

  return (
    <nav>
      {meme}
      <img src="../src/logo.png" alt="" />
      <ul>
        <li>home</li>
      </ul>
    </nav>
  );
}
