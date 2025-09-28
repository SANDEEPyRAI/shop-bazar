// Simple User model for file-based storage
class User {
  constructor(username, email, password, isAdmin = false) {
    this.id = Date.now(); // unique ID
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin; // default false
  }
}

export default User;
