export default function EconomicCalendar() {
    const events = [
        { date: '2024-05-16', time: '10:00', event: 'CPI Release', forecast: '3.4%', previous: '3.5%', country: '🇺🇸' },
        { date: '2024-05-17', time: '14:30', event: 'Jobless Claims', forecast: '210K', previous: '215K', country: '🇺🇸' },
        { date: '2024-05-20', time: '09:30', event: 'Manufacturing PMI', forecast: '51.2', previous: '51.5', country: '🇺🇸' },
    ];

    return (
        <div className="bg-bg-secondary border border-border-primary rounded">
            <div className="bg-bg-tertiary border-b border-border-primary p-4">
                <h2 className="text-text-primary font-bold">Calendario Económico</h2>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-bg-tertiary border-b border-border-primary">
                    <tr>
                        <th className="px-4 py-2 text-left">Fecha</th>
                        <th className="px-4 py-2 text-left">Evento</th>
                        <th className="px-4 py-2 text-center">Forecast</th>
                        <th className="px-4 py-2 text-center">Anterior</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                    {events.map((evt, idx) => (
                        <tr key={idx} className="hover:bg-bg-tertiary transition-colors">
                            <td className="px-4 py-2 text-text-secondary">{evt.date} {evt.time}</td>
                            <td className="px-4 py-2 text-text-primary">{evt.country} {evt.event}</td>
                            <td className="px-4 py-2 text-center text-text-primary font-mono">{evt.forecast}</td>
                            <td className="px-4 py-2 text-center text-text-secondary font-mono">{evt.previous}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
