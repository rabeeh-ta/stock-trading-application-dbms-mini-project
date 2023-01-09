function Navbar(props) {
  function routingFunction(page) {
    window.location.replace(`./${page}.html`);
  }
  return (
    <div className="navbar">
      <nav>
        {props.page ? (
          <ul>
            <li
              className={props.page == 'Home' ? 'activeTab' : ''}
              onClick={() => {
                routingFunction('home');
              }}
            >
              Home
            </li>
            <li
              className={props.page == 'Trade' ? 'activeTab' : ''}
              onClick={() => {
                routingFunction('trade');
              }}
            >
              Trade
            </li>
            <li
              className={props.page == 'Portfolio' ? 'activeTab' : ''}
              onClick={() => {
                routingFunction('portfolio');
              }}
            >
              Portfolio
            </li>
            <li
              className={props.page == 'Funds' ? 'activeTab' : ''}
              onClick={() => {
                routingFunction('funds');
              }}
            >
              Funds
            </li>
          </ul>
        ) : (
          <ul></ul>
        )}

        <img
          src="./src/logo.png"
          alt=""
          onClick={() => {
            window.location.replace('./index.html');
          }}
        />
      </nav>
    </div>
  );
}
