import Header from './Header';
import Branches from './Branches';
import Progress from './Progress';
import Partners from './Partners';

import { ART_HOUSE_HOME } from '../../../../sanity/sanity-queries/art-house';


export default function Page({ data }: any) {
	const { our_websites, progress_section, co_workers } = data;

	// if (!our_websites || !progress_section || !co_workers || isError) {
	// 	return <PageNotFoundError />
	// }

    console.log(data)

    return (
        <div>
            <Header />
            <Branches data={our_websites} />
            <Progress  data={progress_section} />
            <Partners data={co_workers} />
        </div>
    );
}


