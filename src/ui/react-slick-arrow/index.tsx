import styles from './style.module.sass';


export const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styles.arrow_next}`}
            style={{ ...style, display: 'block', width: 40, height: 40 }}
            onClick={onClick}
        />
    );
};

export const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;

    return (
        <div
            className={`${className} ${styles.arrow_prev}`}
            style={{ ...style, display: 'block', width: 40, height: 40 }}
            onClick={onClick}
        />
    );
};