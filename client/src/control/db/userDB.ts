import axios from "axios";


export function getUser() {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("/users/get-user")
        .then(({ data }) => {
          const { user } = data;
          if (!user) reject(false);
          resolve(user);
        })
        .catch((err) => {
          console.error(err);
          reject(false);
        });
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}


