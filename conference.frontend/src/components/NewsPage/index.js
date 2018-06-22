import React from 'react';

const NewsPage = (props) => (
    <div>
        <h2>{props.newsData.title}</h2>
        <h5>Автор: {props.newsData.author}</h5>
        <p>{props.newsData.text}</p>
    </div>
);

export default NewsPage;