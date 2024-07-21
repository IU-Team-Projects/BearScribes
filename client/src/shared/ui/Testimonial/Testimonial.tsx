import React from 'react';
import styles from './Testimonial.module.scss';
import Image from 'next/image';

const Testimonial: React.FC = () => {
    return (
        <section data-testid="testimonial" className={styles.testimonial}>
            <div className={styles.profile}>
                <Image
                    src="/profile.jpg"
                    alt="Eldar"
                    width={500}
                    height={500}
                />
                <p>
                    Books are like workouts for the brain. The more you read,
                    the stronger you become. And if a book is boring, you can
                    always use it as a dumbbell
                </p>
                <span>Eldar</span>
            </div>
        </section>
    );
};

export default Testimonial;
