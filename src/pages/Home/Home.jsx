import React from 'react';
import Container from '../../components/shared/Container/Container';
import Banner from '../../components/Home/Banner';
import FeaturedLoans from '../../components/Home/FeaturedLoans';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import FAQ from '../../components/Home/FAQ';
import Testimonials from '../../components/Home/Testimonials';
import Statistics from '../../components/Home/Statistics';
import AboutSection from '../../components/Home/AboutSection';
import OurPartners from '../../components/Home/OurPartners';
import Newsletter from '../../components/Home/Newsletter';

const Home = () => {
    return (
        <Container>
            <Banner />
            
            <FeaturedLoans />
            <HowItWorks />
            <WhyChooseUs />
            <Statistics />
            <AboutSection />
            <Testimonials />
            <OurPartners />
            <FAQ />
            <Newsletter />
        </Container>
    );
};

export default Home;