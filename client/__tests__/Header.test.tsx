import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/shared/ui/Header/Header';
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
    it('renders a heading', () => {
        render(<Header />);

        const heading = screen.getByTestId('header');

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('header');

        expect(heading.querySelector('div')).toBeInTheDocument();
        expect(heading.querySelector('button')).toBeInTheDocument();
    });
});
