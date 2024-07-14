import Hero from '@/shared/ui/Hero/Hero';
import Testimonial from '@/shared/ui/Testimonial/Testimonial';
import Contact from '@/shared/ui/Contact/Contact';
import Footer from '@/shared/ui/Footer/Footer';
import Header from '@/shared/ui/Header/Header';

export function HomePage() {
    return (
        <>
            <Header />
            <Hero />
            <Testimonial />
            <Contact />
            <Footer />
        </>
    );
}
