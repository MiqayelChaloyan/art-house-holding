interface Props {
    children: string | JSX.Element | JSX.Element[];
    className: string;
};

export default function Container({ children, className }: Readonly<Props>) {
    return <div className={className}>{children}</div>;
};