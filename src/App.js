import logo from './logo.svg';
import './App.css';

import {Routes,Route} from "react-router-dom";


//공통영역 컴포넌트 참조하기
import TopMenuBar from './components/TopMenu';
import FooterBar from './components/Footer';


//각종 페이지 컴포넌트 참조하기 
import MainPage from './pages/Main';
import ArticleListPage from './pages/articles/ArticleList';
import ArticleRegistPage from './pages/articles/ArticleRegist';
import ArticleModifyPage from './pages/articles/ArticleModify'


function App() {
  return (
    <div className="App">
      <TopMenuBar/>
   
      <Routes>
        <Route path='/' Component={MainPage} exact={true}></Route>
        <Route path='/article/list' Component={ArticleListPage}></Route>
        <Route path='/article/regist' Component={ArticleRegistPage}></Route>
        <Route path='/article/modify/:aidx' Component={ArticleModifyPage}></Route>
      </Routes>

      <FooterBar/>
    </div>
  );
}

export default App;
