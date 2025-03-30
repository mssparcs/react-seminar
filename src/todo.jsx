import { use, useEffect, useState } from "react";
import "./todo.css";

function viewList() {
    if (localStorage.getItem('todolist') === null) {
        localStorage.setItem('todolist', '[]');
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem('todolist'));
    }
}

function syncList(target) {
    localStorage.setItem('todolist', JSON.stringify(target));
}

function TodoList() {
    const [listData, setListData] = useState(viewList());

    syncList(listData);

    let props = (i) => ({
        listData, i,
        updateItem: (value) => {
            let listData2 = [...listData];
            listData2[i] = value;
            setListData(listData2);
        },
        deleteItem: () => {
            let listData2 = [...listData];
            listData2.splice(i, 1);
            setListData(listData2);
        },
        addItem: (item, clear) => () => {
            let listData2 = [...listData];
            listData2.push(item);
            clear('');
            setListData(listData2);
        }
    });

    return (
        <>
            <h1>Todo List</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px', gap: '4px' }}>
                {listData.map((e, i) => (
                    <TodoItem {...props(i)} newItem={false} key={i}></TodoItem>
                ))}
                <TodoItem {...props(-1)} newItem={true} key={-1}></TodoItem>
            </div>
        </>
    );
}

function TodoItem({ listData, updateItem, i, deleteItem, addItem, newItem }) {
    let [displayValue, setDisplayValue] = useState(listData[i] ?? '');
    useEffect(() => setDisplayValue(listData[i] ?? ''), [listData]);
    let onChange = (evt) => {
        if (newItem) {
            setDisplayValue(evt.target.value);
        }
        else {
            updateItem(evt.target.value);
        }
    };
    let input = (<input type="text" className={newItem ? 'newItem todo' : 'existingItem todo'} value={displayValue} onChange={onChange} />);
    return (
        <>
            {input}
            <button
                className={newItem ? 'newItem todo' : 'existingItem todo'}
                onClick={newItem ? addItem(displayValue, setDisplayValue) : deleteItem}
            >{newItem ? '+' : '-'}</button>
        </>
    );
}

export default function App() {
    return (
        <TodoList></TodoList>
    );
}

// 과제 2. Local Storage를 이용해 Todo List 제작하기
// 조건
// Todo를 추가, 수정, 삭제할 수 있는 기능이 반드시 포함되어야 합니다.
// 새로고침을 하거나, 또는 브라우저를 껐다 켜더라도 저장된 Todo를 확인할 수 있어야 합니다.
// 화려하지는 않더라도, css를 이용해 웹 페이지를 꾸며주세요!
// css 파일을 만들고 jsx 파일에서 import하는 방식 또는
// html 태그에서 style attribute를 사용하는 방식 둘 다 상관 없습니다.
// React 이외의 패키지는 사용하지 말아주세요.
// 제출
// 완료하신 후 소스 코드를 GitHub에 업로드 해주세요.
// GitHub 레포지토리 링크를 댓글로 올려주세요.
// 참고 자료
// LocalStorage 사용법
// 이 과제에서는 React Router가 필요하지 않습니다.