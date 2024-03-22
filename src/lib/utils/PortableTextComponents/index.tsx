import styles from './styles.module.sass';

const components = {
    marks: {
        code: ({children}: any) => <code className={styles.code}>{children}</code>,
        em: ({ children }: any) => <em className={styles.em}>{children}</em>,
        internalLink: ({ value, children }: any) => {
            const { slug = {} } = value;
            const href = `/${slug.current}`;
            return <a href={href} target="_blank" className={styles.link}>{children}</a>;
        },
        link: ({ value, children }: any) => {
            const { blank, href } = value;
            return blank ?
                <a href={href} target="_blank" rel="noopener" className={styles.link}>{children}</a>
                : <a href={href} target="_blank" className={styles.link}>{children}</a>;
        },
    },
    block: {
        blockquote: ({ children }: any) => <blockquote className={styles.blockquote}>{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className={styles.bullet}>{children}</ul>,
        number: ({ children }: any) => <ol className={styles.number}>{children}</ol>,
    },
};

export default components;