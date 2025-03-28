export const Header = ({ handleLogout }) => {
  return (
    <div>
      <h1>Header</h1>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
          <li style={{ margin: '0 15px' }}><a href="/login">Login</a></li>
          <li style={{ margin: '0 15px' }}><a href="/login" onClick={handleLogout}>Logout</a></li>
          <li style={{ margin: '0 15px' }}><a href="/my-profile">My Profile</a></li>
          <li style={{ margin: '0 15px' }}><a href="/blog">Blogs</a></li>
        </ul>
      </nav>
    </div>
  );
}