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
    { key: 'free', label: '자유게시판' }
