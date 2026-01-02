import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OSHARE 洒落生活選物',
    description: '點綴你的日常',
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
