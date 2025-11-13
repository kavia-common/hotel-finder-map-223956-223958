import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { bootstrapMocks } from './mocks/browser';

beforeAll(async () => {
  await bootstrapMocks();
});

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

test('renders navbar brand', async () => {
  renderApp();
  expect(await screen.findByLabelText(/Hotel Finder/)).toBeInTheDocument();
});

test('renders map container region', async () => {
  renderApp();
  expect(await screen.findByLabelText(/Map/)).toBeInTheDocument();
});

test('loads hotel list from MSW', async () => {
  renderApp();
  await waitFor(async () => {
    const resultsHeader = await screen.findByText(/results/i);
    expect(resultsHeader).toBeInTheDocument();
  });
});
