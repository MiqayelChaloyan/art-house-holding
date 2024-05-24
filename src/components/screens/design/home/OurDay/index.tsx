import cn from 'classnames';
import styles from './styles.module.sass'
import { Arial } from '@/lib/constants/font';
import { OUR_DAY } from '../../../../../../sanity/sanity-queries/design';
import { UrlType } from '@/types/design';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxType } from '@/types/language';
import { onPlay, setPath } from '@/store/player_reducer';
import Player from '@/components/components/player';
import Container from '@/components/components/container';
import Link from 'next/link';
import { Pages } from '@/lib/constants/pages';
import { useLocale, useTranslations } from 'next-intl';


type Props = {
    our_day: OUR_DAY
};

const OurDay = ({ our_day }: Readonly<Props>) => {
    const path: UrlType | any = urlForImage(our_day?.video_light)
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();
    const t = useTranslations('buttons');
    const localActive = useLocale();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR DAY</h2>
                <h1 className={cn(styles.title, Arial.className)}>ՄԵՐ ԱՌՕՐՅԱՆ</h1>
            </div>
            <Container className='container'>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={our_day?.video_url}
                        handlePlayVideo={handlePlayVideo}
                    />
                </div>
            </Container>
            <div className={styles.button_group}>
                <Link
                    href={`/${localActive}${Pages.DESIGN_CONTACT}`}
                    aria-label={Pages.DESIGN_CONTACT}
                    className={cn(styles.link, Arial.className)}                    
                    prefetch={true}
                    passHref
                >
                    {t('register-now')}
                </Link>
            </div>
        </div>
    )
};

export default OurDay;