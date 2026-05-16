import { formatDate } from '../../utils/formatters';
import { useNewsData } from '../../hooks/useNewsData';

export default function NewsFeed({ category = 'all' }) {
    const { data: news, isLoading } = useNewsData(category);

    if (isLoading) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Cargando noticias...</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded overflow-hidden">
            <div className="bg-bg-tertiary border-b border-border-primary p-4">
                <h2 className="text-text-primary font-bold">Últimas Noticias</h2>
            </div>

            <div className="divide-y divide-border-primary">
                {news?.slice(0, 10).map((article) => (
                    <article key={article.id} className="p-4 hover:bg-bg-tertiary transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-text-primary font-semibold text-sm line-clamp-2">{article.headline}</h3>
                            <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ml-2 font-medium ${article.sentiment === 'bullish' ? 'bg-price-green/20 text-price-green' :
                                    article.sentiment === 'bearish' ? 'bg-price-red/20 text-price-red' :
                                        'bg-text-muted/20 text-text-secondary'
                                }`}>
                                {article.sentiment}
                            </span>
                        </div>

                        <p className="text-text-secondary text-xs line-clamp-2 mb-2">{article.summary}</p>

                        <div className="flex items-center justify-between text-xs text-text-muted">
                            <span>{article.source}</span>
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
