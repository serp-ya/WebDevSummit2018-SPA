import React, { Component } from 'react';
import NewsCard from '../NewsCard';
import { Link } from 'react-router-dom';

import { apiRoutes } from '../../apiConfig';

class NewsList extends Component {

    componentDidMount() {
        if (!this.props.newsList) {
            this.props.loadNews();
        }
    }

    render() {
        const { newsList, deleteNewsHandler } = this.props;
        return (
            <div>
                <Link className="App-link" to={apiRoutes.news + '/add'}>
                    Добавить новость
                </Link>

                <h3>Список всех новостей:</h3>

                {!newsList ? null : newsList.map(news => (
                    <NewsCard key={news.id} deleteNewsHandler={deleteNewsHandler} {...news} />
                ))}
            </div>
        )
    }
}

export default NewsList;