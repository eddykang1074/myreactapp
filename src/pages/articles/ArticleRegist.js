import React,{useState,useRef,useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const ArticleRegist = () => {

    //단일 게시글 정보바인딩 상태데이터(뷰모델)정의 
    const [article,setArticle] = useState({title:"",contents:"",userid:"eddy"});

    //HTML DOM을 직접적으로 자바스크립트 문법을 통해 제어해주는 REF훅 생성
    const refTitle = useRef();
    const refContents = useRef();

    const navigate = useNavigate();

   //게시글 정보 입력처리 이벤트 핸들러 
   const handleArticle =(e)=>{
    setArticle({...article,[e.target.name]:e.target.value});
   }


    //해당 컴포넌트가 최초 렌더링시 실행되는 기능 구현  useEffect(()=>{},[]);
    useEffect(()=>{
        refTitle.current.focus();
    },[]);




   //저장버튼 클릭시 백엔드 게시글 등록 API호출해서 화면에서 사용자 입력한 데이터를
   //JSON데이터로 백엔드로 전달하고 등록된 결과를 받아온다.
   const handleSave =()=>{


        if(article.title === ""){
            alert("제목을 입력해주세요.");
            refTitle.current.focus();
            return false;
        }

        if(article.contents === ""){
            alert("내용을 입력해주세요.");
            refContents.current.focus();
            return false;
        }


        axios.post('http://localhost:3001/api/article/create',article)
        .then((res)=>{
            console.log("게시글 등록결과값 확인:",res.data);
            navigate('/article/list');
        })
        .catch((err)=>{

        });
   }

    
    return (
        <div>
            <h1>게시글 등록 페이지</h1>
            <div>
                <label for="title">제목</label>
                <input type="text" ref={refTitle} id="title" name="title" value={article.title} onChange={handleArticle} />
            </div>

            <div>
                <label for="contents">내용</label>
                <textarea ref={refContents} value={article.contents} id="contents" name="contents" onChange={handleArticle}></textarea>
            </div>

            <div>
            <button onClick={handleSave}>저장</button>
            <button onClick={() => { navigate('/article/list')}}>게시글목록이동</button>
            </div>
    
        </div>
    );



};

export default ArticleRegist;