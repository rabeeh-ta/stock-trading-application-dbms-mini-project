function Navbar(props) {
  return (
    <nav>
      {props.page ? (
        <ul>
          <li className={props.page == 'Home' ? 'activeTab' : ''}>Home</li>
          <li className={props.page == 'Trade' ? 'activeTab' : ''}>Trade</li>
          <li className={props.page == 'Portfolio' ? 'activeTab' : ''}>
            Portfolio
          </li>
          <li className={props.page == 'Funds' ? 'activeTab' : ''}>Funds</li>
        </ul>
      ) : (
        <ul></ul>
      )}

      <img src="./src/logo.png" alt="" />
    </nav>
  );
}
