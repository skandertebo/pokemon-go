type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  gender: "Female" | "Male" | "Non Binary" | "Prefer not to say";
};

export default User;
