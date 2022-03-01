import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CountProvider } from "../contexts/count";
import App from "../App";

test("Should throw error when not wrapped inside Provider", () => {
  expect(() => render(<App />)).toThrow("count");
});

test("Loads with correct initial data", () => {
  render(
    <CountProvider>
      <App />
    </CountProvider>
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0");
});

test("Increment by 5 works correctly", () => {
  render(
    <CountProvider>
      <App />
    </CountProvider>
  );

  fireEvent.click(screen.getByText("Increment by 5"));
  fireEvent.click(screen.getByText("Increment by 5"));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("10");
});

test("Decrement by 1 works correctly", () => {
  render(
    <CountProvider>
      <App />
    </CountProvider>
  );

  fireEvent.click(screen.getByText("Increment by 5"));
  fireEvent.click(screen.getByText("Decrement by 1"));
  fireEvent.click(screen.getByText("Decrement by 1"));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("3");
});

test("Back To Zero works correctly", () => {
  render(
    <CountProvider>
      <App />
    </CountProvider>
  );

  fireEvent.click(screen.getByText("Increment by 5"));
  fireEvent.click(screen.getByText("Back To Zero"));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0");
});
