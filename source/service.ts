import axios from "axios";

export const askForLoginCode = async (phone: string) => {
  let resp;
  await axios
    .get(`https://boka.techbuddy.io/api/buddy/login/${phone}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((r) => {
      console.log("RESP1", r);
      resp = r.data;
    })
    .catch((e) => {
      console.log("E", e);
      return false;
    });
  return resp;
};

export const loginSubmit = async (id: string, code: any) => {
  let data;
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("id", id);
  await axios
    .post("https://boka.techbuddy.io/api/buddy/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((r) => {
      console.log("DATA:", r.data.success);
      if (JSON.parse(r.data.success) === true) {
        data = r.data.data;
      } else {
        return false;
      }
    })
    .catch((e) => {
      return false;
    });

  return data;
};

// Authorization: `Bearer ${token}`,
