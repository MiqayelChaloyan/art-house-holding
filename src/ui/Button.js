function Button({ text, onClick, className }) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <button
            className={className}
            onClick={handleClick}
        >
            <span>{text}</span>
        </button>
    );
};

export default Button;