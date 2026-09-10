import Image from 'next/image';
import Link from 'next/link';
import { getJournalPost } from '@/lib/data';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: 'Journal' };
}

export default async function JournalDetail({ params }) {
  const { slug } = await params;
  const post = getJournalPost(slug);

  if (!post) {
    return <main className="page-shell"><section className="page-intro"><h1>Story not found.</h1></section></main>;
  }

  return (
    <main className="article-page">
      <header className="article-head">
        <p className="micro">{post.category} / {post.date}</p>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>

      <div className="article-hero">
        <Image src={post.image} alt={post.title} fill priority quality={94} sizes="(max-width: 640px) 100vw, 90vw" className="cover-image" />
      </div>

      <article className="article-body">
        <p className="dropcap">{post.article.intro}</p>
        {post.article.sections.map((section, index) => (
          <section className="article-section" key={section.heading}>
            <p className="micro">0{index + 1} / Field note</p>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {index === 0 && <blockquote>{post.article.quote}</blockquote>}
          </section>
        ))}
        <p className="article-closing">{post.article.closing}</p>
        <Link href="/journal" className="article-back"><span>Back to journal</span><b>←</b></Link>
      </article>
    </main>
  );
}
