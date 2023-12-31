import { render, screen } from "@testing-library/react";
import { ExchangeInfoProvider, useExchangeInfo } from ".";

const MockComponent = () => {
  useExchangeInfo();

  return <div data-testid="component-test" />;
};

test("should ExchangeInfoProvider provides context correctly", () => {
  render(
    <ExchangeInfoProvider>
      <MockComponent />
    </ExchangeInfoProvider>
  );

  expect(screen.getByTestId("component-test")).toBeInTheDocument();
});

test("should useExchangeInfo throws error outside of ExchangeInfoProvider", () => {
  const consoleErrorSpy = jest.spyOn(console, "error");
  consoleErrorSpy.mockImplementation(() => {});

  expect(() => {
    render(<MockComponent />);
  }).toThrowError(
    "useExchangeInfo must be used within an ExchangeInfoProvider"
  );

  consoleErrorSpy.mockRestore();
});
