import './Header.sass';

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="fs-4 fw-bold">DocuFlow</div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2240/2240692.png"
          alt="User"
          className="rounded-circle shadow-effect"
          width="40"
          height="40"
          style={{
            border: '0',
            outline: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}
        />
      </div>
    </header>
  );
};

export default Header;