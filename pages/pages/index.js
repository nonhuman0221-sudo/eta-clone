import { useState, useEffect } from 'react';

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState('free');
  const [selectedPost, setSelectedPost] = useState(null);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => setPostsData(data));
  }, []);

  const menus = [
    { key: 'notice', label: '공지사항' },
    { key: 'lecture', label: '강의소개' },
    { key: 'free', label: '자유게시판' },
    { key: 'secret', label: '비밀게시판' },
    { key: 'library', label: '도서관' },
  ];

  const boardPosts = postsData.filter(p => p.board === currentBoard);

  return (
    <div className="page-root">
      <header className="topbar">
        <div className="container">
          <h1 className="logo">가상대학교 에타</h1>
          <nav className="nav">
            {menus.map(m => (
              <button
                key={m.key}
                className={"nav-btn" + (currentBoard === m.key ? " active" : "")}
                onClick={() => { setCurrentBoard(m.key); setSelectedPost(null); }}
              >
                {m.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="container">
        {!selectedPost && (
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th className="title-col">제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>추천</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {boardPosts.map((post, idx) => (
                <tr key={post.id} className="row" onClick={() => setSelectedPost(post)}>
                  <td>{boardPosts.length - idx}</td>
                  <td className="title-col">{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>{post.likes}</td>
                  <td>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedPost && (
          <article className="post-area">
            <h2 className="post-title">{selectedPost.title}</h2>
            <div className="post-meta">
              <span>{selectedPost.author}</span>
              <span>{selectedPost.date}</span>
              <span>추천 {selectedPost.likes} · 조회 {selectedPost.views}</span>
            </div>
            <div className="post-content">{selectedPost.content}</div>
            <section className="comments">
              <h3>댓글 {selectedPost.comments.length}</h3>
              {selectedPost.comments.length === 0 && <div className="no-comments">댓글 없음</div>}
              {selectedPost.comments.map((c, i) => (
                <div key={i} className="comment">
                  <div className="c-meta">{c.author} | {c.date}</div>
                  <div className="c-body">{c.content}</div>
                </div>
              ))}
              <button className="back-btn" onClick={() => setSelectedPost(null)}>← 목록으로</button>
            </section>
          </article>
        )}
      </main>
    </div>
  );
}
