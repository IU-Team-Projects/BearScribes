import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AboutPage } from '@/pages/about/ui/aboutPage';

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
    it('renders an about', () => {
        render(<AboutPage />);

        const about = screen.getByTestId('about');

        expect(about).toBeInTheDocument();

        expect(about.querySelector('div')).toBeInTheDocument();
        expect(about.querySelector('button')).toBeInTheDocument();
        expect(about.querySelector('img')).toBeInTheDocument();
    });
});
