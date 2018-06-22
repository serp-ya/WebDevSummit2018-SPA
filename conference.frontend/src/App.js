import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory'

import { apiUrl, apiRoutes } from './apiConfig';

import MainPage from './components/MainPage';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';
import NewsAdd from './components/NewsAdd';

import UsersList from './components/UsersList';
import './App.css';

const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: null,
      usersList: null,
    };
  }

  loadNews = () => {
    fetch(apiUrl + apiRoutes.news)
      .then(res => res.json())
      .then(res => this.setState({newsList: res}))
      .catch(error => {
        alert('Ошибка при получении списка новостей');
        console.error(error);
      });
  }

  loadUsers = () => {
    fetch(apiUrl + apiRoutes.users)
      .then(res => res.json())
      .then(res => this.setState({usersList: res}))
      .catch(error => {
        alert('Ошибка при получении списка пользователей');
        console.error(error);
      });
  }

  renderSingleNews = ({ match }) => {
    const { id: currentNewsId } = match.params;

    if (!this.state.newsList) {
      return <p>Новости ещё не загрузились</p>;
    }

    const newsData = this.state.newsList.find(
        news => Number(news.id) === Number(currentNewsId)
    );
    
    return <NewsPage newsData={newsData} />
  }

  addNewsCallback = (newNews) => {
    const { newsList } = this.state;
    this.setState({newsList: [...newsList, newNews]});
  }

  deleteNewsHandler = (id) => () => {
    const requestUrl = apiUrl + apiRoutes.news + `?id=${id}`;
    const { newsList } = this.state;
    console.log('deleteNewsHandler requestUrl', requestUrl);
    
    fetch(requestUrl, {method: 'DELETE'})
      .then(res => {
        const { status } = res;

        if (status < 200 || status > 299) {
          throw new Error(`Ошибка при удалении! Код: ${status}`);
        }

        const cleanNewsList = newsList.filter(news => news.id !== id);
        this.setState({newsList: cleanNewsList});

        alert(`Статья с id: ${id} удалена!`);
      })
      .catch(error => {
        console.log('catch error');
        console.error(error);
      });
  }

  render() {
    const { newsList, usersList } = this.state;

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Router history={history}>
          <div className="App-body">
            
            <nav className="App-nav-bar">
              <Link className="App-nav-item" to='/'>Главная</Link>
              <Link className="App-nav-item" to={apiRoutes.users}>Пользователи</Link>
              <Link className="App-nav-item" to={apiRoutes.news}>Новости</Link>
            </nav>

            <Switch>
            
              <Route exact path='/'>
                <MainPage />
              </Route>

              <Route exact path={apiRoutes.users}>
                <UsersList loadUsers={this.loadUsers} usersList={usersList} />
              </Route>
            
              <Route exact path={apiRoutes.news}>
                <NewsList loadNews={this.loadNews} deleteNewsHandler={this.deleteNewsHandler} newsList={newsList} />
              </Route>
            
              <Route exact path={apiRoutes.news + '/add'}>
                <NewsAdd addNewsCallback={this.addNewsCallback} />
              </Route>
            
              <Route exact path={apiRoutes.news + '/:id'} component={this.renderSingleNews} />
              
            </Switch>

          </div>
        </Router>

      </div>
    );
  }
}

export default App;
