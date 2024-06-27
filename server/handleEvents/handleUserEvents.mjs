import { User } from "../config/db.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const handleUserEvents = (socket) => {
  socket.on("client_login", async ({ username, password }) => {
    try {
      const searchedUser = await User.findOne({ username: username });
      if (!searchedUser) {
        throw new Error("Credenciales incorrectas");
      }

      const hashedPassword = searchedUser.password;
      const isValid = bcrypt.compareSync(password, hashedPassword);

      if (isValid) {
        const user = {
          _id: searchedUser._id,
          username: searchedUser.username,
          roles: searchedUser.roles,
        };
        socket.emit("server_login", user);
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      socket.emit("error", error.message);
    }
  });

  socket.on("client_signup", async ({ username, password }) => {
    try {
      const exists = await User.findOne({ username: username });

      if (!exists) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hashedPassword) {
            const newUser = await new User({
              username: username,
              password: hashedPassword,
            });

            await newUser.save();
            const user = {
              _id: newUser._id,
              username: newUser.username,
              roles: newUser.roles,
            };

            socket.emit("server_signup", user);
          });
        });
      } else {
        throw new Error("El usuario ya existe");
      }
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
};
export default handleUserEvents;
