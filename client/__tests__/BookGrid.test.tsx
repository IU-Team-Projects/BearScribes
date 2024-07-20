import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BookGrid from '@/shared/ui/BookGrid/BookGrid';
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
        render(<BookGrid books={[]}/>)


        const bookgrid = screen.getByTestId('bookgrid');


        expect(bookgrid).toBeInTheDocument();
        expect(bookgrid).toHaveClass('bookGrid');




    })
})
