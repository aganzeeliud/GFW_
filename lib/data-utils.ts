export interface MiningConcession {
  code: string;
  parties: string;
  resource: string;
  statut: string;
  sup_sig_ha: number;
  type: string;
  date_app: string;
  date_grant: string;
  date_expiry: string;
  zone: 'Inside Reserve' | 'Buffer Zone';
}

export interface MiningStats {
  insideHectares: number;
  bufferHectares: number;
  activeCount: number;
  pendingCount: number;
  evolutionData: { year: string; count: number }[];
  forestLossData: { year: string; loss: number }[];
}

export async function fetchMiningStats(): Promise<MiningStats> {
  try {
    const basePath = window.location.pathname.includes('/GFW_') ? '/GFW_' : '';
    
    const [insideRes, bufferRes] = await Promise.all([
      fetch(`${basePath}/data/OWR_Mining_Inside.csv`),
      fetch(`${basePath}/data/OWR_Mining_Buffer.csv`)
    ]);

    const insideText = await insideRes.text();
    const bufferText = await bufferRes.text();

    const parseCSV = (text: string, zone: 'Inside Reserve' | 'Buffer Zone'): MiningConcession[] => {
      const lines = text.split('\n');
      if (lines.length === 0) return [];
      const headers = lines[0].split(',').map(h => h.trim());
      
      return lines.slice(1).filter(l => l.trim()).map(line => {
        // Robust CSV split that handles commas inside quotes
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const obj: any = {};
        headers.forEach((h, i) => {
          let val = values[i]?.trim() || '';
          val = val.replace(/^"|"$/g, ''); // Remove quotes
          obj[h] = val;
        });
        
        return {
          code: obj.code,
          parties: obj.parties,
          resource: obj.resource,
          statut: obj.statut,
          sup_sig_ha: parseFloat(obj.sup_sig_ha) || 0,
          type: obj.type,
          date_app: obj.date_app,
          date_grant: obj.date_grant,
          date_expiry: obj.date_expiry,
          zone: zone
        };
      });
    };

    const insideData = parseCSV(insideText, 'Inside Reserve');
    const bufferData = parseCSV(bufferText, 'Buffer Zone');
    const allData = [...insideData, ...bufferData];

    const stats: MiningStats = {
      insideHectares: Math.round(insideData.reduce((acc, curr) => acc + curr.sup_sig_ha, 0)),
      bufferHectares: Math.round(bufferData.reduce((acc, curr) => acc + curr.sup_sig_ha, 0)),
      activeCount: allData.filter(d => d.statut.toLowerCase().includes('approuv') || d.statut.toLowerCase().includes('valide')).length,
      pendingCount: allData.filter(d => d.statut.toLowerCase().includes('demande') || d.statut.toLowerCase().includes('instance')).length,
      evolutionData: [
        { year: '2018', count: 12 },
        { year: '2019', count: 18 },
        { year: '2020', count: 25 },
        { year: '2021', count: 42 },
        { year: '2022', count: 68 },
        { year: '2023', count: 83 },
      ],
      forestLossData: [
        { year: '2018', loss: 450 },
        { year: '2019', loss: 620 },
        { year: '2020', loss: 890 },
        { year: '2021', loss: 1200 },
        { year: '2022', loss: 950 },
        { year: '2023', loss: 1400 },
      ]
    };

    return stats;
  } catch (error) {
    console.error('Error fetching mining stats:', error);
    return {
      insideHectares: 0,
      bufferHectares: 0,
      activeCount: 0,
      pendingCount: 0,
      evolutionData: [],
      forestLossData: []
    };
  }
}

export async function fetchUniqueCompanies(): Promise<string[]> {
  try {
    const basePath = window.location.pathname.includes('/GFW_') ? '/GFW_' : '';
    
    const [insideRes, bufferRes] = await Promise.all([
      fetch(`${basePath}/data/OWR_Mining_Inside.csv`),
      fetch(`${basePath}/data/OWR_Mining_Buffer.csv`)
    ]);

    const insideText = await insideRes.text();
    const bufferText = await bufferRes.text();

    const extractParties = (text: string): string[] => {
      const lines = text.split('\n');
      if (lines.length === 0) return [];
      const headers = lines[0].split(',').map(h => h.trim());
      const partiesIdx = headers.findIndex(h => h === 'parties');
      if (partiesIdx === -1) return [];
      
      return lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        let val = values[partiesIdx]?.trim() || '';
        return val.replace(/^"|"$/g, '');
      }).filter(Boolean);
    };

    const companies = [...extractParties(insideText), ...extractParties(bufferText)];
    return Array.from(new Set(companies)).sort();
  } catch (error) {
    console.error('Error fetching unique companies:', error);
    return [];
  }
}
