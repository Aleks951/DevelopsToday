// Этот компонент выводит коменты

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { state } from "../../src/reducer";
import { addComment } from "../../src/utilities/req";

export default () => {
    const dispatch = useDispatch();
    let { id, comments, comment } = useSelector((state: state) => {
        return {
            id: state.post.id,
            comments: state.post.comments,
            comment: state.comment
        };
    });

    return (
        <div className="wrap-comments">
            <Div>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => {
                        dispatch({ type: "CHANGESINPUT", input: "comment", value: e.target.value });
                    }}
                />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                        addComment({postId: id, body: comment}, dispatch);
                    }}
                >Save</button>
            </Div>
            <ul className="list-group list-group-flush">
                {comments.map((comment) => {
                    return (
                        <li key={comment.id} className="list-group-item">{comment.body}</li>
                    );
                })}
            </ul>
        </div>
    );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;