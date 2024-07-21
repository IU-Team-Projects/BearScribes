import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Contact from '@/shared/ui/Contact/Contact';
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
    it('renders a contact', () => {
        render(<Contact />);

        const contact = screen.getByTestId('contact');

        expect(contact).toBeInTheDocument();
        expect(contact).toHaveClass('contact');

        expect(contact.querySelector('div')).toBeInTheDocument();
        expect(contact.querySelector('p')).toBeInTheDocument();
        expect(contact.querySelector('h2')).toBeInTheDocument();
        expect(contact.querySelector('button')).toBeInTheDocument();
        expect(contact.querySelector('img')).toBeInTheDocument();
    });
});
