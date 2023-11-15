import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";


const ArticleList = () => {

    //게시글  목록 상태 데이터 정의 
    const [articleList,setArticleList] = useState([]);

    //해당 컴포넌트가 최초 렌더링시 실행되는 기능 구현  useEffect(()=>{},[]);
    useEffect(()=>{

        //axios를 이용해 백엔드의 게시글 목록 데이터를 조회해옵니다.
        axios.get('http://localhost:3001/api/article/list')
        .then((res)=>{
            console.log("백엔드에서 전달된 게시글목록 확인:",res.data);
            setArticleList(res.data.data);
        })
        .catch((err)=>{
            console.log("호출에러발생:",err);
        });

    },[]);


    //const history = useHistory();
    const navigate = useNavigate();

    //게시글 작성 버튼 클릭시 실행되는 이벤트 처리함수 
    const handleRegist =()=>{
        //history.push("/article/regist");
        navigate('/article/regist');
    }



    return (
        <div style={{textAlign:"center"}}>
            <h1>게시글 목록 페이지</h1>
            <button onClick={handleRegist}>게시글작성</button>

            <table>
                <thead>
                    <tr>
                        <th>글고유번호</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>IP주소</th>
                        <th>게시여부</th>
                        <th>등록일시</th>
                        <th>등록자</th>
                    </tr>
                </thead>

                <tbody>


                    {articleList.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.article_id}</td>
                            <td><Link to={{pathname:"/article/modify/"+item.article_idx}}>{item.title}</Link></td>
                            <td>{item.view_count}</td>
                            <td>{item.ip_address}</td>
                            <td>{item.is_display_code}</td>
                            <td>{item.reg_date}</td>
                            <td>{item.reg_member_id}</td>
                        </tr>
                    ))}
   

                </tbody>
            </table>
        </div>
    );


};

export default ArticleList;