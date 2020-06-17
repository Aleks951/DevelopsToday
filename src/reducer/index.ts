import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface post {
    id: number,
    title: string,
    body: string,
    comments?: Array<comment>
};

export interface comment {
    id: number,
    postId: number,
    body: string
};

export interface state {
    posts: Array<post>,
    post?: post,
    title: string,
    body: string,
    comment: string,
    edit: boolean
};

const initialState: state = {
    posts: [],
    title: "",
    body: "",
    comment: "",
    edit: false
};

const reducer = (state = initialState, action: any) => {
    // GETPOSTS
    if (action.type === "GETPOSTS") {
        return {
            ...state,
            posts: action.posts
        };
    };

    // GETPOST
    if (action.type === "GETPOST") {
        return {
            ...state,
            post: action.post
        };
    };

    // ADDPOST
    if (action.type === "ADDPOST") {
        return {
            ...state,
            title: "",
            body: ""
        };
    };

    // Все поля ввода обрабатываются здесь
    // CHANGESINPUT
    if (action.type === "CHANGESINPUT") {
        switch (action.input) {
            case "title":
                return {
                    ...state,
                    title: action.value
                };
                break;
            case "body":
                return {
                    ...state,
                    body: action.value
                };
                break;
            case "comment":
                return {
                    ...state,
                    comment: action.value
                };
                break;
        };
    };

    // Здесь происходит перестройка страницы, точнее замена полей для чтения на поля для ввода
    // EDIT
    if (action.type === "EDIT") {
        return {
            ...state,
            title: state.post.title,
            body: state.post.body,
            edit: true
        };
    };

    // Обратный процесс предыдущей операции
    // EDITINGDONE
    if (action.type === "EDITINGDONE") {
        let post = state.post;
        post.title = state.title;
        post.body = state.body;

        return {
            ...state,
            post,
            edit: false
        };
    };

    // После удаления поста на сервере, пост вырезаеться из масива
    // DELPOST
    if (action.type === "DELPOST") {
        let posts = [
            ...state.posts
        ];
        posts.splice(action.i, 1);

        return {
            ...state,
            posts
        };
    };

    // ADDCOMMENT
    if (action.type === "ADDCOMMENT") {
        let post = {
            ...state.post
        };

        post.comments.push(action.res);

        return {
            ...state,
            post,
            comment: ""
        };
    };

    return state;
};

// Customization
// Создание и настройка store

let store;

function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })

        store = undefined;
    };

    if (typeof window === 'undefined') return _store;

    if (!store) store = _store;

    return _store;
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
};