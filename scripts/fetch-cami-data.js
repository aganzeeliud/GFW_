#!/usr/bin/env node

/**
 * CAMI Cadastre Data Enricher
 * Enriches mining permit data with CAMI permit categories
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Permit type to category mapping
const PERMIT_CATEGORIES = {
  'PR': 'active_research',
  'ARC': 'active_research',
  'PE': 'active_exploitation',
  'PEM': 'active_exploitation',
  'PER': 'active_exploitation',
  'AECP': 'active_exploitation',
  'CUP': 'active_exploitation',
  'PR_APP': 'applications',
  'ARC_APP': 'applications',
  'PE_APP': 'applications',
  'PEM_APP': 'applications',
  'PER_APP': 'applications',
  'AECP_APP': 'applications',
  'CUP_APP': 'applications',
  'ZEA': 'other',
  'ATE': 'other',
  'APE': 'other',
  'ZRG': 'other',
  'ZI': 'other',
  'PROV': 'administration',
  'TERR': 'administration',
  'ZP': 'administration'
};

/**
 * Enrich concessions data with permit categories
 */
function enrichConcessions(concessions) {
  console.log('📊 Enriching concession data with permit categories...');
  
  return concessions.map(concession => {
    const permitType = concession.type?.split('(')[0].trim() || '';
    let categoryId = 'other';
    
    // Direct match
    if (PERMIT_CATEGORIES[permitType]) {
      categoryId = PERMIT_CATEGORIES[permitType];
    } else {
      // Fuzzy match for abbreviated types
      for (const [key, cat] of Object.entries(PERMIT_CATEGORIES)) {
        if (permitType.includes(key) || key.includes(permitType)) {
          categoryId = cat;
          break;
        }
      }
    }
    
    return {
      ...concession,
      category_id: categoryId,
      zone: concession.zone || 'OWR Region'
    };
  });
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 CAMI Data Enrichment Script');
    console.log('================================\n');

    const concessionsPath = path.join(__dirname, '../public/data/all_concessions.json');
    
    if (!fs.existsSync(concessionsPath)) {
      console.error('❌ Concessions file not found:', concessionsPath);
      process.exit(1);
    }

    // Read existing concessions
    console.log('📖 Reading concessions data...');
    const concessions = JSON.parse(fs.readFileSync(concessionsPath, 'utf-8'));
    console.log(`✅ Loaded ${concessions.length} concessions`);

    // Enrich data
    const enriched = enrichConcessions(concessions);

    // Calculate stats
    const categoryStats = {};
    enriched.forEach(record => {
      const cat = record.category_id || 'unknown';
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    // Save enriched data
    console.log('💾 Saving enriched data...');
    fs.writeFileSync(
      concessionsPath,
      JSON.stringify(enriched, null, 2),
      'utf-8'
    );
    console.log(`✅ Saved ${enriched.length} enriched records`);

    console.log('\n📈 Permit Distribution by Category:');
    Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        const percentage = ((count / enriched.length) * 100).toFixed(1);
        console.log(`   ${cat.padEnd(25)} : ${count.toString().padStart(4)} (${percentage}%)`);
      });

    console.log('\n✅ Data enrichment complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
