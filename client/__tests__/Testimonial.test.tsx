import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Testimonial from '@/shared/ui/Testimonial/Testimonial';
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: () => jest.fn(),
            replace: () => jest.fn(),
        };
    },
    usePathname() {
        return '';
    },
}));
describe('Page', () => {
    it('renders a testimonial', () => {
        render(<Testimonial />)

        const testimonial = screen.getByTestId('testimonial');

        expect(testimonial).toBeInTheDocument();
        expect(testimonial).toHaveClass('testimonial');

        expect(testimonial.querySelector('div')).toBeInTheDocument();
        expect(testimonial.querySelector('img')).toBeInTheDocument();
        expect(testimonial.querySelector('p')).toBeInTheDocument();
        expect(testimonial.querySelector('span')).toBeInTheDocument();


    })
})
