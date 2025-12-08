import React from 'react';
import Container from '../../components/shared/Container/Container';
import Banner from '../../components/Home/Banner';
import FeaturedLoans from '../../components/Home/FeaturedLoans';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import FAQ from '../../components/Home/FAQ';
import Testimonials from '../../components/Home/Testimonials';

const Home = () => {
    return (
        <Container>
            <Banner />
            <FeaturedLoans />
            <HowItWorks />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
        </Container>
    );
};

export default Home;