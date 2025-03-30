import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

import { useSearchParams } from 'react-router';
import NewWord from './NewWord';
import Word from './Word';

function App({ mode }) {
    const [allWords, setAllWords] = useState([]);
    const [displayWords, setDisplayWords] = useState([]);
    const [params, setParams] = useSearchParams();
    useEffect(() => {
        fetch('https://sparcs.minchan.me/words.json').then((res) => res.json()).then((data) => setAllWords(data.map((e, i) => ({ id: i, ...e }))));
    }, []);

    useEffect(() => {
        if (displayWords.length === 0 && allWords.length > 0) {
            setDisplayWords([allWords[0]]);
        }
    }, [allWords]);

    function addNewWord() {
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        setDisplayWords([randomWord, ...displayWords]);
    }

    switch (mode) {
        case 'search':
            const searchAuthor = params.get('author');
            const searchYear = params.get('year');
            let filtered = [...allWords];
            if (searchAuthor) {
                filtered = filtered.filter(e => e.author == searchAuthor);
            }
            if (searchYear) {
                filtered = filtered.filter(e => e.year == searchYear);
            }
            return (
                <>
                    <h1>SPARCS 명언 검색</h1>
                    <ol>
                        {filtered.map((word, index) => (
                            <Word key={index} message={word.message} author={word.author} idx={word.id} />
                        ))}
                    </ol>
                </>
            );
        case 'details':
            if (allWords[params.get('id')]) {
                const { message, author, display_author, year } = allWords[params.get('id')];
                return (
                    <>
                        <h1>SPARCS 명언</h1>
                        <h3>{message}</h3>
                        <p style={{ textAlign: "right" }}>{display_author} ({author})</p>
                        <p style={{ textAlign: "right" }}>{year}</p>
                    </>
                );

            }
            else {

            }
        case 'index':
        default:
            return (
                <>
                    <h1>SPARCS 명언 목록</h1>
                    <form action="/search" method="get">
                        <label>Year</label>
                        <input type="number" id="year" name="year" defaultValue={2025} />
                        <label>Author</label>
                        <input type="text" id="author" name="author" defaultValue={''} />
                        <input type="submit" value="검색" />
                    </form>
                    <br />
                    <NewWord addNewWordProp={addNewWord} />
                    <ol>
                        {displayWords.map((word, index) => (
                            <Word key={index} message={word.message} author={word.author} idx={word.id} />
                        ))}
                    </ol>
                </>
            );
    }
}

export default App

/*

실습 1
• 간단한 SPARCS 명언 표시 사이트를 만들어 봅시다!
• https://sparcs.minchan.me/words.json에서 JSON으로 정리된 명언 목록을 가져올 수 있습니다.
• 랜덤으로 명언을 하나 추출해서 보여주고, 새로고침 버튼을 누르면 새로운 명언을 그 위에 보여줍시다.

실습 2
• SPARCS 명언 표시 사이트를 업데이트 해 봅시다!

/search?year=(연도)
/search?author=(이름)
/search?year=(연도)&author=(이름)
/details?id=(명언 아이디)

페이지를 만들어 봅시다.

*/
