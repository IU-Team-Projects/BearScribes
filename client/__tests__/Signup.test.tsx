import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {SignUpPage} from '@/pages/signup/ui/signUpPage';

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
    it('renders a signup', () => {

        render(<SignUpPage />);

        const signup = screen.getByTestId('signup');

        expect(signup).toBeInTheDocument();
        expect(signup).toHaveClass("flex h-full flex-col items-center justify-center space-y-0");

        expect(signup.querySelector('div')).toBeInTheDocument();
        expect(signup.querySelector('input')).toBeInTheDocument();
        expect(signup.querySelector('button')).toBeInTheDocument();
        expect(signup.querySelector('span')).toBeInTheDocument();

    })
})
