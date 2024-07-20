import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/shared/ui/Footer/Footer';
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
describe('Footer', () => {
    it('renders a footer', () => {
        render(<Footer />)

        const footer = screen.getByTestId("footer");

        expect(footer).toBeInTheDocument();

        expect(footer).toHaveClass("footer");

        expect(footer.querySelector('form')).toBeInTheDocument();
        expect(footer.querySelector('div')).toBeInTheDocument();
        expect(footer.querySelector('ul')).toBeInTheDocument();
        expect(footer.querySelector('h3')).toBeInTheDocument();

    })
})
