import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {LoginPage} from '@/pages/login/ui/loginPage';
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
    it('renders a login', () => {

        render(<LoginPage />)

        const login = screen.getByTestId('login');

        expect(login).toBeInTheDocument();
        expect(login).toHaveClass("flex h-full flex-col items-center justify-center");

        expect(login.querySelector('div')).toBeInTheDocument();
        expect(login.querySelector('input')).toBeInTheDocument();
        expect(login.querySelector('button')).toBeInTheDocument();
        expect(login.querySelector('span')).toBeInTheDocument();

    })
})
