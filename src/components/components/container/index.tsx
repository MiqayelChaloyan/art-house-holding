type Props = {
    children: string | JSX.Element | JSX.Element[],
    className: string
}

export default function Container({ children, className }: Props) {
    return <div className={className}>{children}</div>;
};