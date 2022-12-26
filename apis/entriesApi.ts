import axios from "axios";

const entriesApi = axios.create({
  baseURL: "https://open-jira-six.vercel.app/api/",
});

export default entriesApi;
