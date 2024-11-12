import { method } from "lodash";

export const logInMailAndPassword = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const logInGoogle = async (tokenId, email) => {
  try {
    // TODO: send the tokenId
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const jwtLogin = async (jwt) => {
  try {
    // TODO fetch to the backend to validate the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login/JWT`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
