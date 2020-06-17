// Эта страница отображает пост целиком
// После GET запроса отображаем данные
// Так же есть возможность редактировать пост

import React from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";

import { state } from "../../../src/reducer";
import { getPost, editPost } from "../../../src/utilities/req";

import Menu from "../../../src/components/Menu";
import Footer from "../../../src/components/Footer";
import Form from "../../../src/components/Form";
import Comments from "../../../src/components/Comments";

export default () => {
    let content: null | JSX.Element = null;
    const dispatch = useDispatch();

    const router = useRouter();
    const { postId } = router.query;

    React.useEffect(() => {
        getPost(postId, dispatch)
    }, [postId]);

    const { post, edit } = useSelector((state: state) => { return { post: state.post, edit: state.edit } });

    if (post) {
        content = (
            <div className="container wrap-posts wrap-post">
                <div className="wrap-content">
                    <h1>{post.title}</h1>
                    <h5>{post.body}</h5>
                    <div>
                        <button
                            className="btn btn-info"
                            onClick={() => { dispatch({ type: "EDIT" }) }}
                        >Edit</button>
                    </div>
                </div>
                <Comments />
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <Menu />
            {edit ? <Form req={(obj, fun) => { editPost(postId, obj, fun) }} nameButton="Save" /> : content}
            <Footer />
        </>
    );
};