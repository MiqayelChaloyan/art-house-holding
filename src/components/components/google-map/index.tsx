import styles from './styles.module.sass';


interface Props {
    width: string
    height: string
}


export default async function GoogleMaps({ width, height }: Readonly<Props>) {    
    return (
        <iframe
            title='Google Map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.957283740513!2d44.520647976382314!3d40.187764071477375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce09c329a4b%3A0x190558989842c3c2!2s33%20Abovyan%20poxoc%2C%20Yerevan%200009!5e0!3m2!1sru!2sam!4v1699959125372!5m2!1sru!2sam"
            width={width}
            height={height}
            className={styles.iframe}
            loading="lazy"
        >
        </iframe>
    );
};


// "use client"

// const containerStyle = {
//     width: '400px',
//     height: '400px'
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// interface Props {
//     width: string
//     height: string
// }

// "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.957283740513!2d44.520647976382314!3d40.187764071477375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce09c329a4b%3A0x190558989842c3c2!2s33%20Abovyan%20poxoc%2C%20Yerevan%200009!5e0!3m2!1sru!2sam!4v1699959125372!5m2!1sru!2sam"
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">



// 'use client'

// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// const defaultMapContainerStyle = {
//     width: '100%',
//     height: '50vh',
//     borderRadius: '15px 0px 0px 15px',
// };

// const defaultMapCenter = {
//     lat: 40.18795258199656,
//     lng: 44.52323362618784
// }

// const defaultMapZoom = 18

// const defaultMapOptions = {
//     zoomControl: true,
//     tilt: 0,
//     gestureHandling: 'auto',
//     mapTypeId: 'satellite',
// };

// const GoogleMaps = () => {

//     const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         googleMapsApiKey: 'AIzaSyD6kObyjp9ey8Vdrxu-RC5clPUEc8d6kCg',
//       })

//       console.log(isLoaded);
      

//     return  (
//         <div className="w-full">
//             <GoogleMap
//                 mapContainerStyle={defaultMapContainerStyle}
//                 center={defaultMapCenter}
//                 zoom={defaultMapZoom}
//                 options={defaultMapOptions}
//             >
//             </GoogleMap>
//         </div>
//     )
// };


// export default GoogleMaps








// 'use client';

// import React, { useEffect } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// export default function GoogleMaps() {
// 	const mapRef = React.useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const initializeMap = async () => {
// 			const loader = new Loader({
// 				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
// 				version: 'quartely',
// 			});

// 			const { Map } = await loader.importLibrary('maps');

// 			const locationInMap = {
// 				lat: 39.60128890889341,
// 				lng: -9.069839810859907,
// 			};

// 			// MARKER
// 			const { Marker } = (await loader.importLibrary(
// 				'marker'
// 			)) as google.maps.MarkerLibrary;

// 			const options: google.maps.MapOptions = {
// 				center: locationInMap,
// 				zoom: 15,
// 				// mapId: 'NEXT_MAPS_TUTS',
// 			};

// 			const map = new Map(mapRef.current as HTMLDivElement, options);

// 			// add the marker in the map
// 			// const marker = new Marker({
// 			// 	map: map,
// 			// 	position: locationInMap,
// 			// });
// 		};

// 		initializeMap();
// 	}, []);

// 	return <div className="h-[600px]" ref={mapRef} />;
// }
