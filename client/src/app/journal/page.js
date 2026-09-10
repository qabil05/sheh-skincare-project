import Image from 'next/image';
import Link from 'next/link';
import { journal } from '@/lib/data';

export const metadata = { title: 'Journal' };

export default function Journal() {
  return (
    <main className="page-shell journal-page">
      <section className="page-intro journal-intro tone-butter">
        <p className="micro">Sheh journal</p>
        <h1>Notes on skin,<br /><em>light & quiet ritual.</em></h1>
        <p>Field notes on hydration, formulation and the small sensory details that make a daily ritual easier to return to.</p>
      </section>

      <section className="journal-list section-pad journal-list-raised">
        {journal.map((post, i) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="journal-row">
            <div className="journal-row-media">
              <Image src={post.image} alt={post.title} fill quality={93} sizes="(max-width: 640px) 100vw, 280px" className="cover-image" />
            </div>
            <span>0{i + 1}</span>
            <div className="journal-row-copy">
              <p className="micro">{post.category} / {post.date}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <b className="journal-read"><span>Read</span><i>↗</i></b>
          </Link>
        ))}
      </section>
    </main>
  );
}
