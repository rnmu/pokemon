import React, { useState, useEffect } from 'react';
import { fetchData } from './apiService';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardMedia, List, ListItem, ListItemText, Pagination } from '@mui/material';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const postsPerPage = 20;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetchData();
                setPosts(response.results);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    

    const renderPosts = () => {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const currentPosts = posts.slice(startIndex, endIndex);

        return currentPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/post/${startIndex + index + 1}`} style={{ textDecoration: 'none' }}>
                    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CardMedia
                                component="img"
                                style={{ width: '50%', height: 'auto' }}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getPokemonId(post.url)}.svg`}
                                alt={post.name}
                            />
                        </div>
                        <CardContent>
                            <Typography variant="body1" component="p">
                                {post.name}
                                
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>


        ));
    };

    const getPokemonId = (url: string) => {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 2], 10);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>Pokemon</Typography>
            <Grid container spacing={3}>
                {renderPosts()}
            </Grid>
            <Pagination
                count={Math.ceil(posts.length / postsPerPage)}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
};

export default PostsPage;
