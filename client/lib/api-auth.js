const API = import.meta.env.VITE_API_URL;

const signin = async (user) => {
  try {
    const response = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const signout = async () => {
  try {
    const response = await fetch(`${API}/auth/signout`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export { signin, signout };