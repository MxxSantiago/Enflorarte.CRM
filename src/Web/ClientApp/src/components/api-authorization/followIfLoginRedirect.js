import { sessionStorageKey } from "../../core/constants.ts";

const baseUrl = document.getElementsByTagName("base")[0].href;
const loginUrl = `${baseUrl}Identity/Account/Login`;

export default function followIfLoginRedirect(response) {
  if (response.redirected && response.url.startsWith(loginUrl)) {
    localStorage.removeItem(sessionStorageKey);
    window.location.href = `${loginUrl}?ReturnUrl=${window.location.pathname}`;
  }
}
