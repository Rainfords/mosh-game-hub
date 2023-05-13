import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "03692be2a25d433993a0f5d333d43895",
  },
});
