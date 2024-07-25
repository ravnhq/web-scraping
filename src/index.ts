import express, { Express } from "express";
import { chromium } from "playwright";

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handleBrowser = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = "https://blog.logrocket.com";

  try {
    await page.goto(url);
    const titleElement = await page.$("h1");
    const descriptionElement = await page.$("p");
    const title = await titleElement?.textContent();
    const description = await descriptionElement?.textContent();
    const inputElement = await page.$('input[type="text"]');
    const value = await inputElement?.inputValue();

    console.log(title, "<------ TITLE ELEMENT");
    console.log(description, "<------ DESCRIPTION ELEMENT");
    console.log(value, "<----- VALUE");
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

handleBrowser();

app.listen(PORT, () => {
  console.log(`🚀 Server connected on port %d`, PORT);
});
