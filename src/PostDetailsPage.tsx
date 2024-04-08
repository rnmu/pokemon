import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Box, ListItem, ListItemText, List, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';

const Image = styled('img')({
    maxWidth: '100%', 
    maxHeight: '100%', 
    margin: 'auto',
    display: 'block',
    transition: 'transform 0.3s ease-in-out', 
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)', 
});

const CenteredBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    height: '100%',
});

const CurvedLine = styled('svg')({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
});

const PostDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemonDetails, setPokemonDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setPokemonDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!pokemonDetails) {
        return <Typography variant="body1">Pokémon not found</Typography>;
    }

    const { name, types, stats } = pokemonDetails;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CenteredBox style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', position: 'relative' }}>
                    <Typography variant="h3">Pokémon Details</Typography>
                    <Typography variant="body1">ID: {id}</Typography>
                    <Typography variant="body1">Name: {name}</Typography>
                    <Typography variant="body1">Type: {types.map((type: any) => type.type.name).join(', ')}</Typography>
                    <Typography variant="body1">Stats:</Typography>
                    <List>
                        {stats.map((stat: any) => (
                            <ListItem key={stat.stat.name}>
                                <ListItemText primary={`${stat.stat.name}: ${stat.base_stat}`} />
                            </ListItem>
                        ))}
                    </List>
                </CenteredBox>
                <CurvedLine viewBox="0 0 100 100">
                    <path d="M0 50 Q 50 0 100 50" fill="none" stroke="#f0f0f0" strokeWidth="4" />
                </CurvedLine>
               
            </Grid>
            <Grid item xs={12} sm={6}>
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt={name}
                    style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} // Center the image vertically
                />
            </Grid>
        </Grid>
    );
};

export default PostDetailsPage;
