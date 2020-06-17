// Это компонент формы для отправки данных. Input связаны с redux, а кнопка делает запрос на сервер

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { state } from "../reducer";

interface props {
    req: Function,
    nameButton: string
};

export default (props: props) => {
    const dispatch = useDispatch();
    let { title, body } = useSelector((state: state) => { return { title: state.title, body: state.body } });

    return (
        <div className="my-wrap-form wrap-content">
            <div className="form-group">
                <h3>Title</h3>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => {
                        dispatch({ type: "CHANGESINPUT", input: "title", value: e.target.value });
                    }}
                />
            </div>
            <div className="form-group">
                <h3>Text</h3>
                <textarea
                    className="form-control"
                    value={body}
                    onChange={(e) => {
                        dispatch({ type: "CHANGESINPUT", input: "body", value: e.target.value });
                    }}
                />
            </div>
            <div>
                <button
                    className="btn btn-info"
                    onClick={() => props.req({title, body}, dispatch)}
                >{props.nameButton}</button>
            </div>
        </div>
    );
};