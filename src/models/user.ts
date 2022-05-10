import bcrypt from 'bcrypt';
import Client from '../database';

export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const hashedPass = (password: string) => {
  const salt = parseInt(process.env.SALT_ROUNDS as string);
  return bcrypt.hashSync(`${password}${pepper}`, salt);
};

class UserModel {
  // User Authentication
  async userAuthentication(username: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE username=$1';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(`${password}${pepper}`, hashedPass(password))) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Your login is rejected by server: ${(error as Error).message}.`);
    }
  }
  // Create New User
  async createUser(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, email, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        user.username,
        hashedPass(user.password as string)
      ]);
      const createdUser = result.rows[0];
      conn.release();
      return createdUser;
    } catch (error) {
      throw new Error(
        `Unable to create user with username:(${user.username}), Error:${(error as Error).message}.`
      );
    }
  }
  // Update User
  async updateUser(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE users SET email=$1, username=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *`;
      const result = await conn.query(sql, [
        user.email,
        user.username,
        user.first_name,
        user.last_name,
        hashedPass(user.password as string)
      ]);
      const updatedUser = result.rows[0];
      conn.release();
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Unable To Update user (${user.username}), Error:${(error as Error).message}.`
      );
    }
  }
  // Delete User
  async deleteUser(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM users WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      const deletedUser = result.rows[0];
      conn.release();
      return deletedUser;
    } catch (error) {
      throw new Error(`Unable To delete user with id:(${id}}), Error:${(error as Error).message}.`);
    }
  }
  //Select All Users
  async selectAllUsers(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users;';
      const result = await conn.query(sql);
      const allUsers = result.rows;
      conn.release();
      return allUsers;
    } catch (error) {
      throw new Error(`Unable To get users, Error:${(error as Error).message}.`);
    }
  }
  // Select Specific User
  async selectUser(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=$1;`;
      const result = await conn.query(sql, [id]);
      const selectedUser = result.rows[0];
      conn.release();
      return selectedUser;
    } catch (error) {
      throw new Error(`Unable To find user with id:(${id}), Error:${(error as Error).message}.`);
    }
  }
}
export default UserModel;
