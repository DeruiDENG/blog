import styles from './Bio.module.scss';
import { author } from '../utils/meta';

const Bio = () => {
  return (
    <div className={styles.bioContainer}>
      {/*<Image*/}
      {/*  fixed={data.avatar.childImageSharp.fixed}*/}
      {/*  alt={author.name}*/}
      {/*  className={styles.bioImage}*/}
      {/*/>*/}
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
