import { useState, useEffect } from 'react';

// 1. Definición del tipo de dato con TypeScript
type Post = { id: number; title: string; body: string; };

const DataFetcher = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. useEffect para ejecutar la petición asíncrona
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'); 

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 3. Renderizado condicional
  if (loading) return <p>Cargando posts de la API...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h3>Últimos Posts Asíncronos</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}><strong>{post.title}</strong></li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;