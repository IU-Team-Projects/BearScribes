import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UserInfo from '@/shared/ui/UserInfo/UserInfo';
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
    it('renders a user info', () => {
        render(<UserInfo  city={''} name={''} id={0} phone_number={''} telegram_profile={''}/>)


        const userinfo = screen.getByTestId('userinfo');


        expect(userinfo).toBeInTheDocument();
        expect(userinfo).toHaveClass('userInfo');

        expect(userinfo.querySelector('p')).toBeInTheDocument();
        expect(userinfo.querySelector('h2')).toBeInTheDocument();


    })
})
