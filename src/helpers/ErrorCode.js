function ErrorCode(number) {
  if (number == 403) {
    return /forbidden/;
  }
  if (number == 401) {
    return /unauthorized/;
  }
  return "Unknown";
}
