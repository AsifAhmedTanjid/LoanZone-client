import React from 'react';
import Container from '../../components/shared/Container/Container';
import Banner from '../../components/Home/Banner';
import HowItWorks from '../../components/Home/HowItWorks';

const Home = () => {
    return (
        <Container>
            <Banner />
            <HowItWorks />
        </Container>
    );
};

export default Home;