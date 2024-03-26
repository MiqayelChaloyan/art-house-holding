// "use client"

// import React, { useEffect, useState } from 'react';
// import styles from './styles.module.sass';
// // import './style.css'
// const CircularMenu = () => {

//     return (
//         // <div className={styles.CrcularMenu}>
//         //     <i className="fas fa-plus plus-icon"></i>
//         //     <button className={styles.btn} title="File"><i className="fas fa-file">M</i></button>
//         //     <button className={styles.btn} title="Folder"><i className="fas fa-folder">W</i></button>
//         //     <button className={styles.btn} title="Mail"><i className="fas fa-envelope">F</i></button>
//         //     <button className={styles.btn} title="Message"><i className="fas fa-comments">G</i></button>
//         // </div>

//     );
// }

// export default CircularMenu;


"use client"

import { FacebookProvider, CustomChat } from 'react-facebook';

const CircularMenu = () => {

    return (
        <FacebookProvider appId="108431271487600" chatSupport>
            <CustomChat pageId="766900155396947" minimized={true} />
        </FacebookProvider>
    );
}

export default CircularMenu