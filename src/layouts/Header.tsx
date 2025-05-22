import './Header.sass';

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="fs-4 fw-bold">DocuFlow</div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
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