import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project imports
import App from 'App';
import { BASE_PATH } from 'config';
import { store, persister } from 'store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import { ConfigProvider } from 'contexts/ConfigContext';
import './i18n';

// style + assets
import 'assets/scss/style.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// ==============================|| REACT DOM RENDER  ||============================== //
const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <ConfigProvider>
                    <BrowserRouter basename={BASE_PATH}>
                        <App />
                        <Toaster />
                    </BrowserRouter>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
