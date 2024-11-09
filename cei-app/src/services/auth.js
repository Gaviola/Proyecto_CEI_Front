export const logInMailAndPassword = async (email, password) => {
  try {
    const response = await fetch("http://192.168.194.158:8080/login/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await fetch("http://192.168.194.158:8080/register/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const logInGoogle = async (tokenId) => {
  // TODO
  return await fetch("");
};
