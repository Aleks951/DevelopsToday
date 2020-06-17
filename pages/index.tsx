// Это главная страница (описание компонентов можно найти в соотвествующих файлах)

import Head from 'next/head';
import Home from "../src/components/Home";
import Menu from "../src/components/Menu";
import Footer from "../src/components/Footer";

export default () => {
  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <Menu />
      <header className="my-header">
        <h1>Test task</h1>
        <h4>My first blog</h4>
      </header>
      <Home />
      <Footer />
    </>
  );
};