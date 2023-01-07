import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/UtilTest";
import {BrowserRouter as Router} from 'react-router-dom';
import { Header } from "./Header";

test("muestra el logo", () => {
  renderWithProviders(<Router><Header /></Router>);
  const linkElement = screen.getByText(/Shop/i);
  expect(linkElement).toBeInTheDocument();
});