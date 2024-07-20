import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import * as sea from "node:sea";
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
    it('renders a book grid', () => {
        render(<SearchBar />)


        const searchbar = screen.getByTestId('searchbar');


        expect(searchbar).toBeInTheDocument();
        expect(searchbar).toHaveClass('search-container');

        expect(searchbar.querySelector('input')).toBeInTheDocument();
        expect(searchbar.querySelector('button')).toBeInTheDocument();


    })
})
