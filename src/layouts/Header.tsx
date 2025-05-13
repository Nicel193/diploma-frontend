import './Header.sass';

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="fs-4 fw-bold">FileX</div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfyCwxxufj21np8ZbXm7S8gLrWBUBljLZwnQ&s"
          alt="User"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </div>
    </header>
  );
};

export default Header;
