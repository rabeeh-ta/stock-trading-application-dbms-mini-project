function Navbar(props) {
  return (
    <nav>
      {props.name ? (
        <ul>
          <li>home</li>
          <li>Trade</li>
          <li>Portfolio</li>
          <li>History</li>
        </ul>
      ) : (
        <ul></ul>
      )}

      <img src="./src/logo.png" alt="" />
    </nav>
  );
}
