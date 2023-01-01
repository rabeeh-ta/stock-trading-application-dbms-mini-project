function Navbar(props) {
  return (
    <nav>
      {props.name ? (
        <ul>
          <li>Home</li>
          <li>Trade</li>
          <li>Portfolio</li>
          <li>Funds</li>
        </ul>
      ) : (
        <ul></ul>
      )}

      <img src="./src/logo.png" alt="" />
    </nav>
  );
}
