// В этом файле написаны все сетевые запросы приложения
// После ответа, данные идут в reduser

import axios from "axios";

// Этот запрос получает все посты (Главная)
export function getPosts(dispatch: Function) {
    axios("https://simple-blog-api.crew.red/posts")
        .then(res => dispatch({ type: "GETPOSTS", posts: res.data }));
};

// Этот запрос получает один пост по id (Страница поста)
export function getPost(id: string | string[], dispatch: Function) {
    if (id === undefined) return;
    axios(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
        .then(res => dispatch({ type: "GETPOST", post: res.data }));
};

interface newPost {
    title: string,
    body: string
};

// Этот запрос отправляет данные о новом посте (Добавить новый пост)
export function addPost(newPost: newPost, dispatch: Function) {
    axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(newPost),
        url: 'https://simple-blog-api.crew.red/posts'
    })
        .then(res => dispatch({ type: "ADDPOST" }));
};

// Этот запрос редактирует пост (Страница поста)
export function editPost(id: string | string[], newPost: newPost, dispatch: Function) {
    axios({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(newPost),
        url: `https://simple-blog-api.crew.red/posts/${id}`
    })
        .then(res => dispatch({ type: "EDITINGDONE" }));
};

// Этот запрос удаляет пост по id (Главная)
export function delPost(id: number, i: number, dispatch: Function) {
    axios({
        method: "DELETE",
        url: `https://simple-blog-api.crew.red/posts/${id}`
    })
        .then(res => dispatch({ type: "DELPOST", i }));
};

interface newComment {
    postId: number,
    body: string
};

// Этот запрос отправляет данные о новом коментарии (Страница поста)
export function addComment(newComment: newComment, dispatch: Function) {
    axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(newComment),
        url: 'https://simple-blog-api.crew.red/comments'
    })
        .then(res => dispatch({ type: "ADDCOMMENT", res: res.data }));
};