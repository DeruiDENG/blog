import Image from 'next/image';
import { author } from '../utils/meta';

const Bio = () => {
  return (
    <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-sm mb-10">
      <Image
        src="/profile-image.jpeg"
        alt={author.name}
        width={50}
        height={50}
        className="rounded-full ring-2 ring-indigo-500/20 dark:ring-indigo-400/30 object-cover shadow-sm flex-shrink-0"
      />
      <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Personal blog by{' '}
        <strong>
          <a
            href={author.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 transition-colors"
          >
            {author.name}
          </a>
        </strong>
        .
        <div className="mt-0.5 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
          {author.description}
        </div>
      </div>
    </div>
  );
};

export default Bio;
