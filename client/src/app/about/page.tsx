import styles from './about.module.css'
import React from "react";
import Image from "next/image";


export default function AboutPage() {

    return (<div>

            <div className={styles.about}>

                ABOUT US
            </div>
            <div className={styles.text_description}> Bearscribes is a Project for searching, saving
                and <br/> exchanging books between its participants.
            </div>

        <div className={styles.participants}> Project was created <br/> by 5 enthusiasts <ul>
            <li className={styles.li}> Eldar Mametov</li>
            <li className={styles.li}> Artur Mukhutdinov</li>
            <li className={styles.li}>Timur Zheksimbaev</li>
            <li className={styles.li}> Vladislav Kishkovskiy</li>
            <li className={styles.li}> Matvey Platonov</li>
        </ul></div>

        <div className={styles.final}> Want to know more? Visit our resources!</div>

        <button className={styles.button_git}> Github</button>
        <button className={styles.button_tg}> Telegram</button>
        <button className={styles.button_vk}> VK </button>

        <div className={styles.bottom}>
            <span style={{margin: '20px'}}>© BEAR SCRIBES 2024</span>
            <span style={{margin: '20px'}}>Privacy policy</span>
            <span style={{margin: '20px'}}>Terms of use</span>
        </div>
        <div className={styles.image1}>
        <Image src='/proverb.png'  alt={"Image"} layout='fill' />  </div>

        <div className={styles.image2}>
        <Image src='/proverb2.png' alt={"Image"} layout='fill' /> </div>
    </div>)
}

