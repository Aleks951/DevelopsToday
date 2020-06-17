// Это основной компонент главной страницы
// После GET запроса выводит данные

import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { state, post } from "../reducer/index";

import { getPosts, delPost } from "../utilities/req";

export default () => {
    const dispatch = useDispatch();
    React.useEffect(() => { getPosts(dispatch) }, []);
    const posts: Array<post> = useSelector((state: state) => { return state.posts });

    return (
        <div className="container wrap-posts">
            {posts.map((post, i) => {
                let body: any = post.body;

                // Это условие сокращает текст поста до 2-ух предложений
                if (body && body.length > 70) {
                    body = body.split(".");
                    body.splice(2, body.length - 2);
                    body = body.join(".");
                };

                return (
                    <a href={`/posts/${post.id}`} key={post.id} className="post btn btn-outline-secondary">
                        <i
                            className="fa fa-times my-icon"
                            aria-hidden="true"
                            onClick={(e) => {
                                e.preventDefault();
                                delPost(post.id, i, dispatch);
                            }}
                        />
                        <h1>{post.title}</h1>
                        <h5>{body}</h5>
                    </a>
                );
            })}
        </div>
    );
};