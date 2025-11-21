import React from 'react';

interface ResultDisplayProps {
  content: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, onReset }) => {
  // Helper to render text with basic formatting
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    let inTable = false;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Table handling
      if (line.startsWith('|')) {
        if (!inTable) {
          inTable = true;
          // Collect all table lines
          const tableLines = [];
          let j = i;
          while (j < lines.length && lines[j].trim().startsWith('|')) {
            tableLines.push(lines[j].trim());
            j++;
          }
          i = j - 1; // fast forward main loop

          // Render Table
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-6 border border-stone-300 rounded-sm shadow-sm bg-white">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="bg-stone-100 text-tao-ink font-bold">
                    {tableLines[0].split('|').filter(c => c.trim()).map((cell, idx) => (
                      <th key={idx} className="p-2 border-r border-stone-200 last:border-0">{cell.trim()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableLines.slice(2).map((row, rIdx) => (
                    <tr key={rIdx} className="border-t border-stone-200 hover:bg-stone-50">
                       {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                         <td key={cIdx} className="p-2 border-r border-stone-200 last:border-0 font-serif">
                           {cell.trim().replace('**', '').replace('**', '')} {/* simple bold strip for cells */}
                         </td>
                       ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }
      inTable = false;

      // Headers
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-calligraphy text-cinnabar mt-8 mb-4 pb-2 border-b border-stone-300">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xl font-serif font-bold text-tao-ink mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('▪')) {
        elements.push(<h3 key={i} className="text-lg font-bold text-cinnabar mt-6 mb-2 flex items-center"><span className="mr-2">◈</span> {line.replace('▪', '').trim()}</h3>);
      } else if (line.startsWith('◆')) {
        elements.push(<div key={i} className="bg-stone-200 text-stone-800 px-4 py-2 mt-4 mb-2 rounded-sm font-bold text-sm tracking-wide">{line.replace('◆', '').trim()}</div>);
      } else if (line.startsWith('>')) {
        // Blockquote / Special Section
        elements.push(
          <div key={i} className="pl-4 border-l-4 border-gold italic text-stone-600 my-4 bg-stone-100/50 py-2 pr-2 rounded-r-sm">
            {line.replace('>', '').trim()}
          </div>
        );
      } else if (line === '') {
         elements.push(<br key={i}/>);
      } else {
        // Paragraph with bold formatting
        const parts = line.split(/(\*\*.*?\*\*)/g);
        elements.push(
          <p key={i} className="mb-2 leading-relaxed text-stone-800 font-serif">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="text-tao-ink font-bold">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
    }
    return elements;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-tao-paper border border-stone-300 shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none font-calligraphy text-9xl text-cinnabar select-none">
          命
        </div>
        <div className="absolute bottom-0 left-0 p-4 opacity-5 pointer-events-none font-calligraphy text-9xl text-tao-ink select-none">
          运
        </div>

        {/* Header for Result */}
        <div className="text-center mb-10 border-b-2 border-double border-stone-300 pb-6">
           <h2 className="text-3xl md:text-4xl font-calligraphy text-cinnabar mb-2">渊海·批命书</h2>
           <p className="text-stone-500 text-sm uppercase tracking-widest">The Destiny Manuscript</p>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none">
          {renderContent(content)}
        </div>

        {/* Footer Seal */}
        <div className="mt-16 flex flex-col items-center opacity-80">
           <div className="w-24 h-24 border-4 border-cinnabar rounded-md flex items-center justify-center p-1 rotate-3 mask-image">
             <div className="w-full h-full border-2 border-cinnabar border-dashed flex items-center justify-center bg-cinnabar/5 text-cinnabar font-calligraphy text-4xl writing-vertical">
               渊海亲批
             </div>
           </div>
           <p className="mt-4 text-xs text-stone-400">此命盘仅供参考，积善之家必有余庆</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={onReset}
          className="bg-tao-ink hover:bg-stone-700 text-stone-50 px-8 py-3 rounded-md shadow-lg transition-transform hover:-translate-y-1 font-serif"
        >
          测算下一位
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;