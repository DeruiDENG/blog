import Image from 'next/image';
import styles from './Bio.module.scss';
import { author } from '../utils/meta';

const Bio = () => {
  return (
    <div className={styles['bio-container']}>
      <Image
        src="/profile-image.jpeg"
        alt={author.name}
        width={50}
        height={50}
        className={styles['bio-image']}
      />
      <div>
        Personal blog by{' '}
        <strong>
          <a
            href={author.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {author.name}
          </a>
        </strong>
        .
        <div>{author.description}</div>
      </div>
    </div>
  );
};

export default Bio;
