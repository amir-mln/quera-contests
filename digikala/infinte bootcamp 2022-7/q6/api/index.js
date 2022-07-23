const express = require("express");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const { sign, verify } = require("jsonwebtoken");

const UserModel = (() => {
  const USERS_DATABASE = {};
  const SHORT_URLS_DATABASE = {};
  const TOKEN_SECRET = "token_secret";
  const BASE_SHORT_URL = "http://localhost:80/";

  return {
    validateAuthForm({ username, password }) {
      return (
        username !== undefined &&
        username !== "" &&
        password !== undefined &&
        password !== ""
      );
    },

    checkUserExistence(username) {
      return Object.prototype.hasOwnProperty.call(USERS_DATABASE, username);
    },

    createNewUser({ username, password }) {
      const created_at = new Date().getTime();
      const token = sign({ username, created_at }, TOKEN_SECRET);
      USERS_DATABASE[username] = {
        shortUrls: [],
        created_at,
        username,
        password,
        token,
      };

      return token;
    },

    getUserToken({ username, password }) {
      const userProfile = USERS_DATABASE[username];
      const matchingPassword = userProfile?.password === password;

      if (!matchingPassword || !userProfile)
        throw new Error("invalid username or password");

      return userProfile.token;
    },

    verifyToken(reqToken) {
      const userToken = verify(reqToken, TOKEN_SECRET);
      return userToken.username;
    },

    createShortenedLink({ username, url }) {
      const userProfile = USERS_DATABASE[username];

      const short_url = new Date().getTime().toString();

      const newShortUrl = {
        url,
        short_url: BASE_SHORT_URL + short_url,
        visits_count: 0,
      };

      userProfile.shortUrls.push(short_url);
      SHORT_URLS_DATABASE[short_url] = newShortUrl;

      return newShortUrl.short_url;
    },

    getUserShortLinks(username) {
      const userShortLinks = USERS_DATABASE[username].shortUrls;
      const values = userShortLinks.map((link) => {
        return SHORT_URLS_DATABASE[link];
      });

      return values;
    },

    getRealUrl(short_url) {
      return SHORT_URLS_DATABASE[short_url]?.url;
    },

    increaseShortLink(short_url) {
      SHORT_URLS_DATABASE[short_url].visits_count++;
    },
  };
})();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// CHECKED

app.get("/", (_, res) => res.status(200).json({ ok: true }));

app.get("/urls", (req, res) => {
  const reqToken = req.headers.authorization;
  const username = UserModel.verifyToken(reqToken);
  const userShortLinks = UserModel.getUserShortLinks(username);

  return res.status(200).json(userShortLinks);
});

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const realUrl = UserModel.getRealUrl(slug);

  if (!realUrl) return res.status(404).end();

  UserModel.increaseShortLink(slug);
  return res.status(301).redirect(realUrl);
});

app.post("/signup", (req, res) => {
  const isValidAuthForm = UserModel.validateAuthForm(req.body);

  const existingUser = UserModel.checkUserExistence(req.body.username);

  if (!isValidAuthForm)
    return res
      .status(400)
      .json({ ok: false, error: "no username or password provided" });

  if (existingUser)
    return res.status(400).json({ ok: false, error: "user already exists" });

  const createdUserToken = UserModel.createNewUser(req.body);

  return res.status(201).json({ ok: true, token: createdUserToken });
});

app.post("/login", (req, res) => {
  const isValidAuthForm = UserModel.validateAuthForm(req.body);
  if (!isValidAuthForm)
    return res
      .status(400)
      .json({ ok: false, error: "no username or password provided" });

  try {
    const userToken = UserModel.getUserToken(req.body);
    return res.status(200).json({ ok: true, token: userToken });
  } catch (e) {
    const message = e.message;
    return res.status(400).json({ ok: false, error: message });
  }
});

app.post("/urls", (req, res) => {
  const authToken = req.headers.authorization;
  const url = req.body.url;

  if (!url)
    return res.status(400).json({ ok: false, error: "no url provided" });

  const username = UserModel.verifyToken(authToken);

  const shortenedLink = UserModel.createShortenedLink({ username, url });

  return res.status(201).json({ ok: true, url: shortenedLink });
});

app.listen(80);
