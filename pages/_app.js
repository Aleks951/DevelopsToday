// В этом файле глобально подключен scss, redux и стили

import '../src/index.scss';
import "../src/fonts/css/font-awesome.min.css";
import { Provider } from 'react-redux';
import { useStore } from '../src/reducer';

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};