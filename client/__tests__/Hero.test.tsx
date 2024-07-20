import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '@/shared/ui/Hero/Hero';
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
    it('renders a hero', () => {
        render(<Hero />)


        const hero = screen.getByTestId('hero');


        expect(hero).toBeInTheDocument();
        expect(hero).toHaveClass('hero');

        expect(hero.querySelector('div')).toBeInTheDocument();
        expect(hero.querySelector('p')).toBeInTheDocument();
        expect(hero.querySelector('h1')).toBeInTheDocument();
        expect(hero.querySelector('button')).toBeInTheDocument();
        expect(hero.querySelector('img')).toBeInTheDocument();

    })
})
