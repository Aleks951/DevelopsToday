// Эта страница отображает инструменты для создания поста 

import React from "react";
import Head from 'next/head';

import { addPost } from "../../../src/utilities/req";

import Menu from "../../../src/components/Menu";
import Footer from "../../../src/components/Footer";
import Form from "../../../src/components/Form";

export default () => {
    return (
        <>
            <Head>
                <title>Create new post</title>
            </Head>
            <Menu />
            <Form
                req={addPost}
                nameButton="Add"
            />
            <Footer />
        </>
    );
};