function isObject(input) {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

print(isObject({}));
