import React,{useState,useRef,useEffect} from 'react';
import axios from "axios";
import {useNavigate,useParams} from 'react-router-dom';

const ArticleModify = () => {

//useParams훅을 통해 라우터에서 정의된 파라메터 키값을 이용 값을 추출합니다.
const { aidx } = useParams();


//단일 게시글 정보바인딩 상태데이터(뷰모델)정의 
const [article,setArticle] = useState({});


//해당 컴포넌트가 최초 렌더링시 실행되는 기능 구현  useEffect(()=>{},[]);
useEffect(()=>{
        //axios를 이용해 백엔드의 게시글 목록 데이터를 조회해옵니다.
        axios.get(`http://localhost:3001/api/article/${aidx}`)
        .then((res)=>{
            console.log("백엔드에서 전달된 단일게시글 정보 확인:",res.data);
            setArticle(res.data.data);
            refTitle.current.focus();
        })
        .catch((err)=>{
            console.log("호출에러발생:",err);
        });

},[]);


//HTML DOM을 직접적으로 자바스크립트 문법을 통해 제어해주는 REF훅 생성
const refTitle = useRef();
const refContents = useRef();

const navigate = useNavigate();

//게시글 정보 입력처리 이벤트 핸들러 
const handleArticle =(e)=>{
    setArticle({...article,[e.target.name]:e.target.value});
}

//저장버튼 클릭시 백엔드 게시글 등록 API호출해서 화면에서 사용자 입력한 데이터를
//JSON데이터로 백엔드로 전달하고 등록된 결과를 받아온다.
const handleSave =()=>{
    axios.post(`http://localhost:3001/api/article/modify/${article.article_idx}`,article)
    .then((res)=>{
        console.log("게시글 수정결과값 확인:",res.data);
        navigate('/article/list');
    })
    .catch((err)=>{
        console.log("게시글 수정 에러 메시지:",err);
    });
}


//게시글 삭제 이벤트 핸들러 
const handleDelete =()=>{

    axios.delete(`http://localhost:3001/api/article/${article.article_idx}`)
    .then((res)=>{
        console.log("게시글 삭제 결과값 확인:",res.data);
        if(res.data.code === 200){
            navigate('/article/list');
        }else{
            console.log("게시글 수정 에러 메시지:",res.data.result);
        }
    })
    .catch((err)=>{
        console.log("게시글 삭제 에러 메시지:",err);
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
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => { navigate('/article/list')}}>게시글목록이동</button>
            </div>
    
        </div>
    );
};

export default ArticleModify;