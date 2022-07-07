import axios from "axios";


export function getUser() {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("/users/get-user")
        .then(({ data }) => {
          const { user, error} = data;
          if (!user) reject(error);
          resolve(user);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}


