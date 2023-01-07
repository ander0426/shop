import React from 'react';
import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { AddProduct } from './AddProduct';

test('renders AddProduct', () => {
  render(
    <Router>
         <AddProduct/>
    </Router>
 
  );
  const linkElement = screen.getByLabelText('Name');
  expect(linkElement).toBeInTheDocument();
});