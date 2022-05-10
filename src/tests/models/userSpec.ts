import { User } from '../../models/user';
import UserModel from '../../models/user';

const store = new UserModel();

describe('User Model Test', () => {
  // Check If Methods Defined or not
  it('should have an authenticate method', () => {
    expect(store.userAuthentication).toBeDefined();
  });
  it('should have a create method [To Create New User]', () => {
    expect(store.createUser).toBeDefined();
  });
  it('should have a delete method [To Delete Specific User]', () => {
    expect(store.deleteUser).toBeDefined();
  });
  it('should have an index method [To Select All Users]', () => {
    expect(store.selectAllUsers).toBeDefined();
  });
  it('should have a show method [To Select Specific User]', () => {
    expect(store.selectUser).toBeDefined();
  });
  // Check The Expected Action Done  by Methods
  it('Check if User is Authenticated', async () => {
    const isUserAuthenticated = await store.userAuthentication('Jr.Nasif', 'nasif@udacity');
    expect(isUserAuthenticated).toBeTruthy;
  });
  it('createUser() should create new user', async () => {
    const newUser: User = await store.createUser({
      first_name: 'Mohammed',
      last_name: 'Nasif',
      username: 'Jr.Nasif',
      password: 'nasif@udacity'
    });
    expect(newUser.username).toBe('Jr.Nasif');
  });

  it('selectAllUsers() should return a list of All Users', async () => {
    const users: User[] = await store.selectAllUsers();
    expect(users.length).toBeGreaterThan(0); // Should Have One User or more
  });

  it('selectUser() should return the Requird User', async () => {
    const user: User = await store.selectUser(1);
    expect(user.id).toEqual(1);
  });

  // it('deleteUser() should remove the user', async () => {
  //   const user: User = await store.deleteUser(0);
  //   expect(user.id).toBe(0);
  // });
});
