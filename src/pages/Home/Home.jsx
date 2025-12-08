import React from 'react';
import Container from '../../components/shared/Container/Container';
import Banner from '../../components/Home/Banner';
import HowItWorks from '../../components/Home/HowItWorks';
import Testimonials from '../../components/Home/Testimonials';

const Home = () => {
    return (
        <Container>
            <Banner />
            <HowItWorks />
            <Testimonials />
        </Container>
    );
};

export default Home;