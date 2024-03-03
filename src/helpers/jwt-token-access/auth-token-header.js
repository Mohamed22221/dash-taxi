export default function authHeader() {
  const obj = JSON.parse(sessionStorage.getItem("user"))

  if (obj && obj.accessToken) {
    return { Authorization: obj.access_token }
  } else {
    return {}
  }
}
